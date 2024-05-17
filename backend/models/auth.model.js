import sql from "better-sqlite3";

const db = sql("yahtzee.db");

const Player = {
  create: async (pseudo, email, password) => {
    try {
      const defaultRoleId = 2; // ID du rôle joueur par défaut
      await db
        .prepare(
          `
        INSERT INTO Player (pseudo, email, password, id_role)
        VALUES (?, ?, ?, ?)
      `
        )
        .run(pseudo, email, password, defaultRoleId);

      // Récupérer l'ID du joueur nouvellement inséré
      const newPlayer = await db
        .prepare(
          "SELECT id_player FROM Player WHERE pseudo = ? AND email = ? AND password = ?"
        )
        .get(pseudo, email, password);

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
      // Vérifier l'authentification du joueur
      const player = await db
        .prepare("SELECT * FROM Player WHERE email = ? AND password = ?")
        .get(email, password);
      return player;
    } catch (error) {
      throw new Error(
        "Échec de l'authentification du joueur : " + error.message
      );
    }
  },
};

export default Player;
