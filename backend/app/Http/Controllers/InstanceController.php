<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Instance;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\InstanceDeletedMail;
use Throwable;
use App\Jobs\DeleteInstanceJob;
use App\Models\ApplicationOffer;
use App\Jobs\UpgradeInstanceJob;

class InstanceController extends Controller
{
    public function index(Request $request)
    {
        return Instance::where('user_id', $request->user()->id)
            ->with('applicationOffer')
            ->get();
    }

    public function destroy($id)
    {
        $instance = Instance::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();


        $instance->update([
            'status' => 'deleting',
        ]);

        // Mail::to($instance->user->email)
        //     ->send(new InstanceDeletedMail($instance));

        // Ici plus tard : supprimer aussi le conteneur Proxmox avec $instance->proxmox_ctid
        // Exemple : appel API Proxmox ou script de suppression
        DeleteInstanceJob::dispatch($instance->id);

        // $instance->delete();

        return response()->json([
            'message' => 'Instance supprimée avec succès',
            'instance' => $instance
        ], 202);
    }

    public function availableUpgrades(Request $request, $id)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur non authentifié.'
            ], 401);
        }

        $instance = Instance::with([
            'applicationOffer.offer',
            'applicationOffer.application'
        ])
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if ($instance->status !== 'running') {
            return response()->json([
                'message' => 'Cette instance ne peut pas être améliorée actuellement.'
            ], 400);
        }

        $currentApplicationOffer = $instance->applicationOffer;
        $currentOffer = $currentApplicationOffer->offer;

        /*
     * On récupère toutes les offres appartenant
     * à la même application.
     */
        $applicationOffers = ApplicationOffer::with('offer')
            ->where(
                'application_id',
                $currentApplicationOffer->application_id
            )
            ->get();

        /*
     * On ne garde que les offres réellement supérieures.
     *
     * Aucune ressource ne peut être inférieure
     * et au moins une ressource doit être supérieure.
     */
        $availableOffers = $applicationOffers->filter(function ($applicationOffer) use ($currentOffer) {

            $offer = $applicationOffer->offer;

            if (!$offer) {
                return false;
            }

            $notLower =
                $offer->cpu >= $currentOffer->cpu
                && $offer->ram_mb >= $currentOffer->ram_mb
                && $offer->storage_gb >= $currentOffer->storage_gb;

            $atLeastOneHigher =
                $offer->cpu > $currentOffer->cpu
                || $offer->ram_mb > $currentOffer->ram_mb
                || $offer->storage_gb > $currentOffer->storage_gb;

            return $notLower && $atLeastOneHigher;
        })->values();

        return response()->json([
            'instance' => [
                'id' => $instance->id,
                'name' => $instance->name,
                'status' => $instance->status,
                'application' => $currentApplicationOffer->application->name,

                'current_application_offer_id' => $currentApplicationOffer->id,

                'current_offer' => [
                    'id' => $currentOffer->id,
                    'name' => $currentOffer->name,
                    'cpu' => $currentOffer->cpu,
                    'ram_mb' => $currentOffer->ram_mb,
                    'storage_gb' => $currentOffer->storage_gb,
                    'price' => $currentOffer->price,
                ],
            ],

            'available_offers' => $availableOffers->map(function ($applicationOffer) {
                return [
                    'application_offer_id' => $applicationOffer->id,

                    'offer' => [
                        'id' => $applicationOffer->offer->id,
                        'name' => $applicationOffer->offer->name,
                        'cpu' => $applicationOffer->offer->cpu,
                        'ram_mb' => $applicationOffer->offer->ram_mb,
                        'storage_gb' => $applicationOffer->offer->storage_gb,
                        'price' => $applicationOffer->offer->price,
                    ],
                ];
            }),
        ]);
    }

    public function upgrade(Request $request, $id)
    {
        $request->validate([
            'application_offer_id' => [
                'required',
                'integer',
                'exists:application_offers,id',
            ],
        ]);

        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur non authentifié.'
            ], 401);
        }

        $instance = Instance::with([
            'applicationOffer.offer',
            'applicationOffer.application'
        ])
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        /*
     * Une instance doit être opérationnelle
     * avant de pouvoir être améliorée.
     */
        if ($instance->status !== 'running') {
            return response()->json([
                'message' => 'Cette instance ne peut pas être améliorée actuellement.'
            ], 400);
        }

        $newApplicationOffer = ApplicationOffer::with([
            'offer',
            'application'
        ])->findOrFail($request->application_offer_id);

        /*
     * Vérification que le nouveau plan appartient
     * à la même application.
     */
        if (
            $instance->applicationOffer->application_id
            !== $newApplicationOffer->application_id
        ) {
            return response()->json([
                'message' => 'Le nouveau plan ne correspond pas à la même application.'
            ], 400);
        }

        $currentOffer = $instance->applicationOffer->offer;
        $newOffer = $newApplicationOffer->offer;

        /*
     * Interdiction des downgrades.
     */
        if (
            $newOffer->cpu < $currentOffer->cpu
            || $newOffer->ram_mb < $currentOffer->ram_mb
            || $newOffer->storage_gb < $currentOffer->storage_gb
        ) {
            return response()->json([
                'message' => 'Le passage vers un plan inférieur est interdit.'
            ], 400);
        }

        /*
     * Impossible de choisir le plan actuel.
     */
        if (
            $instance->application_offer_id
            === $newApplicationOffer->id
        ) {
            return response()->json([
                'message' => 'Cette instance utilise déjà ce plan.'
            ], 400);
        }

        /*
         * On passe immédiatement l'instance en upgrading
         * pour éviter qu'un utilisateur clique plusieurs fois.
         */
        $instance->update([
            'status' => 'upgrading',
        ]);

        UpgradeInstanceJob::dispatch(
            $instance->id,
            $newApplicationOffer->id
        );

        return response()->json([
            'message' => 'La modification de votre instance a été lancée.',
            'instance_id' => $instance->id,
            'new_application_offer_id' => $newApplicationOffer->id,
        ], 202);
    }
}
