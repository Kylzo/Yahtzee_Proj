import { Router } from "express";
import {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
} from "../controllers/game.controller.js";

const router = Router();

// Routes pour les jeux
router.post("/games", createGame);
router.get("/games", getAllGames);
router.get("/games/:id", getGameById);
router.put("/games/:id", updateGame);
router.delete("/games/:id", deleteGame);

export default router;
