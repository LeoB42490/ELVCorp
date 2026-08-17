<?php

namespace App\Mail;

use App\Models\Instance;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InstanceUpgradedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Instance $instance
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Votre instance {$this->instance->name} a été mise à niveau",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.instance-upgraded',
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