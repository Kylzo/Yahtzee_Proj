import { Router } from "express";
import {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
} from "../controllers/game.controller";

const router = Router();

// Routes pour les jeux
router.post("/", createGame);
router.get("/", getAllGames);
router.get("/:id", getGameById);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);

export default router;
