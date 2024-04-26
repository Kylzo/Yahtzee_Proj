import { Router } from "express";
import {
  assignRole,
  getPlayerRole,
  updatePlayerRole,
  removePlayerRole,
} from "../controllers/playerRole.controller";

const router = Router();

// Routes pour les rôles des joueurs
router.post("/playerRoles", assignRole);
router.get("/playerRoles/:id", getPlayerRole);
router.put("/playerRoles/:id", updatePlayerRole);
router.delete("/playerRoles/:id", removePlayerRole);

export default router;
