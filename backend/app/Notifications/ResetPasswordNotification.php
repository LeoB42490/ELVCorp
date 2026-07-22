<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public function __construct(
        public string $token
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable)
    {
        $url = config('app.frontend_url')
            . 'reset-password?token='
            . $this->token
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
            );
    }
}