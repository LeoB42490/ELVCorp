<?php

namespace App\Jobs;

use App\Models\Instance;
use App\Services\ProxmoxDeployService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable as FoundationQueueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Throwable;
use Illuminate\Support\Facades\Mail;
use App\Mail\InstanceUpgradedMail;
use App\Mail\InstanceUpgradeFailedMail;

class UpgradeInstanceJob implements ShouldQueue
{
    use FoundationQueueable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public int $instanceId, public int $newApplicationOfferId)
    {

    }

    /**
     * Execute the job.
     */
    public function handle(ProxmoxDeployService $proxmoxDeployService): void
    {
        $instance = Instance::findOrFail($this->instanceId);
        $admins = array_map('trim', explode(',', env('ADMIN_EMAILS', '')));

        try {
            $instance->update([
                'status' => 'upgrading',
            ]);

            $proxmoxDeployService->upgrade(
                $instance,
                $this->newApplicationOfferId
            );

            $instance->update([
                'application_offer_id' => $this->newApplicationOfferId,
                'status' => 'running',
            ]);

            $instance->load(
                'user',
                'applicationOffer.offer'
            );

            Mail::to($instance->user->email)
                ->bcc($admins)
                ->send(new InstanceUpgradedMail($instance));

            Log::info('Upgrade instance terminé', [
                'instance_id' => $instance->id,
                'new_application_offer_id' => $this->newApplicationOfferId,
            ]);
        } catch (Throwable $e) {
            $instance->update([
                'status' => 'upgrade_error',
            ]);

            $instance->load('user');

            Mail::to($instance->user->email)
                ->bcc($admins)
                ->send(
                    new InstanceUpgradeFailedMail($instance)
            );

            Log::error('Erreur upgrade instance', [
                'instance_id' => $instance->id,
                'new_application_offer_id' => $this->newApplicationOfferId,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }
}
