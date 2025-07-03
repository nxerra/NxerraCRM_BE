// src/routes/lead.routes.js
import express from "express";
import * as LeadController from "../controllers/lead.controller.js";

const router = express.Router();

// ------------- /api/v1/leads/create-lead ---------------
// ....................................................
router.post("/create-lead", LeadController.createLead);

// ------------- /api/v1/leads/get-all-lead---------------
// ....................................................
router.get("/get-all-lead", LeadController.getAllLeads);

// ------------- /api/v1/leads/get-all-paginated&filtered-clients ---------------
// .................................................... /api/v1/leads/get-all-paginated&filtered-leads?name=tech&gender=female&priority=Low&page=2&limit=5
router.get(
  "/get-all-paginated&filtered-leads",
  LeadController.getAllLimitedLeads
);

// ------------- /api/v1/leads/get-all-lead/:id ---------------
// ....................................................
router.get("/get-all-lead/:id", LeadController.getLeadById);

// ------------- /api/v1/leads/update-lead/:id ---------------
// ....................................................
router.put("/update-lead/:id", LeadController.updateLead);

// ------------- /api/v1/leads/delete-lead/:id ---------------
// ....................................................
router.delete("/delete-lead/:id", LeadController.deleteLead);

// ------------- /api/v1/leads/bulk ---------------
// ....................................................
router.delete("/bulk", LeadController.deleteMultipleLeads);

export default router;
