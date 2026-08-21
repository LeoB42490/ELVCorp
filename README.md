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
- Après RDV : 
- mettre msg pour dire nom wordpress déja existant
- mettre reload page sur la création instance
- mettre cgv/cgu
- Vérification mdp (pas 123456789) (Regex)
- Suppression compte
- Contact => Support
- faute d'orthographes