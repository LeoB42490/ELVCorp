<?php

namespace App\Jobs;

use App\Models\Instance;
use App\Mail\InstanceDeletedMail;
use App\Services\ProxmoxDeployService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Throwable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;


class DeleteInstanceJob implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels;
    public int $tries = 3;

    public int $timeout = 600;

    /**
     * Create a new job instance.
     */
    public function __construct(public int $instanceId)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(ProxmoxDeployService $proxmoxService): void
    {
        $instance = Instance::with('user')->findOrFail($this->instanceId);

        try {
            $instance->update([
                'status' => 'deleting',
            ]);

            $proxmoxService->delete($instance);

            /*
             * On conserve les informations nécessaires avant
             * la suppression de la ligne.
             */
            $userEmail = $instance->user->email;

            Mail::to($userEmail)
                ->send(new InstanceDeletedMail($instance));

            $instance->delete();
        } catch (Throwable $e) {
            $instance->update([
                'status' => 'error',
            ]);

            Log::error('Échec de suppression d’une instance', [
                'instance_id' => $this->instanceId,
                'vmid' => $instance->proxmox_ctid,
                'message' => $e->getMessage(),
            ]);

            throw $e;
        }
    }
}
