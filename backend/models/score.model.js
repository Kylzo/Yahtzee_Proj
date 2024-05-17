import sql from "better-sqlite3";
const db = sql("yahtzee.db");

const Score = {
  create: async (score, id_game, id_player) => {
    try {
      await db
        .prepare(
          `
          INSERT INTO Score (score, id_game, id_player)
          VALUES (?, ?, ?)
        `
        )
        .run(score, id_game, id_player);

      // Récupération de l'identifiant du nouveau score inséré
      const newScoreId = db.prepare("SELECT last_insert_rowid()").pluck().get();

      const createdScore = await Score.getById(newScoreId);
      return createdScore;
    } catch (error) {
      throw new Error("Échec de la création du score : " + error.message);
    }
  },

  getAll: () => {
    try {
      const scores = db.prepare("SELECT * FROM Score").all();
      return scores;
    } catch (error) {
      throw new Error(
        "Échec de la récupération de tous les scores : " + error.message
      );
    }
  },

  getById: (scoreId) => {
    try {
      const score = db
        .prepare("SELECT * FROM Score WHERE id_score = ?")
        .get(scoreId);
      return score;
    } catch (error) {
      throw new Error(
        "Échec de la récupération du score par ID : " + error.message
      );
    }
  },

  update: (scoreId, score, id_game, id_player) => {
    try {
      db.prepare(
        `
        UPDATE Score
        SET score = ?, id_game = ?, id_player = ?
        WHERE id_score = ?
      `
      ).run(score, id_game, id_player, scoreId);

      const updatedScore = Score.getById(scoreId);
      return updatedScore;
    } catch (error) {
      throw new Error("Échec de la mise à jour du score : " + error.message);
    }
  },

  delete: (scoreId) => {
    try {
      db.prepare("DELETE FROM Score WHERE id_score = ?").run(scoreId);
      return { message: "Score supprimé avec succès" };
    } catch (error) {
      throw new Error("Échec de la suppression du score : " + error.message);
    }
  },
};

export default Score;
