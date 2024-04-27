import jwt from "jsonwebtoken";
import Game from "../models/game.model.js";

import dotenv from "dotenv";

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Contrôleur pour créer une nouvelle partie
export const createGame = async (req, res) => {
  try {
    const { id_creator, state } = req.body;
    const newGame = await Game.create(id_creator, state);
    res.status(201).json(newGame);
  } catch (error) {
    console.error("Erreur lors de la création du jeu :", error);
    res.status(500).json({ message: "Échec de la création du jeu" });
  }
};

// Contrôleur pour obtenir toutes les parties
export const getAllGames = async (req, res) => {
  try {
    const games = await Game.getAll();
    res.status(200).json(games);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de toutes les parties :",
      error
    );
    res
      .status(500)
      .json({ message: "Échec de la récupération de toutes les parties" });
  }
};

// Contrôleur pour trouver une partie avec son ID
export const getGameById = async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await Game.getById(gameId);
    if (!game) {
      res.status(404).json({ message: "Partie non trouvé" });
    } else {
      res.status(200).json(game);
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la partie par ID :",
      error
    );
    res
      .status(500)
      .json({ message: "Échec de la récupération de la partie par ID" });
  }
};

// Contrôleur pour mettre à jour une partie
export const updateGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const { id_creator, state } = req.body; // Utiliser les paramètres de la base de données
    const updatedGame = await Game.update(gameId, id_creator, state);
    res.status(200).json(updatedGame);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la partie :", error);
    res.status(500).json({ message: "Échec de la mise à jour de la partie" });
  }
};

// Contrôleur pour supprimer une partie
export const deleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const token = req.cookies["jwt-token"];

    // Vérifiez si le token existe
    if (!token) {
      return res
        .status(401)
        .json({
          message: "Vous devez être connecté pour supprimer une partie",
        });
    }

    try {
      // Vérifiez et décodez le token
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      // Supprimez la partie indépendamment de l'identifiant du créateur
      await Game.delete(gameId);
      res.status(200).json({ message: "Jeu supprimé avec succès" });
    } catch (err) {
      return res.status(401).json({ message: "Token invalide" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du jeu :", error);
    res.status(500).json({ message: "Échec de la suppression du jeu" });
  }
};
