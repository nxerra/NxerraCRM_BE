import express from "express";
import * as CompanyController from "../controllers/company.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management endpoints
 */

/**
 * @swagger
 * /api/v1/companies/create-company:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *               ownerName:
 *                 type: string
 *               source:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               companyName:
 *                 type: string
 *               taskPriority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               status:
 *                 type: string
 *               ownerDesignation:
 *                 type: string
 *               language:
 *                 type: string
 *               currency:
 *                 type: string
 *               deals:
 *                 type: array
 *                 items:
 *                   type: string
 *               invoices:
 *                 type: array
 *                 items:
 *                   type: string
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
 *                   country:
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
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/create-company", CompanyController.createCompany);

/**
 * @swagger
 * /api/v1/companies/get-company:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of companies
 */
router.get("/get-company", CompanyController.getAllCompanies);

/**
 * @swagger
 * /api/v1/companies/get-company-by-id/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company retrieved successfully
 *       404:
 *         description: Company not found
 */
router.get("/get-company-by-id/:id", CompanyController.getCompanyById);

/**
 * @swagger
 * /api/v1/companies/update-company/{id}:
 *   put:
 *     summary: Update a company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       application/json:
 *           schema:
 *             type: object
 *             allOf:
 *               - $ref: '#/paths/~1api~1v1~1companies~1create-company/post/requestBody/content/application~1json/schema'
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       404:
 *         description: Company not found
 */
router.put("/update-company/:id", CompanyController.updateCompany);

/**
 * @swagger
 * /api/v1/companies/delete/{id}:
 *   delete:
 *     summary: Delete a company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *       404:
 *         description: Company not found
 */
router.delete("/delete/:id", CompanyController.deleteCompany);

export default router;
