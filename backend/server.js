import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwtMiddleware from "./middlewares/jwt.middleware.js";
import playerRoutes from "./routes/player.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true, // Nécessaire pour autoriser l'envoi de cookies
  })
);

// Utiliser cookie-parser
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

// Route pour définir le cookie JWT (peut être supprimée si elle n'est pas nécessaire)
app.get("/set-cookie", (req, res) => {
  // Définir un cookie avec le nom "jwt-token" et la valeur "your-token-value"
  res.cookie("jwt-token", "your-token-value", {
    // Options du cookie
    maxAge: 3600000, // Durée de validité en millisecondes (1 heure dans cet exemple)
    httpOnly: true, // Rend le cookie inaccessible via JavaScript côté client
    secure: true, // Le cookie ne sera envoyé que via HTTPS
    sameSite: "strict", // Le cookie n'est envoyé que pour les requêtes provenant du même site
  });

  res.send("Cookie défini avec succès !");
});

// Utilisation du middleware JWT après les routes d'authentification
app.use(jwtMiddleware);

// Utilisation des routes du joueur après le middleware JWT
app.use("/api", playerRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
