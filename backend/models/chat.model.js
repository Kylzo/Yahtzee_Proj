import sql from "better-sqlite3";
const db = sql("yahtzee.db");

const Chat = {
  insertMessage: async (
    id_message,
    content,
    date_message,
    id_game,
    id_player
  ) => {
    try {
      await db
        .prepare(
          `
          INSERT INTO Chat (id_message, content, date_message, id_game, id_player)
          VALUES (?, ?, ?, ?, ?)
        `
        )
        .run(id_message, content, date_message, id_game, id_player);

      // Récupération de l'identifiant du nouveau message inséré
      const newMessageId = db
        .prepare("SELECT last_insert_rowid()")
        .pluck()
        .get();
      const insertedMessage = await Chat.getMessageById(newMessageId);
      return insertedMessage;
    } catch (error) {
      throw new Error("Échec de l'insertion du message : " + error.message);
    }
  },

  getChatHistory: () => {
    try {
      const chatHistory = db.prepare("SELECT * FROM Chat").all();
      return chatHistory;
    } catch (error) {
      throw new Error(
        "Échec de la récupération de l'historique du chat : " + error.message
      );
    }
  },

  getMessageById: (messageId) => {
    try {
      const message = db
        .prepare("SELECT * FROM Chat WHERE id_message = ?")
        .get(messageId);
      return message;
    } catch (error) {
      throw new Error(
        "Échec de la récupération du message par ID : " + error.message
      );
    }
  },
};

export default Chat;
