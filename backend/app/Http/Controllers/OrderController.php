<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\ApplicationOffer;
use App\Models\Instance;
use App\Services\PayPalService;
use App\Jobs\DeployInstanceJob;
use App\Jobs\UpgradeInstanceJob;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function create(Request $request, PayPalService $paypal)
    {
        $request->validate([
            'application_id' => 'required|exists:applications,id',
            'offer_id' => 'required|exists:offers,id',
            'instance_name' => [
                'required',
                'string',
                'min:3',
                'max:30',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                'unique:instances,name',
            ],
        ], [
            'instance_name.required' => 'Le nom de l’instance est obligatoire.',
            'instance_name.min' => 'Le nom doit contenir au moins 3 caractères.',
            'instance_name.max' => 'Le nom ne peut pas dépasser 30 caractères.',
            'instance_name.regex' => 'Le nom peut contenir uniquement des lettres minuscules, des chiffres et des tirets.',
            'instance_name.unique' => 'Ce nom d’instance est déjà utilisé.',
        ]);

        $applicationOffer = ApplicationOffer::with(['offer', 'application'])
            ->where('application_id', $request->application_id)
            ->where('offer_id', $request->offer_id)
            ->firstOrFail();

        $amount = $applicationOffer->offer->price;

        $order = Order::create([
            'user_id' => $request->user()->id,
            'application_offer_id' => $applicationOffer->id,
            'instance_name' => $request->instance_name,
            'amount' => $amount,
            'status' => 'pending',
        ]);

        $paypalOrder = $paypal->createOrder($amount);

        $order->update([
            'paypal_order_id' => $paypalOrder['id'],
        ]);

        return response()->json([
            'order_id' => $order->id,
            'paypal_order_id' => $paypalOrder['id'],
        ]);
    }

    public function capture(Request $request, Order $order, PayPalService $paypal)
    {
        if ($order->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($order->status !== 'pending') {
            return response()->json([
                'message' => 'Commande déjà traitée.',
            ], 400);
        }

        $capture = $paypal->captureOrder($order->paypal_order_id);

        if (($capture['status'] ?? null) === 'COMPLETED') {
            $captureId = $capture['purchase_units'][0]['payments']['captures'][0]['id'] ?? null;

            $order->update([
                'status' => 'paid',
                'paypal_capture_id' => $captureId,
            ]);

            $instance = Instance::create([
                'user_id' => $order->user_id,
                'application_offer_id' => $order->application_offer_id,
                'name' => $order->instance_name,
                'status' => 'provisioning',
            ]);

            //app(\App\Services\ProxmoxDeployService::class)->deployMinecraft($instance);

            DeployInstanceJob::dispatch($instance->id);
            
            return response()->json([
                'message' => 'Paiement validé',
                'order' => $order,
            ]);
        }

        $order->update([
            'status' => 'failed',
        ]);

        return response()->json([
            'message' => 'Paiement refusé ou non terminé',
            'paypal_response' => $capture,
        ], 400);
    }

    public function createUpgrade(Request $request, PayPalService $paypal) 
    {
        $request->validate([
            'instance_id' => 'required|exists:instances,id',
            'application_offer_id' => 'required|exists:application_offers,id',
        ]);

        /*
         * Récupération de l'instance.
         * Elle doit appartenir à l'utilisateur connecté.
         */
        $instance = Instance::with([
            'applicationOffer.offer',
            'applicationOffer.application'
        ])
            ->where('id', $request->instance_id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        /*
         * On ne peut upgrader qu'une instance opérationnelle.
         */
        if ($instance->status !== 'running') {
            return response()->json([
                'message' => 'Cette instance ne peut pas être améliorée actuellement.'
            ], 400);
        }

        /*
         * Nouvelle offre demandée.
         */
        $newApplicationOffer = ApplicationOffer::with([
            'offer',
            'application'
        ])->findOrFail($request->application_offer_id);

        /*
         * Impossible de changer d'application.
         *
         * Exemple :
         * WordPress -> WordPress ✅
         * WordPress -> Minecraft ❌
         */
        if (
            $instance->applicationOffer->application_id
            !== $newApplicationOffer->application_id
        ) {
            return response()->json([
                'message' => 'Le nouveau plan ne correspond pas à cette application.'
            ], 400);
        }

        $currentOffer = $instance->applicationOffer->offer;
        $newOffer = $newApplicationOffer->offer;

        /*
         * Interdire les downgrades.
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
         * Impossible de racheter le plan actuel.
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
         * IMPORTANT :
         * on fait payer le prix COMPLET du nouveau plan.
         *
         * Exemple :
         * Standard = 9,99 €
         * Business = 14,99 €
         *
         * Upgrade vers Business = 14,99 €
         */
        $amount = (float) $newOffer->price;

        if ($amount <= 0) {
            return response()->json([
                'message' => 'Montant du nouveau plan invalide.'
            ], 400);
        }

        /*
         * Création de la commande locale.
         *
         * application_offer_id = nouveau plan
         * source_application_offer_id = ancien plan
         */
        $order = Order::create([
            'user_id' => $request->user()->id,

            'application_offer_id' => $newApplicationOffer->id,
            'source_application_offer_id' => $instance->application_offer_id,

            'instance_id' => $instance->id,

            'amount' => $amount,
            'status' => 'pending',
            'type' => 'upgrade',
        ]);

        /*
         * Création de la commande PayPal.
         */
        $paypalOrder = $paypal->createOrder($amount);

        $order->update([
            'paypal_order_id' => $paypalOrder['id'],
        ]);

        return response()->json([
            'order_id' => $order->id,
            'paypal_order_id' => $paypalOrder['id'],
            'amount' => $amount,
        ]);
    }

    public function captureUpgrade(Request $request, Order $order, PayPalService $paypal) 
    {
        /*
         * La commande doit appartenir au client connecté.
         */
        if ($order->user_id !== $request->user()->id) {
            abort(403);
        }

        /*
         * Sécurité :
         * cette route ne traite que des commandes upgrade.
         */
        if ($order->type !== 'upgrade') {
            return response()->json([
                'message' => 'Cette commande n’est pas une commande d’upgrade.'
            ], 400);
        }

        /*
         * Impossible de capturer deux fois la même commande.
         */
        if ($order->status !== 'pending') {
            return response()->json([
                'message' => 'Commande déjà traitée.'
            ], 400);
        }

        /*
         * On récupère à nouveau l'instance.
         */
        $instance = Instance::with([
            'applicationOffer.offer',
            'applicationOffer.application'
        ])
            ->where('id', $order->instance_id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        /*
         * L'instance doit toujours être disponible.
         */
        if ($instance->status !== 'running') {
            return response()->json([
                'message' => 'L’instance ne peut plus être améliorée actuellement.'
            ], 400);
        }

        /*
         * Important :
         * si l'utilisateur a changé de plan entre-temps,
         * on refuse cette ancienne commande.
         */
        if (
            $instance->application_offer_id
            !== $order->source_application_offer_id
        ) {
            return response()->json([
                'message' => 'Le plan actuel de l’instance a changé. Veuillez recommencer le paiement.'
            ], 409);
        }

        /*
         * Capture PayPal.
         */
        $capture = $paypal->captureOrder(
            $order->paypal_order_id
        );

        if (($capture['status'] ?? null) === 'COMPLETED') {

            $captureId =
                $capture['purchase_units'][0]['payments']['captures'][0]['id']
                ?? null;

            /*
             * Paiement validé.
             */
            $order->update([
                'status' => 'paid',
                'paypal_capture_id' => $captureId,
            ]);

            /*
             * On bloque immédiatement l'instance.
             */
            $instance->update([
                'status' => 'upgrading',
            ]);

            /*
             * Et SEULEMENT maintenant on lance Proxmox.
             */
            UpgradeInstanceJob::dispatch(
                $instance->id,
                $order->application_offer_id
            );

            return response()->json([
                'message' => 'Paiement validé. La modification de votre instance a été lancée.',
                'order' => $order,
            ]);
        }

        /*
         * PayPal n'a pas validé le paiement.
         * Aucun upgrade n'est lancé.
         */
        $order->update([
            'status' => 'failed',
        ]);

        return response()->json([
            'message' => 'Paiement refusé ou non terminé.',
            'paypal_response' => $capture,
        ], 400);
    }
}
