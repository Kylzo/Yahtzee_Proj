import { Router } from "express";
import {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
} from "../controllers/chat.controller";

const router = Router();

// Routes pour le chat
router.post("/chat", createMessage);
router.get("/chat", getAllMessages);
router.get("/chat/:id", getMessageById);
router.put("/chat/:id", updateMessage);
router.delete("/chat/:id", deleteMessage);

export default router;
