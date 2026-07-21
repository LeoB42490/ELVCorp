HOSTBUSTER

Votre instance a été supprimée

Bonjour {{ $instance->user->prenom ?? $instance->user->nom ?? '' }},

Votre instance a été supprimée avec succès de notre plateforme.

Informations
------------

Nom : {{ $instance->name }}

Statut : Supprimée

Date de suppression : {{ now()->format('d/m/Y à H:i') }}

Toutes les ressources associées à cette instance ont été supprimées.

Si cette suppression n'était pas souhaitée, vous pouvez créer une nouvelle instance depuis votre espace HostBuster.

Merci de votre confiance.

HostBuster
© {{ date('Y') }} HostBuster