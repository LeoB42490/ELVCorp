HOSTBUSTER

Nouvelle demande de support

Une nouvelle demande a été envoyée depuis l'espace client HostBuster.

Utilisateur : {{ $user->prenom }} {{ $user->nom }}

Adresse e-mail : {{ $user->email }}

Identifiant utilisateur : {{ $user->id }}

Sujet : {{ $supportSubject }}

Date : {{ now()->format('d/m/Y à H:i') }}

Message
-------

{{ $supportMessage }}

Vous pouvez répondre directement à cet e-mail pour contacter l'utilisateur.

HostBuster
© {{ date('Y') }} HostBuster