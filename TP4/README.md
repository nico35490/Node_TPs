# ESIR-TP4 : Tests unitaires et sécurité

Pour ce TP nous allons repartir de l'état final du TP4.
Nous allons lui ajouter des tests unitaires, un peu de sécurité et une optimisation pour supporter des montées en charges.

## Objectifs :

- Mettre en place des tests unitaires sur les services REST
- Comprendre quelques failles de sécurité commune et le moyen de les éviter
- Optimiser notre serveur par l'utilisation d'un pattern de cache mémoire.

## Sujets abordés :

- Express
- REST / CRUD
- Tests unitaires
- Sécurisation des applications web
- Tests de performance

## Lien utiles :

- Outillage (npm, node, git, curl, postman, ab, etc.) : https://slides.com/stephmichel/deck-4#/
- Express : Le cours sur les tests unitaires et de charges de Benoît.
- tests unitaires avec mocha et chai : https://mherman.org/blog/testing-node-js-with-mocha-and-chai/
- ab : https://slides.com/stephmichel/deck-4#/10
- zap : https://slides.com/stephmichel/deck-4#/12
- httpstat : https://slides.com/stephmichel/deck-4#/8

## Modules node utilisés

- express : https://www.npmjs.com/package/express
- mocha : https://www.npmjs.com/package/mocha
- chai : https://www.npmjs.com/package/chai
- chai-http : https://www.npmjs.com/package/chai-http
- helmet : https://www.npmjs.com/package/helmet

Pour le bon déroulement du TP et pour vous familiariser avec GIT, lorsque vous liser une ligne du genre (Tag: BLA-BLA-BLA),
c'est qu'il est temps de commiter vos modifications afin de pouvoir revenir à ce niveau de code plus tard si besoin.
Ceci vous permettra également de vous y retrouver lorsque le correctif vous sera fourni.

# Initialisation d'un projet

Repartir de l'état final du TP3.

(tag : **TP4-ESIR-INIT**)

# STEP 1 : Configuration et premier test unitaire

Nous allons installer les modules mocha et chai-http et réaliser le test unitaire d'un permier service REST.

Modifier le package.json afin d'y ajouter le script de lancement des tests avec mocha :

    "test": "mocha --watch"

Créer un répertoire test et à l'intérieur, créer un fichier de test unitaire de users-v1.js. On pourra par exemple l'appeler users-v1-test.js.

Chai-http prend en entrée une application web, dans notre cas l'application express (c'est à dire la variable app dans app.js).

Il va donc falloir faire un peu de refactoring afin de rendre accessible l'objet app de app.js (en en faisant un module).

A la fin du fichier app.js nous allons retrouvé un export de l'app :

    ...
    // For unit tests
    exports.app = app

Il faudra déplacé le app.listen() qui est pour le moment réalisé dans app.js dans un nouveau fichier (server.js par exemple) qui deviendra le nouveau point d'entrée de l'application.

server.js ressemblera à ceci :

    // Import du nouveau module app
    const {app} = require('./app')

    // Lancement du server (qui était auparavant dans app.js)
    const port = process.env.PORT || '3000'
    app.listen(port)

Ceci impliquera une mise à jour dans package.json pour s'assurer que le serveur fonctionne encore.

    {
      ...
      "main": "server.js",
      ...

Après cette étape de refactoring vous aurez :

- un fichier module app.js qui instancie un express, mais qui ne démarre pas le serveur (il n'appelle pas listen()).
- un fichier server.js qui utilise le module app.js et qui lance le serveur sur un port spécifique.

Vérifier que votre serveur fonctionne encore avec la commande : npm start

Il vous reste à modifier le fichier users-v1-test.js afin d'y importer les modules app.js, chai et chai-http.
Coder maintenant le test du service REST /v1/users :

    const chai = require('chai')
    const chaiHttp = require('chai-http')
    const {app} = require('../app')
    chai.use(chaiHttp)

    describe('Users tests', () => {
      it('should list ALL users on /v1/users GET', (done) => {
        // TODO
      })
    })

(tag : **TP4-ESIR-STEP1**)

# STEP 2 : Réaliser les autres tests unitaires

En autonomie, il s'agit de réaliser les tests unitaires de tous les autres service REST.

    it('should list a SINGLE user on /v1/users/<id> GET')
    it('should add a SINGLE user on /v1/users POST')
    it('should update a SINGLE user on /v1/users/<id> PATCH')
    it('should delete a SINGLE user on /v1/users/<id> DELETE')

Remarque : vos tests vous remontrons peut être des bugs, qu'il vous faudra bien évidemment corriger...

(tag : **TP4-ESIR-STEP2**)

# STEP 3 : Tester les failles de son server web avec OWASP ZAP (Zed Attack Project)

En autonomie, il s'agit de tester son application avec l'outil [ZAP](https://slides.com/stephmichel/deck-4#/12) de la fondation OWASP.

Après cette analyse des failles, il s'agit de trouver les parades...

Pour lancer zap, sous linux, tapez zap, il a été installé par vos administrateurs.

[Vous devriez obtenir quelque chose comme...](zap.PNG)

@import "zap.PNG"

Aide : un bon casque fera l'affaire

[Après correction vous devriez obtenir quelque chose comme...](zap-helmet.PNG)

@import "zap-helmet.PNG"

(tag : **TP4-ESIR-STEP3**)

# STEP 4 : Tests de performance

Réaliser des tests de performance (de charge) avec l'outil ab sur l'ensemble de votre API. Faites varier le nombre de clients pour analyser l'évolution des temps de réponse.

# BONUS : httpstat

Plutôt que d'utiliser curl, essayer le module [httpstat](https://slides.com/stephmichel/deck-4#/8) pour analyser les temps de réponse de vos requêtes HTTP.
