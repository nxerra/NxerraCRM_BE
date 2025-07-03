// src/routes/client.routes.js
import express from "express";
import * as ClientController from "../controllers/client.controller.js";

const router = express.Router();

// ------------- /api/v1/clients/create-client ---------------
// ....................................................
router.post("/create-client", ClientController.createClient);

// ------------- /api/v1/clients/get-all-clients ---------------
// ....................................................
router.get("/get-all-clients", ClientController.getAllClients);

// ------------- /api/v1/clients/get-all-paginated&filtered-clients ---------------
// .................................................... /api/v1/clients/get-all-paginated&filtered-clients?name=john&gender=male&priority=High&page=1&limit=10
router.get(
  "/get-all-paginated&filtered-clients",
  ClientController.getAllLimitedClients
);

// ------------- /api/v1/clients/get-all-clients/:id ---------------
// ....................................................
router.get("/get-all-clients/:id", ClientController.getClientById);

// ------------- /api/v1/clients/update-clients/:id ---------------
// ....................................................
router.put("/update-clients/:id", ClientController.updateClient);

// ------------- /api/v1/clients/delete-clients/:id ---------------
// ....................................................
router.delete("/delete-clients/:id", ClientController.deleteClient);

// ------------- /api/v1/clients/bulk ---------------
// ....................................................
router.delete("/bulk", ClientController.deleteMultipleClients);

export default router;
