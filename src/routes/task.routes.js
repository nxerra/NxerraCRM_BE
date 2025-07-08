import express from "express";
import * as TaskController from "../controllers/task.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management for client and company with assgined user endpoints
 */

/**
 * @swagger
 * /api/v1/tasks/create-task:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               taskId:
 *                 type: string
 *               client:
 *                 type: string
 *               company:
 *                 type: string
 *               category:
 *                 type: string
 *               responsiblePersons:
 *                 type: array
 *                 items:
 *                   type: string
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
 *                 enum: [Not Started, Planned, In Progress, On Hold, Completed, Cancelled]
 *               description:
 *                 type: string
 *             required:
 *               - title
 *               - taskId
 *               - category
 *               - dueDate
 *               - description
 *               - responsiblePersons
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/create-task", TaskController.createTask);

/**
 * @swagger
 * /api/v1/tasks/get-all-tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of all tasks
 */
router.get("/get-all-tasks", TaskController.getAllTasks);

/**
 * @swagger
 * /api/v1/tasks/get-task/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 */
router.get("/get-task/:id", TaskController.getTaskById);

/**
 * @swagger
 * /api/v1/tasks/update-task/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
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
 *               - $ref: '#/paths/~1api~1v1~1tasks~1create-task/post/requestBody/content/application~1json/schema'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Task not found
 */
router.put("/update-task/:id", TaskController.updateTask);

/**
 * @swagger
 * /api/v1/tasks/delete-task/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/delete-task/:id", TaskController.deleteTask);

/**
 * @swagger
 * /api/v1/tasks/delete-multiple:
 *   post:
 *     summary: Delete multiple tasks by IDs
 *     tags: [Tasks]
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
 *         description: Tasks deleted successfully
 */
router.post("/delete-multiple", TaskController.deleteMultipleTasks);

export default router;
