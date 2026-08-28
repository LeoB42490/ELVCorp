<?php

return [
    /*
     * Nombre de jours après lesquels une instance nouvellement déployée
     * expire automatiquement et est supprimée par la commande
     * `instances:prune-expired`.
     */
    'default_ttl_days' => env('INSTANCE_DEFAULT_TTL_DAYS', 30),
];
