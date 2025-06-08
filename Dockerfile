# Étape 1 : build de l'app (optionnel si tu fais du transpile ou build React/Vue etc.)
FROM node:20

# Dossier de travail dans le conteneur
WORKDIR /app

# Copie des dépendances et install
COPY package*.json ./
RUN npm install

# Copie du reste du code
COPY . .

# Expose ton port (si ton app tourne sur 5000 par ex)
EXPOSE 5000

# Commande de lancement
CMD ["npm", "start"]