<?php

namespace App\Services;

use App\Models\Instance;
use Illuminate\Support\Str;

class ProxmoxDeployService
{
    /**
     * Create a new class instance.
     */
    public function deployMinecraft(Instance $instance): void
    {
        set_time_limit(0);

        $ctid = 200 ;
        $port = 25565;

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
    	$applicationName = $instance->applicationOffer->application->name;
        $application = strtolower(trim($applicationName));

    	$cpu = $offer->cpu;
    	$memory = $offer->ram_mb;
    	$storage = $offer->storage_gb;

    	$hostname = Str::slug($applicationName) . '-' . $instance->user_id;
    	$host = env('PROXMOX_HOST');

    	$scripts = [
        	'minecraft java edition' => '/home/script0/minecraft.bash',
        	'glpi' => '/home/script0/glpi.bash',
        	'odoo' => '/home/script0/odoo.bash',
        	'wordpress' => '/home/script0/wordpress.bash',
    	];

    	if (!isset($scripts[$application])) {
        	throw new \Exception("Application non supportée : " . $application);
    	}

    	$script = $scripts[$application];

    	$command = sprintf( //TODO modifier le /home/ && installer supervisor et mettre le fichier avec bon user et bon chemin du backend
        	'ssh -i /home/leo/.ssh/id_ed25519 -o StrictHostKeyChecking=no -o ConnectTimeout=120 script0@%s "bash %s %s %s %s %s" 2>&1',
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

        $ip = $ipMatch[1] ?? env('PROXMOX_PUBLIC_IP');
        // Supprime http:// ou https://
        $ip = preg_replace('#^https?://#i', '', $ip);
        // Supprime les crochets IPv6
        $ip = trim($ip, '[]');

        $instance->update([
            'status' => 'running',
            'proxmox_ctid' => $vmidMatch[1] ?? null,
            'ip_address' => $ip,
            'port' => $portMatch[1] ?? 80,
        ]);
    }
}
