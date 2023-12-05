# Recette Center Application de Recherche de Recettes

## Description

L'application de recherche de recettes est une application web qui permet aux utilisateurs de rechercher des recettes en fonction de divers critères, tels que les ingrédients, les informations nutritionnelles, etc. Les utilisateurs peuvent également sauvegarder leurs recettes préférées et les consulter ultérieurement.

## Fonctionnalités

- Recherche de Recettes Basique : Recherche de recettes en utilisant une liste d'ingrédients.
- 
- Recherche Basée sur les Nutriments : Trouvez des recettes en fonction de critères nutritionnels spécifiques.
- Recherche Avancée de Recettes : Effectuez des recherches avancées avec plusieurs paramètres.
- Authentification Utilisateur : Les utilisateurs peuvent se connecter, s'inscrire et gérer leur profil.
- Sauvegarde des Favoris : Les utilisateurs authentifiés peuvent sauvegarder des recettes en tant que favoris.

## Technologies Utilisées

- **Backend :**
  - FastAPI : Cadre web pour la création d'API avec Python.
  - SQLAlchemy : Outil SQL et Mapping Objet-Relationnel (ORM) pour Python.
  - Spoonacular API : API externe pour récupérer des informations sur les recettes.

- **Frontend :**
  - React : Bibliothèque JavaScript pour la création d'interfaces utilisateur.
  - Chakra UI : Bibliothèque de composants pour React axée sur l'accessibilité.
  - React Toastify : Bibliothèque de notifications pour afficher les retours utilisateur.
 
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](/assets/svg/uses-sql.svg)](https://forthebadge.com)

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)](https://forthebadge.com)

## Configuration

1. **Configuration du Backend :**
   - Installez les dépendances : `pip install -r requirements.txt`
   - Configurez la base de données : `python database.py`
   - Lancez le serveur FastAPI : `uvicorn main:app --reload`

2. **Configuration du Frontend :**
   - Installez les dépendances : `npm install`
   - Lancez le serveur de développement : `npm start`

3. **Configuration :**
   - Configurez la clé API Spoonacular dans le backend (mettez à jour le fichier `.env`).
   - Mettez à jour l'URL de base de l'API frontend dans `src/Home.js` si nécessaire.

## Configuration Docker

### Backend

1. Accédez au répertoire du backend :
    ```bash
    cd backend
    ```

2. Construisez l'image Docker :
    ```bash
    docker build -t nom-utilisateur/backend .
    ```

3. Exécutez le conteneur Docker :
    ```bash
    docker run -p 8000:8000 nom-utilisateur/ackend
    ```

### Frontend

1. Accédez au répertoire du frontend :
    ```bash
    cd frontend
    ```

2. Construisez l'image Docker :
    ```bash
    docker build -t nom-utilisateur/nom-projet-frontend .
    ```

3. Exécutez le conteneur Docker :
    ```bash
    docker run -p 3000:3000 nom-utilisateur/nom-projet-frontend
    ```

Assurez-vous d'adapter `nom-utilisateur` et `nom-projet` à vos préférences.

## Accès à l'Application

- Backend : [http://localhost:8000](http://localhost:8000)
- Frontend : [http://localhost:3000](http://localhost:3000)

## Utilisation

- Accédez à l'application web à l'adresse `http://localhost:3000`.
- Connectez-vous ou inscrivez-vous pour accéder aux fonctionnalités personnalisées.
- Utilisez la barre de recherche pour trouver des recettes en fonction de différents critères.
- Explorez les résultats de la recherche, consultez les détails des recettes et sauvegardez vos favoris.

## Licence

Ce projet est sous licence [MIT](LICENSE).


### Projet réalisé par 
- Karim AIT ALI OUBARI 
- Achraf BOUA
- Abdelraouf GHATGHUT


