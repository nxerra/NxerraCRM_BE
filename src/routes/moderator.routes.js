import express from "express";
import * as modController from "../controllers/moderator.controller.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// ------------- /api/v1/access/:moderatorId ---------------
// ....................................................
router.put(
  "/access/:moderatorId",
  authenticateToken,
  authorizeAdmin,
  modController.modifyModeratorAccess
);

// ------------- /api/v1/ ---------------
// ....................................................
router.get(
  "/",
  authenticateToken,
  authorizeAdmin,
  modController.getAllModerators
);

export default router;
