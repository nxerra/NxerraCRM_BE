import express from "express";
import * as InvoiceController from "../controllers/invoice.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Invoice management endpoints
 */

/**
 * @swagger
 * /api/v1/invoices/generate-invoice:
 *   post:
 *     summary: Generate a new invoice
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client:
 *                 type: string
 *                 description: MongoDB ObjectId of the client
 *               invoiceNumber:
 *                 type: string
 *               dateIssued:
 *                 type: string
 *                 format: date
 *               dueDate:
 *                 type: string
 *                 format: date
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     rate:
 *                       type: number
 *                     amount:
 *                       type: number
 *               tax:
 *                 type: number
 *                 example: 18
 *               discount:
 *                 type: number
 *                 example: 10
 *               totalAmount:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [paid, unpaid, overdue]
 *               notes:
 *                 type: string
 *             required:
 *               - client
 *               - invoiceNumber
 *               - dateIssued
 *               - dueDate
 *               - items
 *               - totalAmount
 *     responses:
 *       201:
 *         description: Invoice generated successfully
 *       400:
 *         description: Invalid request
 */
router.post("/generate-invoice", InvoiceController.createInvoice);

/**
 * @swagger
 * /api/v1/invoices/get-all-invoice:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: List of all invoices
 */
router.get("/get-all-invoice", InvoiceController.getAllInvoices);

/**
 * @swagger
 * /api/v1/invoices/get-all-invoice/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice found
 *       404:
 *         description: Invoice not found
 */
router.get("/get-all-invoice/:id", InvoiceController.getInvoiceById);

/**
 * @swagger
 * /api/v1/invoices/update-invoice/{id}:
 *   put:
 *     summary: Update an invoice by ID
 *     tags: [Invoices]
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
 *               client:
 *                 type: string
 *               invoiceNumber:
 *                 type: string
 *               dateIssued:
 *                 type: string
 *                 format: date
 *               dueDate:
 *                 type: string
 *                 format: date
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     rate:
 *                       type: number
 *                     amount:
 *                       type: number
 *               tax:
 *                 type: number
 *               discount:
 *                 type: number
 *               totalAmount:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [paid, unpaid, overdue]
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *       404:
 *         description: Invoice not found
 */
router.put("/update-invoice/:id", InvoiceController.updateInvoice);

/**
 * @swagger
 * /api/v1/invoices/delete-invoice/{id}:
 *   delete:
 *     summary: Delete an invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice deleted successfully
 *       404:
 *         description: Invoice not found
 */
router.delete("/delete-invoice/:id", InvoiceController.deleteInvoice);

export default router;
