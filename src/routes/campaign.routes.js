import express from "express";
import * as CampaignController from "../controllers/campaign.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Campaigns
 *   description: Campaign management endpoints
 */

/**
 * @swagger
 * /api/v1/campaigns/create-campaign:
 *   post:
 *     summary: Create a new campaign
 *     tags: [Campaigns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CampaignName:
 *                 type: string
 *               CampaignType:
 *                 type: string
 *               totalDealValue:
 *                 type: string
 *               currency:
 *                 type: string
 *               period:
 *                 type: string
 *               targetAudience:
 *                 type: string
 *               description:
 *                 type: string
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - CampaignName
 *               - CampaignType
 *               - targetAudience
 *               - description
 *               - attachments
 *     responses:
 *       201:
 *         description: Campaign created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/create-campaign", CampaignController.createCampaign);

/**
 * @swagger
 * /api/v1/campaigns/get-all-campaigns:
 *   get:
 *     summary: Get all campaigns
 *     tags: [Campaigns]
 *     responses:
 *       200:
 *         description: List of all campaigns
 */
router.get("/get-all-campaigns", CampaignController.getAllCampaign);

/**
 * @swagger
 * /api/v1/campaigns/get-campaign/{id}:
 *   get:
 *     summary: Get a campaign by ID
 *     tags: [Campaigns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campaign found
 *       404:
 *         description: Campaign not found
 */
router.get("/get-campaign/:id", CampaignController.getCampaignById);

/**
 * @swagger
 * /api/v1/campaigns/get-filtered-campaigns:
 *   get:
 *     summary: Get campaigns based on filters with pagination
 *     tags: [Campaigns]
 *     parameters:
 *       - in: query
 *         name: periodValue
 *         schema:
 *           type: string
 *           enum: [Active, Completed, Upcomings]
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Success, Pending, Bounced]
 *       - in: query
 *         name: CampaignType
 *         schema:
 *           type: string
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *       - in: query
 *         name: targetAudience
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Filtered and paginated campaigns list
 */
router.get('/get-filtered-campaigns', CampaignController.getFilteredCampaigns);


/**
 * @swagger
 * /api/v1/campaigns/update-campaign/{id}:
 *   put:
 *     summary: Update a campaign by ID
 *     tags: [Campaigns]
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
 *               - $ref: '#/paths/~1api~1v1~1campaigns~1create-campaign/post/requestBody/content/application~1json/schema'
 *     responses:
 *       200:
 *         description: Campaign updated successfully
 *       404:
 *         description: Campaign not found
 */
router.put("/update-campaign/:id", CampaignController.updateCampaign);

/**
 * @swagger
 * /api/v1/campaigns/delete-campaign/{id}:
 *   delete:
 *     summary: Delete a campaign by ID
 *     tags: [Campaigns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campaign deleted successfully
 *       404:
 *         description: Campaign not found
 */
router.delete("/delete-campaign/:id", CampaignController.deleteCampaign);

/**
 * @swagger
 * /api/v1/campaigns/bulk:
 *   post:
 *     summary: Delete multiple campaigns by IDs
 *     tags: [Campaigns]
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
 *         description: Campaigns deleted successfully
 */
router.post("/bulk", CampaignController.deleteMultipleCampaigns);

export default router;
