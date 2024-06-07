import jwt from "jsonwebtoken";
import Player from "../models/auth.model.js";
import dotenv from "dotenv";

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

const secretKey = process.env.SECRET_KEY;

const authController = {
  signUp: async (req, res) => {
    try {
      const { pseudo, email, password } = req.body;

      if (!pseudo || !email || !password) {
        return res.status(400).json({
          message:
            "Le pseudo, l'e-mail et le mot de passe sont requis pour créer un compte",
        });
      }

      const newPlayer = await Player.create(pseudo, email, password);

      // Générer un jeton JWT avec la clé secrète obtenue des variables d'environnement
      const token = jwt.sign({ playerId: newPlayer.id_player }, secretKey, {
        expiresIn: "1h",
      });

      // Stocker le jeton JWT dans les cookies
      res.cookie("jwt-token", token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res
        .status(201)
        .json({ message: "Compte joueur créé avec succès", token });
    } catch (error) {
      console.error("Erreur lors de la création du compte joueur:", error);
      res
        .status(500)
        .json({ message: "Échec de la création du compte joueur" });
    }
  },

  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "L'e-mail et le mot de passe sont requis pour se connecter",
        });
      }

      // Authentifier le joueur
      const player = await Player.authenticate(email, password);

      if (!player) {
        return res
          .status(401)
          .json({ message: "E-mail ou mot de passe invalide" });
      }

      // Générer un jeton JWT
      const token = jwt.sign({ playerId: player.id_player }, secretKey, {
        expiresIn: "1h",
      });

      // Stocker le jeton JWT dans les cookies
      res.cookie("jwt-token", token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      res.status(500).json({ message: "Échec de la connexion" });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("jwt-token");
      res.status(200).json({ message: "Déconnexion réussie" });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      res.status(500).json({ message: "Échec de la déconnexion" });
    }
  },
};

export default authController;
