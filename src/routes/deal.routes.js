import express from "express";
import * as DealController from "../controllers/deal.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Deals
 *   description: Deal management endpoints
 */

/**
 * @swagger
 * /api/v1/deals/create-deal:
 *   post:
 *     summary: Create a new deal
 *     tags: [Deals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DealName:
 *                 type: string
 *               DealValue:
 *                 type: string
 *               pipeline:
 *                 type: array
 *                 items:
 *                   type: string
 *               expectedCloseDate:
 *                 type: string
 *                 format: date
 *               dueDate:
 *                 type: string
 *                 format: date
 *               followUpDate:
 *                 type: string
 *                 format: date
 *               stages:
 *                 type: string
 *               contactPerson:
 *                 type: array
 *                 items:
 *                   type: string
 *               contactCompany:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               period:
 *                 type: string
 *     responses:
 *       201:
 *         description: Deal created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/create-deal", DealController.createDeal);

/**
 * @swagger
 * /api/v1/deals/get-deal:
 *   get:
 *     summary: Get all deals
 *     tags: [Deals]
 *     responses:
 *       200:
 *         description: List of all deals
 */
router.get("/get-deal", DealController.getAllDeals);

/**
 * @swagger
 * /api/v1/deals/get-deal-by-id/{id}:
 *   get:
 *     summary: Get deal by ID
 *     tags: [Deals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deal found
 *       404:
 *         description: Deal not found
 */
router.get("/get-deal-by-id/:id", DealController.getDealById);

/**
 * @swagger
 * /api/v1/deals/update-deal/{id}:
 *   put:
 *     summary: Update a deal by ID
 *     tags: [Deals]
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
 *               DealName:
 *                 type: string
 *               DealValue:
 *                 type: string
 *               pipeline:
 *                 type: array
 *                 items:
 *                   type: string
 *               expectedCloseDate:
 *                 type: string
 *                 format: date
 *               dueDate:
 *                 type: string
 *                 format: date
 *               followUpDate:
 *                 type: string
 *                 format: date
 *               stages:
 *                 type: string
 *               contactPerson:
 *                 type: array
 *                 items:
 *                   type: string
 *               contactCompany:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               period:
 *                 type: string
 *     responses:
 *       200:
 *         description: Deal updated successfully
 *       404:
 *         description: Deal not found
 */
router.put("/update-deal/:id", DealController.updateDeal);

/**
 * @swagger
 * /api/v1/deals/delete-deal/{id}:
 *   delete:
 *     summary: Delete a deal by ID
 *     tags: [Deals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deal deleted successfully
 *       404:
 *         description: Deal not found
 */
router.delete("/delete-deal/:id", DealController.deleteDeal);

export default router;
