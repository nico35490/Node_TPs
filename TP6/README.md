# ESIR-TP6 - Alertes

Notre démarche de développement à été faite autour des test : nous avons d'abord implémenter les tests puis implémenter les fonctionnalités au fur et à mesure en s'assurant que l'API respectait le swagger implémenté avec les tests.
## Authentification :

### En dur
Un token avec une longue durée de validité est présent en dur dans les fichiers de test pour pouvoir utiliser l'API

### Avec le TP 5 :
Un login est nécessaire pour accéder à l'API via un JWT par la suite.
Pour login, faites un POST (via postman par exemple) à l'adresse localhost:3000/v1/auth/login avec login et password en paramètres.
Par exemple pour un login=pedro et un password=1234, faites localhost:3000/v1/auth/login?login=pedro&password=1234
