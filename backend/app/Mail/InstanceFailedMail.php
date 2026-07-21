<?php

namespace App\Mail;

use App\Models\Instance;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InstanceFailedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Instance $instance
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Échec du déploiement de votre instance {$this->instance->name}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.instance-failed',
            text: 'emails.instance-failed-text',
            with: [
                'instance' => $this->instance,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}