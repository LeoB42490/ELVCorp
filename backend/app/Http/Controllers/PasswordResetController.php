<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password as PasswordRule;
use App\Notifications\ResetPasswordNotification;

class PasswordResetController extends Controller
{
    /**
     * Envoie le lien de réinitialisation.
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        $validated = $request->validate(
            [
                'email' => [
                    'required',
                    'email',
                ],
                'frontend_url' => [
                'required',
                'url',
                ],
            ],
            [
                'email.required' => 'L’adresse e-mail est obligatoire.',
                'email.email' => 'L’adresse e-mail n’est pas valide.',
                'frontend_url.required' => 'L’adresse du site est obligatoire.',
                'frontend_url.url' => 'L’adresse du site n’est pas valide.',
            ],
        );
        
        ResetPasswordNotification::setFrontendUrl(
            $validated['frontend_url']
        );

        $status = Password::sendResetLink([
            'email' => $validated['email'],
        ]);

        Log::debug('Résultat de la demande de réinitialisation', [
            'email' => $validated['email'],
            'status' => $status,
        ]);

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'Le lien de réinitialisation a bien été envoyé.',
            ]);
        }

        if ($status === Password::RESET_THROTTLED) {
            return response()->json([
                'message' => 'Veuillez patienter avant de demander un nouveau lien.',
            ], 429);
        }

        if ($status === Password::INVALID_USER) {
            return response()->json([
                'message' => 'Aucun compte ne correspond à cette adresse e-mail.',
            ], 422);
        }

        return response()->json([
            'message' => 'Impossible d’envoyer le lien de réinitialisation.',
        ], 500);
    }

    /**
     * Enregistre le nouveau mot de passe.
     */
    public function resetPassword(Request $request): JsonResponse
    {
        $validated = $request->validate(
            [
                'token' => [
                    'required',
                    'string',
                ],
                'email' => [
                    'required',
                    'email',
                ],
                'password' => [
                    'required',
                    'confirmed',
                    PasswordRule::min(8),
                ],
                'password_confirmation' => [
                    'required',
                    'string',
                ],
            ],
            [
                'token.required' => 'Le jeton de réinitialisation est manquant.',

                'email.required' => 'L’adresse e-mail est obligatoire.',
                'email.email' => 'L’adresse e-mail n’est pas valide.',

                'password.required' => 'Le nouveau mot de passe est obligatoire.',
                'password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
                'password.min' => 'Le mot de passe doit contenir au moins 8 caractères.',

                'password_confirmation.required' => 'La confirmation du mot de passe est obligatoire.',
            ]
        );

        $status = Password::reset(
            [
                'email' => $validated['email'],
                'password' => $validated['password'],
                'password_confirmation' => $validated['password_confirmation'],
                'token' => $validated['token'],
            ],
            function ($user, string $password): void {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Votre mot de passe a bien été modifié.',
            ]);
        }

        $message = match ($status) {
            Password::INVALID_TOKEN => 'Le lien de réinitialisation est invalide ou a expiré.',
            Password::INVALID_USER => 'Aucun compte ne correspond à cette adresse e-mail.',
            Password::RESET_THROTTLED => 'Veuillez patienter avant d’effectuer une nouvelle tentative.',
            default => 'Impossible de réinitialiser le mot de passe.',
        };

        return response()->json([
            'message' => $message,
        ], 422);
    }
}