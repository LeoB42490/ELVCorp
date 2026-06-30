<?php

namespace App\Services;

use App\Models\Instance;

class ProxmoxDeployService
{
    /**
     * Create a new class instance.
     */
    public function deployMinecraft(Instance $instance): void
    {
        set_time_limit(0);

        $ctid = 200 + $instance->id;
        $port = 25565 + $instance->id;

	    $instance->load('applicationOffer.offer', 'user');
	    $offer = $instance->applicationOffer->offer;
	    $cpu = $offer->cpu;
	    $memory = $offer->ram_mb;
	    $storage = $offer->storage_gb;
	    $hostname = 'minecraft-' . $instance->user_id;

        $host = env('PROXMOX_HOST');

	    $remoteCommand = sprintf(
	    	'bash /home/script0/minecraft.bash %s %s %s %s',
	    	escapeshellarg($cpu),
	    	escapeshellarg($memory),
	    	escapeshellarg($storage),
	    	escapeshellarg($hostname)
	    );

        $command = sprintf(
            'ssh -i /home/user0/.ssh/id_ed25519 -o StrictHostKeyChecking=no -o ConnectTimeout=120 script0@%s %s 2>&1',
            escapeshellarg($host),
	    escapeshellarg($remoteCommand)
        );

        exec($command, $output, $resultCode);

        if ($resultCode !== 0) {
            $instance->update([
                'status' => 'error',
            ]);

            throw new \Exception("Commande : " . $command . "\nRésultat : " . implode("\n", $output));
        }

        $outputText = implode("\n", $output);

        preg_match('/Adresse IPv6\s*:\s*(\S+)/', $outputText, $ipMatch);
        preg_match('/Port Minecraft\s*:\s*(\d+)/', $outputText, $portMatch);

        $instance->update([
            'status' => 'running',
            'proxmox_ctid' => $ctid,
            'ip_address' => $ipMatch[1] ?? env('PROXMOX_PUBLIC_IP'),
            'port' => $portMatch[1] ?? $port,
        ]);
    }

    public function deploy(Instance $instance): void
    {
    	set_time_limit(0);

    	$instance->load('applicationOffer.offer', 'applicationOffer.application', 'user');

    	$offer = $instance->applicationOffer->offer;
    	$application = strtolower($instance->applicationOffer->application->name);

    	$cpu = $offer->cpu;
    	$memory = $offer->ram_mb;
    	$storage = $offer->storage_gb;

    	$hostname = $application . '-' . $instance->user_id;
    	$host = env('PROXMOX_HOST');

    	$scripts = [
        	'minecraft' => '/home/script0/minecraft.bash',
        	'glpi' => '/home/script0/glpi2.bash',
        	'odoo' => '/home/script0/odoo.bash',
        	'wordpress' => '/home/script0/wordpress.bash',
    	];

    	if (!isset($scripts[$application])) {
        	throw new \Exception("Application non supportée : " . $application);
    	}

    	$script = $scripts[$application];

    	$command = sprintf(
        	'ssh -i /home/user0/.ssh/id_ed25519 -o StrictHostKeyChecking=no -o ConnectTimeout=120 script0@%s "bash %s %s %s %s %s" 2>&1',
        	escapeshellarg($host),
        	escapeshellarg($script),
        	escapeshellarg($cpu),
        	escapeshellarg($memory),
        	escapeshellarg($storage),
            escapeshellarg($hostname)
        );

        exec($command, $output, $resultCode);

        if ($resultCode !== 0) {
            $instance->update(['status' => 'error']);

            throw new \Exception("Commande : " . $command . "\nRésultat : " . implode("\n", $output));
        }

        $outputText = implode("\n", $output);

        preg_match('/VMID choisi\s*:\s*(\d+)/', $outputText, $vmidMatch);
        preg_match('/Adresse IPv6\s*:\s*(\S+)/', $outputText, $ipMatch);
        preg_match('/Port.*:\s*(\d+)/', $outputText, $portMatch);

        $instance->update([
            'status' => 'running',
            'proxmox_ctid' => $vmidMatch[1] ?? null,
            'ip_address' => $ipMatch[1] ?? env('PROXMOX_PUBLIC_IP'),
            'port' => $portMatch[1] ?? 80,
        ]);
    }
}
