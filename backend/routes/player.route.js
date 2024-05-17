import { Router } from "express";
import {
  getAllPlayers,
  playerInfo,
  updatePlayer,
  deletePlayer,
  currentUser,
} from "../controllers/player.controller.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";

const router = Router();

// Routes pour les joueurs
router.get("/current-user", jwtMiddleware, currentUser);
router.get("/players", getAllPlayers);
router.get("/:id", playerInfo);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

export default router;
