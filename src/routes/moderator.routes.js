import express from "express";
import * as modController from "../controllers/moderator.controller.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Moderators
 *   description: Admin access control for moderators
 */

/**
 * @swagger
 * /api/v1/mod/access/{moderatorId}:
 *   put:
 *     summary: Modify moderator access
 *     tags: [Moderators]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moderatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the moderator
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isActive:
 *                 type: boolean
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Moderator access modified successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Moderator not found
 */
router.put(
  "/access/:moderatorId",
  authenticateToken,
  authorizeAdmin,
  modController.modifyModeratorAccess
);

/**
 * @swagger
 * /api/v1/mod:
 *   get:
 *     summary: Get all moderators
 *     tags: [Moderators]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all moderators
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  authenticateToken,
  authorizeAdmin,
  modController.getAllModerators
);

export default router;
