import Chat from "../models/chat.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { id_message, content, date_message, id_game, id_player } = req.body;
    const insertedMessage = await Chat.insertMessage(
      id_message,
      content,
      date_message,
      id_game,
      id_player
    );
    res.status(201).json(insertedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de l'envoi du message.",
    });
  }
};

// Contrôleur pour récupérer l'historique des messages
export const getChatHistory = async (req, res) => {
  try {
    const chatHistory = await Chat.getChatHistory();
    res.json(chatHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération de l'historique du chat.",
    });
  }
};
