<?php

namespace App\Mail;

use App\Models\Instance;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InstanceUpgradeFailedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Instance $instance
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Échec de la mise à niveau de votre instance {$this->instance->name}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.instance-upgrade-failed',
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