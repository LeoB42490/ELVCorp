<?php

namespace App\Jobs;

use App\Models\Instance;
use App\Services\ProxmoxDeployService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable as FoundationQueueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\InstanceCreatedMail;
use App\Mail\InstanceFailedMail;
use Throwable;

class DeployInstanceJob implements ShouldQueue
{
    use FoundationQueueable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public int $instanceId)
    {
    }

    public function handle(ProxmoxDeployService $proxmoxDeployService): void
    {
        $instance = Instance::findOrFail($this->instanceId);
        $admins = array_map('trim', explode(',', env('ADMIN_EMAILS', '')));

        try {
            $instance->update([
                'status' => 'provisioning',
            ]);
           // $proxmoxDeployService->deployMinecraft($instance);
            
            $proxmoxDeployService->deploy($instance);
            $instance->update([
                'status' => 'running',
            ]);

            Mail::to($instance->user->email)
                ->bcc($admins)
                ->send(new InstanceCreatedMail($instance));

            }   catch (\Throwable $e) {
            $instance->update([
                'status' => 'error',
            ]);
            Mail::to($instance->user->email)
                ->bcc($admins)
                ->send(new InstanceFailedMail($instance));

            throw $e;
        }
    }
}
