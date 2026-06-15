# Version NPM - Node

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

nano ~/.zshrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

source ~/.zshrc
nvm install 22
nvm use 22
nvm alias deault 22
```

# Explication création projet React

## Dossier node_modules

- Contient toutes les dépendances installées

## Dossier public

- Contient le code HTML + page statique

## Dossier src

- Contient tout le code react du projet

# TODO
- Mise en place du paiement avec Paypal (developer) -> Si paiment OK, écriture dans la table SQL + appel script création conteneur + envoi mail pour dire paiement OK et création OK ou erreur ou autre problème
- Agrandir les côtés des écrans pour qu'ils fassent toute la longueur ✅
- Faire la page 'Mes instances' dans le profil afin de voir les instances qu'on a payé avec les informations
- Faire la page 'Support' et la page 'Contact' 
- Sur la page d'accueil ✅
  - Si authentifié, enlever le bouton "Connexion" et mettre à la place "Voir le profil" ✅
  - Lors de l'appuie sur "Offres" dans la navbar, descendre sur les offres ✅
  - Sur la section "Nos offres", mettre en place les quatres boutons ✅
- Avoir serveur SMTP pour envoi de mail pour création app + support