import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwtMiddleware from "./middlewares/jwt.middleware.js";
import playerRoutes from "./routes/player.route.js";
import authRoutes from "./routes/auth.route.js";
import gameRoutes from "./routes/game.route.js";
import dotenv from "dotenv";

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

const app = express();

// Middleware pour l'analyse des corps de requête JSON (uniquement pour les requêtes POST, PUT, PATCH, etc.)
app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    express.json()(req, res, next);
  } else {
    next();
  }
});

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
); // Utilisation du middleware CORS

app.use(cookieParser());

app.use(express.json());

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
