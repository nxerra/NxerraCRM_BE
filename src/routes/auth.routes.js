import express from "express";
import * as AuthController from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user registration endpoints
 */

/**
 * @swagger
 * /api/v1/auth/register/admin:
 *   post:
 *     summary: Register a new admin user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               designation:
 *                 type: string
 *               department:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin]
 *               canAccess:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                     - dashboard
 *                     - clients
 *                     - leads
 *                     - invoice
 *                     - appointment
 *                     - tasks
 *                     - report
 *                     - settings
 *                     - all
 *             required:
 *               - email
 *               - password
 *               - name
 *               - role
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/register/admin", AuthController.registerAdmin);

/**
 * @swagger
 * /api/v1/auth/register/moderator:
 *   post:
 *     summary: Register a new moderator
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               designation:
 *                 type: string
 *               department:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [moderator]
 *               canAccess:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                     - dashboard
 *                     - clients
 *                     - leads
 *                     - invoice
 *                     - appointment
 *                     - tasks
 *                     - report
 *                     - settings
 *                     - all
 *             required:
 *               - email
 *               - password
 *               - name
 *               - role
 *     responses:
 *       201:
 *         description: Moderator registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/register/moderator", AuthController.registerModerator);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized / invalid credentials
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Request a password reset link
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Reset link sent
 *       400:
 *         description: Error processing request
 */
router.post("/forgot-password", AuthController.forgotPassword);

/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset user password using token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 format: password
 *             required:
 *               - token
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
router.post("/reset-password", AuthController.resetPassword);

export default router;
