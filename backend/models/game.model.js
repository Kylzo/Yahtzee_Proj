import sql from "better-sqlite3";

const db = sql("yahtzee.db");

const Game = {
  create: async (id_creator, state) => {
    try {
      await db
        .prepare(
          `
          INSERT INTO Game (id_creator, state)
          VALUES (?, ?)
        `
        )
        .run(id_creator, state);

      const newGameId = db.prepare("SELECT last_insert_rowid()").pluck().get();
      const createdGame = await Game.getById(newGameId);
      return createdGame;
    } catch (error) {
      throw new Error("Échec de la création de la partie : " + error.message);
    }
  },

  getAll: async () => {
    try {
      const games = db.prepare("SELECT * FROM Game").all();
      return games;
    } catch (error) {
      throw new Error(
        "Échec de la récupération de tous les jeux : " + error.message
      );
    }
  },

  getById: async (gameId) => {
    try {
      const game = db
        .prepare("SELECT * FROM Game WHERE id_game = ?")
        .get(gameId);
      return game;
    } catch (error) {
      throw new Error(
        "Échec de la récupération du jeu par ID : " + error.message
      );
    }
  },

  update: async (gameId, id_creator, state) => {
    try {
      await db
        .prepare(
          `
        UPDATE Game
        SET id_creator = ?, state = ?
        WHERE id_game = ?  -- Utiliser la colonne id_game
      `
        )
        .run(id_creator, state, gameId);

      const updatedGame = await Game.getById(gameId);
      return updatedGame;
    } catch (error) {
      throw new Error("Échec de la mise à jour du jeu : " + error.message);
    }
  },

  delete: async (gameId) => {
    try {
      await db.prepare("DELETE FROM Game WHERE id_game = ?").run(gameId);
      return { message: "Jeu supprimé avec succès" };
    } catch (error) {
      throw new Error("Échec de la suppression du jeu : " + error.message);
    }
  },
};

export default Game;
