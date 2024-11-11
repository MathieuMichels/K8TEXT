# K8TEXT
K8TEXT est un système de messages destiné au [K8STRAX](https://www.k8strax.be). 

Celui-ci permet d'envoyer des messages depuis la page [show/index.php](show/index.php) vers la page [send/index.php](send/index.php). Les features essentielles:
- Envoi de messages (anonymes ou non, vers un destinataire ou non)
- Prise en charge des émojis et messages multilignes.
- Responsive à la taille de l'écran (de smartphone à grand écran).
- Une modération automatique via l'API Perspective de Google.
- Un système de modération manuelle pour les messages problématiques.
- Une possibilité d'envoi d'annonces par les administrateurs.
## Installation
### Prérequis
- PHP 7.4 ou supérieur
- curl via PHP (installé par défaut sur la plupart des serveurs)
> [!NOTE]
> Voici par exemple un serveur gratuit sur lequel vous pouvez installer K8TEXT: [InfinityFree](https://www.infinityfree.com/)

> [!TIP]
> Si vous n'avez pas d'url à votre nom, mettez simplement la page en plein écran (F11) et le tour est joué !
### Étapes
1. Téléchargez le code source.
2. Copiez le contenu du dossier `k8text` dans le dossier de votre serveur web.
3. Modifier le fichier `assets/js/settings.js` et `assets/php/config.php` pour correspondre à votre configuration.
4. S'ils n'existent pas, créez les fichiers `assets/messages/messages.json`, `assets/messages/messages_backup.json` et `assets/messages/rejected_messages.json` et donnez-leur les permissions d'écriture.
5. Profitez de K8TEXT!

## Paramètres
- Dans le fichier `assets/js/settings.js`, vous pouvez modifier les paramètres suivants :
```javascript
const SHOWMESSAGEDATE = true; // mettre à true pour afficher la date des messages
const TIMEINTERVALDEFILEMENT = 3000; // Temps entre chaque défilement en ms
const TIMEINTERVALCHECKNEWMESSAGES = 5000; // Temps entre chaque vérification de nouveaux messages en ms
const ADMINNAME = 'orgaK8'; // Nom de l'admin
const DEFILEMENTAUTOSURADMIN = false; // true, false (activer ou désactiver le défilement automatique sur la page admin)
```
- Dans le fichier `assets/php/config.php`, vous pouvez modifier les paramètres suivants :
```php
const MAXMESSAGES = 30; // Nombre maximum de messages affichés (et stockés dans le fichier MESSAGES_FILE)
const AUTOMOD = false; // Activer ou désactiver la modération automatique
const API_KEY = 'YOUR_KEY_HERE'; // Clé API Perspective de Google si AUTOMOD est activé
const API_URL = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=' . API_KEY; // URL de l'API Perspective
const LANGUAGES = 'fr'; // Langue des messages pour l'AUTO-MOD
const TIMEZONE = 'Europe/Brussels'; // 
const TOXICITY_LEVEL = 0.2; // Niveau de toxicité pour lequel un message est rejeté
const MESSAGES_FILE = 'messages.json'; // Fichier de stockage des messages
const MESSAGES_BACKUP_FILE = 'messages_backup.json'; // Fichier de sauvegarde des messages
const REJECTED_MESSAGES_FILE = 'rejected_messages.json'; // Fichier de stockage des messages rejetés par l'AUTO-MOD
const ADMIN_USERNAME = 'admin'; // Nom d'utilisateur de l'admin
const ADMIN_PASSWORD = 'admin'; // Mot de passe de l'admin
```


> [!WARNING]
> K8TEXT est un projet scout !
> 
> Il n'est en aucun cas un exemple en terme de cybersécurité. Il est fortement recommandé de ne pas utiliser les techniques de sécurité utilisées dans ce projet pour un projet professionnel.
> 
> De plus, il ne dispose d'aucune optimisation quelconque. Il a été conçu pour être utilisé avec quelques ordinateurs dédiés à l'envoi et quelques ordinateurs dédiés à l'affichage des messages. La priorité a été donnée à la simplicité à le déployer sur n'importe quel serveur web. Il n'est pas recommandé de l'utiliser pour des événements de très grande envergure.