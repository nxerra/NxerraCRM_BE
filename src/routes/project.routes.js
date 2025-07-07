import express from "express";
import * as ProjectController from "../controllers/project.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management endpoints
 */

/**
 * @swagger
 * /api/v1/projects/create-project:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               projectId:
 *                 type: string
 *               projectType:
 *                 type: string
 *               client:
 *                 type: string
 *               company:
 *                 type: string
 *               category:
 *                 type: string
 *               projectTiming:
 *                 type: string
 *               price:
 *                 type: number
 *               responsiblePersons:
 *                 type: array
 *                 items:
 *                   type: string
 *               teamLeader:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               dueDate:
 *                 type: string
 *                 format: date
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High, Critical]
 *               status:
 *                 type: string
 *                 enum: [Planned, In Progress, On Hold, Completed, Cancelled]
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - projectId
 *               - projectType
 *               - category
 *               - price
 *               - dueDate
 *               - description
 *               - responsiblePersons
 *               - teamLeader
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/create-project", ProjectController.createProject);

/**
 * @swagger
 * /api/v1/projects/get-all-projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of all projects
 */
router.get("/get-all-projects", ProjectController.getAllProjects);

/**
 * @swagger
 * /api/v1/projects/get-project/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project found
 *       404:
 *         description: Project not found
 */
router.get("/get-project/:id", ProjectController.getProjectById);

/**
 * @swagger
 * /api/v1/projects/update-project/{id}:
 *   put:
 *     summary: Update a project by ID
 *     tags: [Projects]
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
 *             allOf:
 *               - $ref: '#/paths/~1api~1v1~1projects~1create-project/post/requestBody/content/application~1json/schema'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Project not found
 */
router.put("/update-project/:id", ProjectController.updateProject);

/**
 * @swagger
 * /api/v1/projects/delete-project/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 */
router.delete("/delete-project/:id", ProjectController.deleteProject);

/**
 * @swagger
 * /api/v1/projects/delete-multiple:
 *   post:
 *     summary: Delete multiple projects by IDs
 *     tags: [Projects]
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
 *         description: Projects deleted successfully
 */
router.post("/delete-multiple", ProjectController.deleteMultipleProjects);


export default router;
