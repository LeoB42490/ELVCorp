<?php

namespace App\Http\Controllers;

use App\Mail\SupportRequestMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class SupportController extends Controller
{
    public function send(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'subject' => [
                'required',
                'string',
                'min:5',
                'max:150',
            ],

            'message' => [
                'required',
                'string',
                'min:10',
                'max:5000',
            ],
        ], [
            'subject.required' => 'Le sujet est obligatoire.',
            'subject.min' => 'Le sujet doit contenir au moins 5 caractères.',
            'subject.max' => 'Le sujet ne peut pas dépasser 150 caractères.',

            'message.required' => 'Le message est obligatoire.',
            'message.min' => 'Le message doit contenir au moins 10 caractères.',
            'message.max' => 'Le message ne peut pas dépasser 5 000 caractères.',
        ]);

        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur non authentifié.',
            ], 401);
        }

        $supportAddress = config('mail.admin_emails');

        if (!$supportAddress) {
            Log::error('Adresse du support non configurée.');

            return response()->json([
                'message' => 'Le service de support est temporairement indisponible.',
            ], 500);
        }

        try {
            Mail::to($supportAddress)
                ->send(new SupportRequestMail(
                    user: $user,
                    supportSubject: $validated['subject'],
                    supportMessage: $validated['message']
                ));

            Log::info('Demande de support envoyée.', [
                'user_id' => $user->id,
                'email' => $user->email,
                'subject' => $validated['subject'],
            ]);

            return response()->json([
                'message' => 'Votre demande a bien été envoyée au support.',
            ]);
        } catch (Throwable $exception) {
            Log::error('Impossible d’envoyer la demande de support.', [
                'user_id' => $user->id,
                'email' => $user->email,
                'error' => $exception->getMessage(),
            ]);

            return response()->json([
                'message' => 'Une erreur est survenue pendant l’envoi de votre demande.',
            ], 500);
        }
    }
}