FROM node:20

# Dossier de travail dans le conteneur
WORKDIR /app

# Copie des dépendances et install
COPY package*.json ./
RUN npm install

# Copie du code de l'application
COPY . .

# Expose ton port
EXPOSE 5000

# Commande de lancement
CMD ["npm", "start"]