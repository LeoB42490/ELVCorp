<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    private static ?string $frontendUrl = null;

    public function __construct(
        public string $token
    ) {
    }

    public static function setFrontendUrl(string $frontendUrl): void
    {
        self::$frontendUrl = rtrim($frontendUrl, '/');
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $frontendUrl = self::$frontendUrl
            ?? rtrim(config('app.frontend_url'), '/');
        
        $url = $frontendUrl
            . '/reset-password?token='
            . urlencode($this->token)
            . '&email='
            . urlencode($notifiable->email);

        return (new MailMessage)
            ->subject('Réinitialisation de votre mot de passe')
            ->view(
                'emails.password-reset',
                [
                    'url' => $url,
                    'user' => $notifiable,
                ]
            )
            ->text(
                'emails.password-reset-text',
                [
                    'url' => $url,
                    'user' => $notifiable,
                ]
            );
    }
}