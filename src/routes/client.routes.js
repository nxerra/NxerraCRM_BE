import express from "express";
import * as ClientController from "../controllers/client.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management endpoints
 */

/**
 * @swagger
 * /api/v1/clients/create-client:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
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
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               gender:
 *                 type: string
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
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *             required:
 *               - name
 *               - source
 *               - phone
 *               - companyName
 *               - gender
 *               - status
 *               - designation
 *     responses:
 *       201:
 *         description: Client created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/create-client", ClientController.createClient);

/**
 * @swagger
 * /api/v1/clients/get-all-clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of all clients
 */
router.get("/get-all-clients", ClientController.getAllClients);

/**
 * @swagger
 * /api/v1/clients/get-all-paginated&filtered-clients:
 *   get:
 *     summary: Get clients with filtering and pagination
 *     tags: [Clients]
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
 *         description: Paginated and filtered client list
 */
router.get(
  "/get-all-paginated&filtered-clients",
  ClientController.getAllLimitedClients
);

/**
 * @swagger
 * /api/v1/clients/get-all-clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client found
 *       404:
 *         description: Client not found
 */
router.get("/get-all-clients/:id", ClientController.getClientById);

/**
 * @swagger
 * /api/v1/clients/update-clients/{id}:
 *   put:
 *     summary: Update a client by ID
 *     tags: [Clients]
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
 *               - $ref: '#/paths/~1api~1v1~1clients~1create-client/post/requestBody/content/application~1json/schema'
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       404:
 *         description: Client not found
 */
router.put("/update-clients/:id", ClientController.updateClient);

/**
 * @swagger
 * /api/v1/clients/delete-clients/{id}:
 *   delete:
 *     summary: Delete a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *       404:
 *         description: Client not found
 */
router.delete("/delete-clients/:id", ClientController.deleteClient);

/**
 * @swagger
 * /api/v1/clients/bulk:
 *   post:
 *     summary: Delete multiple clients by IDs
 *     tags: [Clients]
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
 *         description: Clients deleted successfully
 */
router.post("/bulk", ClientController.deleteMultipleClients);

export default router;
