<?php

namespace App\Mail;

use App\Models\Instance;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InstanceCreatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $accessUrl;

    public function __construct(
        public Instance $instance
    ) {
        $this->accessUrl = $this->buildAccessUrl();
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Votre instance {$this->instance->name} est prête",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.instance-created',
            text: 'emails.instance-created-text',
            with: [
                'instance' => $this->instance,
                'accessUrl' => $this->accessUrl,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }

    private function buildAccessUrl(): string
    {
        $ipAddress = trim((string) $this->instance->ip_address);
        $port = $this->instance->port;

        if ($ipAddress === '') {
            return '';
        }

        /*
         * Une IPv6 doit être entourée de crochets dans une URL :
         * http://[2001:db8::1]:8080
         */
        $formattedAddress = str_contains($ipAddress, ':')
            ? '[' . trim($ipAddress, '[]') . ']'
            : $ipAddress;

        if ($port !== null) {
            return "http://{$formattedAddress}:{$port}";
        }

        return "http://{$formattedAddress}";
    }
}