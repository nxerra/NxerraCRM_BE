// src/controllers/client.controller.js
import * as ClientService from "../services/client.service.js";

// ------------- For client creation ---------------
// ....................................................
export const createClient = async (req, res) => {
  try {
    const client = await ClientService.createClient(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ------------- to get all clients ---------------
// ....................................................
export const getAllClients = async (req, res) => {
  try {
    const clients = await ClientService.getAllClients();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------- to get all paginated + Filter clients ---------------
// ....................................................
export const getAllLimitedClients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filters = {
      gender: req.query.gender,
      priority: req.query.priority,
      name: req.query.name,
    };

    const result = await ClientService.getPaginatedClients(
      page,
      limit,
      filters
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------- to get all clients through id ---------------
// ....................................................
export const getClientById = async (req, res) => {
  try {
    const client = await ClientService.getClientById(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ------------- update clients through id ---------------
// ....................................................
export const updateClient = async (req, res) => {
  try {
    const updated = await ClientService.updateClient(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Client not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ------------- delete clients through id ---------------
// ....................................................
export const deleteClient = async (req, res) => {
  try {
    const deleted = await ClientService.deleteClient(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------- delete bulk clients ---------------
// ....................................................
export const deleteMultipleClients = async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await ClientService.deleteMultipleClients(ids);
    res.json({
      message: `${result.deletedCount} client(s) deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to delete clients" });
  }
};
