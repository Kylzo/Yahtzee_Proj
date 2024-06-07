import jwt from "jsonwebtoken";
import Game from "../models/game.model.js";

import dotenv from "dotenv";

dotenv.config();

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

export const getGameById = async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await Game.getById(gameId);
    if (!game) {
      res.status(404).json({ message: "Partie non trouvée" });
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

export const updateGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const { id_creator, state } = req.body;
    const updatedGame = await Game.update(gameId, id_creator, state);
    res.status(200).json(updatedGame);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la partie :", error);
    res.status(500).json({ message: "Échec de la mise à jour de la partie" });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const token = req.cookies["jwt-token"];

    if (!token) {
      return res.status(401).json({
        message: "Vous devez être connecté pour supprimer une partie",
      });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
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
