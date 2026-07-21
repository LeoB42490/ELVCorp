HOSTBUSTER

Échec du déploiement de votre instance

Bonjour {{ $instance->user->prenom ?? $instance->user->nom ?? '' }},

Nous sommes désolés, une erreur est survenue lors du déploiement de votre instance.

Informations
------------

Nom : {{ $instance->name }}

Statut : Erreur de déploiement

Date de la demande : {{ optional($instance->created_at)->format('d/m/Y à H:i') }}

Aucun accès n'a pu être créé pour cette instance.

Notre équipe vous invite à réessayer ultérieurement. Si le problème persiste, contactez le support depuis votre espace HostBuster en précisant le nom de votre instance.

Merci de votre compréhension.

HostBuster
© {{ date('Y') }} HostBuster