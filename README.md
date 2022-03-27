<div id="top"></div>



[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://forthebadge.com)


  <h1 align="center">INFO834 : Application de messagerie</h1>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Contenu</summary>
  <ol>
    <li>
      <a href="#about-the-project">A propos du projet</a>
      <ul>
        <li><a href="#built-with">Technologies utilisées</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Lancer le projet</a>
      <ul>
        <li><a href="#prerequisites">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributeurs</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## A propos du projet


Ce projet a été mené dans le cadre du cours d'INFO834 - Bases de données distribuées. Le but était de créer une application de messagerie instantanée utilisable en simultané par plusieurs utilisateurs.

Voici les principales fonctionnalités de l'application :
~~~
🟢 Permettre à l'utilisateur de se connecter et de se déconnecter
🟢Permettre à l'utilisateur de voir quels autres utilisateurs sont en ligne
🟢Permettre à l'utilisateur d'accéder à une partie de son historique de conversation
~~~
<p align="right">(<a href="#top">Retour en haut</a>)</p>


### Technologies utilisées

* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Socket.IO](https://socket.io/)
* [Redis](https://redis.io/)
<p align="right">(<a href="#top">Retour en haut</a>)</p>

### Versions du projet
* Branche 'etape1' : version fonctionnelle basée sur le tutoriel Moodle avec un Redis non testé et sans base de données MongoDB. 
* Branche 'etape2' : version finale


<!-- GETTING STARTED -->
## Lancer le projet

Voici les étapes à suivre pour pouvoir démarrer localement le projet.

### Prérequis

Il faut tout d'abord s'assurer d'avoir installé les quatres technologies requises.

### Installation


1. Cloner le dépôt GitHub
   ```sh
   git clone https://github.com/christelle101/INFO834_ChatServer.git
   ```
2. Installer les packages NPM
   ```sh
   npm install
   ```
3. Se placer dans le répertoire associé au projet
4. Démarrer MongoDB et une instance de serveur Redis
5. Lancer la commande
   ```sh
   node server.js
   ```

<p align="right">(<a href="#top">Retour en haut</a>)</p>


<!-- CONTRIBUTING -->
## Contributeurs

🙍‍♀️ Yawoumihani HASSANI

🙆‍♀️ Christelle RANDRIAMAHEFA
