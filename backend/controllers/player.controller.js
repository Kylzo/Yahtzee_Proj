import Player from "../models/player.model.js";

const playerController = {
  getAllPlayers: (req, res) => {
    try {
      const players = Player.getAll();
      console.log("All players:", players);
      res.status(200).json(players);
    } catch (error) {
      console.error("Error fetching players:", error);
      res.status(500).json({ message: "Failed to fetch players" });
    }
  },

  playerInfo: (req, res) => {
    try {
      const playerId = req.query.id_player;
      const player = Player.getById(playerId);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      console.log("Player:", player);
      res.status(200).json(player);
    } catch (error) {
      console.error("Error fetching player:", error);
      res.status(500).json({ message: "Failed to fetch player" });
    }
  },

  updatePlayer: (req, res) => {
    try {
      const playerId = req.query.id_player;
      const { avatar, pseudo, email, password, id_role } = req.body;
      Player.update(playerId, avatar, pseudo, email, password, id_role);
      console.log("Player updated successfully");
      res.status(200).json({ message: "Player updated successfully" });
    } catch (error) {
      console.error("Error updating player:", error);
      res.status(500).json({ message: "Failed to update player" });
    }
  },

  deletePlayer: (req, res) => {
    try {
      const playerId = req.query.id_player;
      Player.deleteById(playerId);
      console.log("Player deleted successfully");
      res.status(200).json({ message: "Player deleted successfully" });
    } catch (error) {
      console.error("Error deleting player:", error);
      res.status(500).json({ message: "Failed to delete player" });
    }
  },
};

export default playerController;
