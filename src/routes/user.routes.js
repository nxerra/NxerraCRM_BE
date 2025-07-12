import express from "express";
import * as UserController from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { profileImageUpload } from "../utils/s3.config.js";
// import multer from 'multer';
// const upload = multer({ storage: multer.memoryStorage() });



const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Admin and moderator profile management endpoints
 */

/**
 * @swagger
 * /api/v1/auth/user/get-profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       401:
 *         description: Unauthorized
 */
router.get("/get-profile", authenticateToken , UserController.getProfile);

/**
 * @swagger
 * /api/v1/auth/user/update-profile/{id}:
 *   put:
 *     summary: Update current user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               designation:
 *                 type: string
 *               department:
 *                 type: string
 *               whatsapp:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 *       400:
 *         description: Update failed
 *       401:
 *         description: Unauthorized
 */

router.put("/update-profile/:id", authenticateToken, profileImageUpload, UserController.updateProfile);
// router.put("/update-profile/:id", authenticateToken , upload.single("profilePicture"), UserController.updateProfile);

/**
 * @swagger
 * /api/v1/auth/user/delete-profile/{id}:
 *   delete:
 *     summary: Delete current user account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted
 *       401:
 *         description: Unauthorized
 */
router.delete("/delete-profile/:id", authenticateToken , UserController.deleteUser);

export default router;
