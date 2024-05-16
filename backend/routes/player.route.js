import { Router } from "express";
import {
  getAllPlayers,
  playerInfo,
  updatePlayer,
  deletePlayer,
} from "../controllers/player.controller.js";

const router = Router();

router.get("/players", getAllPlayers);
router.get("/:id", playerInfo);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

export default router;
