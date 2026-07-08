<?php

namespace App\Jobs;

use App\Models\Instance;
use App\Services\ProxmoxDeployService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable as FoundationQueueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DeployInstanceJob implements ShouldQueue
{
    use FoundationQueueable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public int $instanceId)
    {
    }

    public function handle(ProxmoxDeployService $proxmoxDeployService): void
    {
        $instance = Instance::findOrFail($this->instanceId);

        try {
            $instance->update([
                'status' => 'provisioning',
            ]);
           // $proxmoxDeployService->deployMinecraft($instance);
            
            $proxmoxDeployService->deploy($instance);
            $instance->update([
                'status' => 'running',
            ]);
            }   catch (\Throwable $e) {
            $instance->update([
                'status' => 'error',
            ]);

            throw $e;
        }
    }
}
