import sql from "better-sqlite3";
import crypto from "crypto";

const db = sql("yahtzee.db");

const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

const Player = {
  create: async (pseudo, email, password) => {
    try {
      const defaultRoleId = 2; // ID du rôle joueur par défaut
      const hashedPassword = hashPassword(password);

      await db
        .prepare(
          `
        INSERT INTO Player (pseudo, email, password, id_role)
        VALUES (?, ?, ?, ?)
      `
        )
        .run(pseudo, email, hashedPassword, defaultRoleId);

      // Récupérer l'ID du joueur nouvellement inséré
      const newPlayer = await db
        .prepare(
          "SELECT id_player FROM Player WHERE pseudo = ? AND email = ? AND password = ?"
        )
        .get(pseudo, email, hashedPassword);

      const newPlayerId = newPlayer ? newPlayer.id_player : null;

      // Récupérer les infos du joueur créé
      const createdPlayer = await Player.getById(newPlayerId);

      return createdPlayer;
    } catch (error) {
      throw new Error("Échec de la création du joueur : " + error.message);
    }
  },

  getById: async (playerId) => {
    try {
      // Récupérer les infos du joueur à partir de l'ID
      const player = await db
        .prepare("SELECT * FROM Player WHERE id_player = ?")
        .get(playerId);
      return player;
    } catch (error) {
      throw new Error(
        "Échec de la récupération du joueur par ID : " + error.message
      );
    }
  },

  authenticate: async (email, password) => {
    try {
      const hashedPassword = hashPassword(password);

      // Vérifier l'authentification du joueur
      const player = await db
        .prepare("SELECT * FROM Player WHERE email = ? AND password = ?")
        .get(email, hashedPassword);

      if (!player) {
        throw new Error("Email ou mot de passe incorrect");
      }

      return player;
    } catch (error) {
      throw new Error(
        "Échec de l'authentification du joueur : " + error.message
      );
    }
  },
};

export default Player;
