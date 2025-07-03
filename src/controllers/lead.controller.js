// src/controllers/lead.controller.js
import * as LeadService from "../services/lead.service.js";

// ------------- For lead creation ---------------
// ....................................................
export const createLead = async (req, res) => {
  try {
    const lead = await LeadService.createLead(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ------------- to get all leads ---------------
// ....................................................
export const getAllLeads = async (req, res) => {
  try {
    const leads = await LeadService.getAllLeads();
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------- to get all paginated + Filter leads ---------------
// ....................................................
export const getAllLimitedLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filters = {
      gender: req.query.gender,
      priority: req.query.priority,
      name: req.query.name,
    };

    const result = await LeadService.getPaginatedLeads(page, limit, filters);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------- to get all leads by id ---------------
// ....................................................
export const getLeadById = async (req, res) => {
  try {
    const lead = await LeadService.getLeadById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ------------- update leads through id ---------------
// ....................................................
export const updateLead = async (req, res) => {
  try {
    const updated = await LeadService.updateLead(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Lead not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ------------- delete leads through id ---------------
// ....................................................
export const deleteLead = async (req, res) => {
  try {
    const deleted = await LeadService.deleteLead(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------- delete bulk leads ---------------
// ....................................................
export const deleteMultipleLeads = async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await LeadService.deleteMultipleLeads(ids);
    res.json({
      message: `${result.deletedCount} lead(s) deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to delete leads" });
  }
};
