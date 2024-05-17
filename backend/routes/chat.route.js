import { Router } from "express";
import { sendMessage, getChatHistory } from "../controllers/chat.controller.js";

const router = Router();

router.post("/send-message", sendMessage);
router.get("/chat-history", getChatHistory);

export default router;
