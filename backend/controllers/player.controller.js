import Player from "../models/player.model.js";
import dotenv from "dotenv";

dotenv.config();

export function getAllPlayers(req, res) {
  try {
    const players = Player.getAll();
    res.status(200).json(players);
  } catch (error) {
    console.error("Erreur lors de la récupération des joueurs :", error);
    res.status(500).json({ message: "Échec de la récupération des joueurs" });
  }
}

export function playerInfo(req, res) {
  try {
    const playerId = req.query.id_player;
    const player = Player.getById(playerId);
    if (!player) {
      return res.status(404).json({ message: "Joueur non trouvé" });
    }
    console.log("Joueur :", player);
    res.status(200).json(player);
  } catch (error) {
    console.error("Erreur lors de la récupération du joueur :", error);
    res.status(500).json({ message: "Échec de la récupération du joueur" });
  }
}

export function updatePlayer(req, res) {
  try {
    const playerId = req.query.id_player;
    const { avatar, pseudo, email, password, id_role } = req.body;
    Player.update(playerId, avatar, pseudo, email, password, id_role);
    console.log("Joueur mis à jour avec succès");
    res.status(200).json({ message: "Joueur mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du joueur :", error);
    res.status(500).json({ message: "Échec de la mise à jour du joueur" });
  }
}

export function deletePlayer(req, res) {
  try {
    const playerId = req.query.id_player;
    Player.deleteById(playerId);
    console.log("Joueur supprimé avec succès");
    res.status(200).json({ message: "Joueur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du joueur :", error);
    res.status(500).json({ message: "Échec de la suppression du joueur" });
  }
}
