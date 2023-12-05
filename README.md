# Recette Center Application de Recherche de Recettes

## Description

L'application de recherche de recettes est une application web qui permet aux utilisateurs de rechercher des recettes en fonction de divers critères, tels que les ingrédients, les informations nutritionnelles, etc. Les utilisateurs peuvent également sauvegarder leurs recettes préférées et les consulter ultérieurement.

## Fonctionnalités

- Recherche de Recettes Basique : Recherche de recettes en utilisant une liste d'ingrédients.
  <img width="738" alt="image" src="https://github.com/Abdelgt1/RecetteCenter/assets/132302057/dd1843e8-47f4-4634-a4d7-e0cb9f66fc43">
- Recherche Basée sur les Nutriments : Trouvez des recettes en fonction de critères nutritionnels spécifiques.
  <img width="593" alt="image" src="https://github.com/Abdelgt1/RecetteCenter/assets/132302057/5cd9c5a9-8221-4d1d-859c-be44d6ced2f2">
- Recherche Avancée de Recettes : Effectuez des recherches avancées avec plusieurs paramètres.
  <img width="609" alt="image" src="https://github.com/Abdelgt1/RecetteCenter/assets/132302057/cae3c974-4ded-4a93-b1ba-4faa8b88c395">
- Authentification Utilisateur : Les utilisateurs peuvent se connecter, s'inscrire et gérer leur profil.
  <img width="811" alt="image" src="https://github.com/Abdelgt1/RecetteCenter/assets/132302057/ad6c18dd-42a2-448e-9c1b-9724c740199b">
  <img width="800" alt="image" src="https://github.com/Abdelgt1/RecetteCenter/assets/132302057/5ef68701-5be8-4dec-bb9e-d1997ca25dd3">
- Sauvegarde des Favoris : Les utilisateurs authentifiés peuvent sauvegarder des recettes en tant que favoris.
  <img width="313" alt="image" src="https://github.com/Abdelgt1/RecetteCenter/assets/132302057/55bbe051-abfc-4203-98f0-e5fc53c3105d">

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


[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)](https://forthebadge.com)

## Endpoint
![image](https://github.com/Abdelgt1/RecetteCenter/assets/132302057/aec92d20-1701-4280-8309-3e7e1648324e)

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


