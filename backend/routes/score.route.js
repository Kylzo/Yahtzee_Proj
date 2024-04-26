import { Router } from "express";
import {
  createScore,
  getAllScores,
  getScoreById,
  updateScore,
  deleteScore,
} from "../controllers/score.controller";

const router = Router();

// Routes pour les scores
router.post("/scores", createScore);
router.get("/scores", getAllScores);
router.get("/scores/:id", getScoreById);
router.put("/scores/:id", updateScore);
router.delete("/scores/:id", deleteScore);

export default router;
