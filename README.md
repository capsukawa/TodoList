# TodoList

## La liste exhaustive des fonctionnalitées implémentées
Stockage des données dans Firebase

Reconnaissance vocale

Mode déconnecté


## La liste des fonctionnalitées dont l’implémentation a échoué et la cause
SSO avec Google : Marche en version web mais pas en version native (raison inconnue)

Application qui tourne sur mobile : La version déconnectée marche mais l'authentification Google ne fonctionne pas donc impossible d'y accéder sur mobile

## Le mode opératoire pour la compilation du projet et son déploiement sur mobile
npm install

cordova platform add android

ionic cordova run android

## L’export des règles sécurité de Firebase
Publiques


    service cloud.firestore {

      match /databases/{database}/documents {
  
        match /{document=**} {

          allow read, write;

    }}}

