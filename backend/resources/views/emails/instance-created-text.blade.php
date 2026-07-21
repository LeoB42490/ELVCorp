HOSTBUSTER
Votre instance est prête

Bonjour {{ $instance->user->prenom ?? $instance->user->nom ?? '' }},

Le déploiement de votre instance a été effectué avec succès.

Informations de connexion
--------------------------

Nom : {{ $instance->name }}

Adresse IPv6 : {{ $instance->ip_address ?? 'Non disponible' }}

Port : {{ $instance->port ?? 'Port par défaut' }}

Statut : En fonctionnement

Date de création : {{ optional($instance->created_at)->format('d/m/Y à H:i') }}

@if($accessUrl !== '')
Adresse d'accès :
{{ $accessUrl }}
@endif

Conservez ces informations. Elles vous permettront d'accéder à votre service.

En cas de difficulté, contactez le support depuis votre espace HostBuster.

HostBuster
© {{ date('Y') }} HostBuster