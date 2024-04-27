// server.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jwtMiddleware from "./middlewares/jwt.middleware.js";
import playerRoutes from "./routes/player.route.js";
import authRoutes from "./routes/auth.route.js";
import gameRoutes from "./routes/game.route.js"; // Ajout des routes de jeu

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

const app = express();

app.use(cookieParser());

// Middleware pour l'analyse des corps de requête JSON (uniquement pour les requêtes POST, PUT, PATCH, etc.)
app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    express.json()(req, res, next);
  } else {
    next();
  }
});

// Utilisation des routes d'authentification
app.use("/api", authRoutes);

// Utilisation des routes de jeu
app.use("/api", gameRoutes);

// Utilisation du middleware JWT après les routes d'authentification
app.use(jwtMiddleware);

// Utilisation des routes du joueur après le middleware JWT
app.use("/api", playerRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
