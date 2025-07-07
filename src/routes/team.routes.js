import express from "express";
import * as TeamController from "../controllers/team.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Team member management endpoints
 */

/**
 * @swagger
 * /api/v1/teams/create-team:
 *   post:
 *     summary: Register a new team member
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               projectAssigned:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - name
 *               - email
 *               - phone
 *     responses:
 *       201:
 *         description: Team member registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/create-team", TeamController.createTeamMember);

/**
 * @swagger
 * /api/v1/teams/get-all-teams:
 *   get:
 *     summary: Get all team members
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: List of team members
 */
router.get("/get-all-teams", TeamController.getAllTeamMembers);

/**
 * @swagger
 * /api/v1/teams/get-team/{id}:
 *   get:
 *     summary: Get a team member by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team member found
 *       404:
 *         description: Team member not found
 */
router.get("/get-team/:id", TeamController.getTeamMemberById);

/**
 * @swagger
 * /api/v1/teams/update-team/{id}:
 *   put:
 *     summary: Update a team member by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               projectAssigned:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Team member updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Team member not found
 */
router.put("/update-team/:id", TeamController.updateTeamMember);

/**
 * @swagger
 * /api/v1/teams/delete-team/{id}:
 *   delete:
 *     summary: Delete a team member by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team member deleted successfully
 *       404:
 *         description: Team member not found
 */
router.delete("/delete-team/:id", TeamController.deleteTeamMember);

/**
 * @swagger
 * /api/v1/teams/delete-multiple:
 *   post:
 *     summary: Delete multiple team members
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Team members deleted successfully
 *       400:
 *         description: Invalid request
 */
router.post("/delete-multiple", TeamController.deleteMultipleTeamMembers);

export default router;
