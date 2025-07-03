import express from "express";
import * as InvoiceController from "../controllers/invoice.controller.js";

const router = express.Router();

// ------------- /api/v1/invoices/generate-invoice ---------------
// ....................................................
router.post("/generate-invoice", InvoiceController.createInvoice);

// ------------- /api/v1/invoices/get-all-invoice---------------
// ....................................................
router.get("/get-all-invoice", InvoiceController.getAllInvoices);

// ------------- /api/v1/invoices/get-all-invoice/:id ---------------
// ....................................................
router.get("/get-all-invoice/:id", InvoiceController.getInvoiceById);

// ------------- /api/v1/invoices/update-invoice/:id ---------------
// ....................................................
router.put("/update-invoice/:id", InvoiceController.updateInvoice);

// ------------- /api/v1/invoices/delete-invoice/:id ---------------
// ....................................................
router.delete("/delete-invoice/:id", InvoiceController.deleteInvoice);

export default router;
