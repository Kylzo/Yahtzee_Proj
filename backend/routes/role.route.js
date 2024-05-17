import { Router } from "express";
import {
  createRole,
  deleteRoleById,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../controllers/role.controller.js";

const router = Router();

router.post("/roles", createRole);
router.get("/roles", getAllRoles);
router.get("/roles/:id", getRoleById);
router.put("/roles/:id", updateRole);
router.delete("/roles/:id", deleteRoleById);

export default router;
