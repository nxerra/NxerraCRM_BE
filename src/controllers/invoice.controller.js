import * as InvoiceService from "../services/invoice.service.js";

// ------------- For invoice creation ---------------
// ....................................................
export const createInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceService.createInvoice(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ------------- to get all invoices ---------------
// ....................................................
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceService.getAllInvoices();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------- to get all invoices through id ---------------
// ....................................................
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await InvoiceService.getInvoiceById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Not found" });
    res.json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ------------- to update invoices through id ---------------
// ....................................................
export const updateInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceService.updateInvoice(req.params.id, req.body);
    if (!invoice) return res.status(404).json({ message: "Not found" });
    res.json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ------------- to delete invoices through id ---------------
// ....................................................
export const deleteInvoice = async (req, res) => {
  try {
    const deleted = await InvoiceService.deleteInvoice(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
