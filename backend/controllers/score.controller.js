import Score from "../models/score.model.js";

export const createScore = async (req, res) => {
  try {
    const { score, id_game, id_player } = req.body;
    const newScore = await Score.create(score, id_game, id_player);
    res.status(201).json(newScore);
  } catch (error) {
    console.error("Erreur lors de la création du score :", error);
    res.status(500).json({ message: "Échec de la création du score" });
  }
};

export const getAllScores = async (req, res) => {
  try {
    const scores = await Score.getAll();
    res.status(200).json(scores);
  } catch (error) {
    console.error("Erreur lors de la récupération de tous les scores :", error);
    res
      .status(500)
      .json({ message: "Échec de la récupération de tous les scores" });
  }
};

export const getScoreById = async (req, res) => {
  try {
    const scoreId = req.params.id;
    const score = await Score.getById(scoreId);
    if (!score) {
      res.status(404).json({ message: "Score non trouvé" });
    } else {
      res.status(200).json(score);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du score par ID :", error);
    res
      .status(500)
      .json({ message: "Échec de la récupération du score par ID" });
  }
};

export const updateScore = async (req, res) => {
  try {
    const scoreId = req.params.id;
    const { score, id_game, id_player } = req.body;
    const updatedScore = await Score.update(scoreId, score, id_game, id_player);
    res.status(200).json(updatedScore);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du score :", error);
    res.status(500).json({ message: "Échec de la mise à jour du score" });
  }
};

export const deleteScore = async (req, res) => {
  try {
    const scoreId = req.params.id;
    await Score.delete(scoreId);
    res.status(200).json({ message: "Score supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du score :", error);
    res.status(500).json({ message: "Échec de la suppression du score" });
  }
};
