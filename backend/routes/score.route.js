import { Router } from "express";
import {
  createScore,
  getAllScores,
  getScoreById,
  updateScore,
  deleteScore,
} from "../controllers/score.controller.js";

const router = Router();

router.post("/scores", createScore);
router.get("/scores", getAllScores);
router.get("/scores/:id", getScoreById);
router.put("/scores/:id", updateScore);
router.delete("/scores/:id", deleteScore);

export default router;
