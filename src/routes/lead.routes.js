import express from "express";
import * as LeadController from "../controllers/lead.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Leads
 *   description: Lead management endpoints
 */

/**
 * @swagger
 * /api/v1/leads/create-lead:
 *   post:
 *     summary: Create a new lead
 *     tags: [Leads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *               name:
 *                 type: string
 *               source:
 *                 type: string
 *               phone:
 *                 type: string
 *               companyName:
 *                 type: string
 *               gender:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               status:
 *                 type: string
 *               designation:
 *                 type: string
 *               proposals:
 *                 type: object
 *                 properties:
 *                   description:
 *                     type: string
 *                   amount:
 *                     type: string
 *                   paymentStatus:
 *                     type: string
 *                     enum: [paid, unpaid, overdue]
 *               address:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   pincode:
 *                     type: string
 *                   fullAddress:
 *                     type: string
 *               socialMedia:
 *                 type: object
 *                 properties:
 *                   facebook:
 *                     type: string
 *                   linkedin:
 *                     type: string
 *                   whatsapp:
 *                     type: string
 *                   instagram:
 *                     type: string
 *               contactUs:
 *                 type: object
 *                 properties:
 *                   skype:
 *                     type: string
 *                   call:
 *                     type: string
 *               appointments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     meetings:
 *                       type: string
 *                     followUps:
 *                       type: string
 *                     notes:
 *                       type: string
 *                     activity:
 *                       type: string
 *                     tasks:
 *                       type: string
 *     responses:
 *       201:
 *         description: Lead created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/create-lead", LeadController.createLead);

/**
 * @swagger
 * /api/v1/leads/get-all-lead:
 *   get:
 *     summary: Get all leads
 *     tags: [Leads]
 *     responses:
 *       200:
 *         description: List of all leads
 */
router.get("/get-all-lead", LeadController.getAllLeads);

/**
 * @swagger
 * /api/v1/leads/get-all-paginated&filtered-leads:
 *   get:
 *     summary: Get leads with filtering and pagination
 *     tags: [Leads]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated and filtered lead list
 */
router.get(
  "/get-all-paginated&filtered-leads",
  LeadController.getAllLimitedLeads
);

/**
 * @swagger
 * /api/v1/leads/get-all-lead/{id}:
 *   get:
 *     summary: Get a lead by ID
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead found
 *       404:
 *         description: Lead not found
 */
router.get("/get-all-lead/:id", LeadController.getLeadById);

/**
 * @swagger
 * /api/v1/leads/update-lead/{id}:
 *   put:
 *     summary: Update a lead by ID
 *     tags: [Leads]
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
 *               - $ref: '#/paths/~1api~1v1~1leads~1create-lead/post/requestBody/content/application~1json/schema'
 *
 *     responses:
 *       200:
 *         description: Lead updated successfully
 *       404:
 *         description: Lead not found
 */
router.put("/update-lead/:id", LeadController.updateLead);

/**
 * @swagger
 * /api/v1/leads/delete-lead/{id}:
 *   delete:
 *     summary: Delete a lead by ID
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead deleted successfully
 *       404:
 *         description: Lead not found
 */
router.delete("/delete-lead/:id", LeadController.deleteLead);

/**
 * @swagger
 * /api/v1/leads/bulk:
 *   delete:
 *     summary: Delete multiple leads by IDs
 *     tags: [Leads]
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
 *         description: Leads deleted successfully
 */
router.delete("/bulk", LeadController.deleteMultipleLeads);

export default router;
