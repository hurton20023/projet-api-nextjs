# Projet Next.js

## Pour commencer

**⚠️ Attention importante ⚠️** :
    Contacter moi pour obtenir le fichier .env :
    Le fichier .env est essentiel pour le bon fonctionnement de l'application, car il contient les variables d'environnement nécessaires (comme les clés API, les informations de connexion à la base de données, etc.). Ne partagez jamais ce fichier publiquement. Si vous n'avez pas encore le fichier .env, contactez-moi pour que je vous le fournisse.

    N'hésitez pas à me contacter si vous avez des questions ou des problèmes lors de la configuration du projet ! 😊

1. **Installer les dépendances** :  
    Avant de pouvoir exécuter le projet, vous devez installer les dépendances nécessaires. Pour cela, exécutez la commande suivante dans votre terminal :

   ```bash
   npm install
   ```

   Pour l'authentification compte classique et OAuth2 j'ai utiliser NextAuth 

   Cette commande installera tous les packages listés dans le fichier package.json.

    Générer le client Prisma :
    Si ce projet utilise Prisma (un ORM pour Node.js), vous devez générer le client Prisma. Exécutez la commande suivante :

    ```bash
    npx prisma generate
    ```

    Cette commande générera le client Prisma en fonction de votre schéma Prisma (schema.prisma), ce qui vous permettra d'interagir avec votre base de données.

    Démarrer le serveur de développement :
    Une fois les étapes précédentes terminées, vous pouvez démarrer le serveur de développement en exécutant :

        ```bash
    npm irun dev
    ```

    Cela lancera le serveur de développement Next.js, et vous pourrez accéder à votre application en ouvrant http://localhost:3000 dans votre navigateur.

    Modifier la page
    Vous pouvez commencer à éditer la page en modifiant le fichier app/page.tsx. Les modifications que vous apportez seront automatiquement reflétées dans le navigateur grâce au rechargement automatique (hot-reloading).