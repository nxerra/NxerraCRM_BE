import express from "express";
import * as PipelineController from "../controllers/pipeline.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pipelines
 *   description: Pipeline management endpoints
 */

/**
 * @swagger
 * /api/v1/pipelines/create-pipeline:
 *   post:
 *     summary: Create a new pipeline
 *     tags: [Pipelines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PipelineName:
 *                 type: string
 *               totalDealValue:
 *                 type: string
 *               noOfDeals:
 *                 type: string
 *               stages:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *               - PipelineName
 *               - status
 *     responses:
 *       201:
 *         description: Pipeline created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/create-pipeline", PipelineController.createPipeline);

/**
 * @swagger
 * /api/v1/pipelines/get-pipeline:
 *   get:
 *     summary: Get all pipelines
 *     tags: [Pipelines]
 *     responses:
 *       200:
 *         description: List of pipelines
 */
router.get("/get-pipeline", PipelineController.getAllPipelines);

/**
 * @swagger
 * /api/v1/pipelines/get-pipeline-by-id/{id}:
 *   get:
 *     summary: Get a pipeline by ID
 *     tags: [Pipelines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pipeline found
 *       404:
 *         description: Pipeline not found
 */
router.get("/get-pipeline-by-id/:id", PipelineController.getPipelineById);

/**
 * @swagger
 * /api/v1/pipelines/update-pipeline/{id}:
 *   put:
 *     summary: Update a pipeline by ID
 *     tags: [Pipelines]
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
 *               PipelineName:
 *                 type: string
 *               totalDealValue:
 *                 type: string
 *               noOfDeals:
 *                 type: string
 *               stages:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pipeline updated successfully
 *       404:
 *         description: Pipeline not found
 */
router.put("/update-pipeline/:id", PipelineController.updatePipeline);

/**
 * @swagger
 * /api/v1/pipelines/delete-pipeline/{id}:
 *   delete:
 *     summary: Delete a pipeline by ID
 *     tags: [Pipelines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pipeline deleted successfully
 *       404:
 *         description: Pipeline not found
 */
router.delete("/delete-pipeline/:id", PipelineController.deletePipeline);

export default router;
