// player.route.js

import { Router } from "express";
import playerController from "../controllers/player.controller.js"; // Importez playerController

const router = Router();

// Routes pour les joueurs
router.get("/players", playerController.getAllPlayers);
router.get("/:id", playerController.playerInfo);
router.put("/:id", playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);

export default router;
