import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const router = Router();

// Auth routes
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

export default router;
