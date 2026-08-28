<?php

namespace App\Console\Commands;

use App\Jobs\DeleteInstanceJob;
use App\Models\Instance;
use Illuminate\Console\Command;

class PruneExpiredInstances extends Command
{
    protected $signature = 'instances:prune-expired';

    protected $description = "Supprime automatiquement les instances dont la date d'expiration programmée est dépassée";

    public function handle(): int
    {
        $instances = Instance::whereNotNull('expires_at')
            ->where('expires_at', '<=', now())
            ->where('status', '!=', 'deleting')
            ->get();

        foreach ($instances as $instance) {
            $instance->update(['status' => 'deleting']);

            DeleteInstanceJob::dispatch($instance->id);
        }

        $this->info("{$instances->count()} instance(s) expirée(s) mise(s) en file de suppression.");

        return self::SUCCESS;
    }
}
