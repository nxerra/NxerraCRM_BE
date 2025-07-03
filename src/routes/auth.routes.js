import express from "express";
import * as AuthController from "../controllers/auth.controller.js";
// import {
//   authenticateToken,
//   authorizeAdmin,
// } from "../middleware/auth.middleware";

const router = express.Router();

// router.use(authorizeAdmin);

// ------------- /api/v1/register/admin ---------------
// ....................................................
router.post("/register/admin", AuthController.registerAdmin);

// ------------- /api/v1/register/moderator ---------------
// ....................................................
router.post("/register/moderator", AuthController.registerModerator);

// ------------- /api/v1/login ---------------
// ....................................................
router.post("/login", AuthController.login);

export default router;
