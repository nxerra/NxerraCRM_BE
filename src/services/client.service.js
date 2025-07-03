import { Client } from "../models/client.model.js";

export const createClient = async (data) => {
  const client = new Client(data);
  return await client.save();
};

export const getAllClients = async () => {
  return await Client.find().populate("invoices");
};

// ------------- pagination and filter to get clients ---------------
// ....................................................
export const getPaginatedClients = async (
  page = 1,
  limit = 10,
  filters = {}
) => {
  const skip = (page - 1) * limit;

  const query = {};

  if (filters.gender) query.gender = filters.gender;
  if (filters.priority) query.priority = filters.priority;

  if (filters.name) {
    query.name = { $regex: filters.name, $options: "i" }; // case-insensitive partial match
  }

  const [clients, total] = await Promise.all([
    Client.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Client.countDocuments(query),
  ]);

  return {
    data: clients,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    total,
  };
};

export const getClientById = async (id) => {
  return await Client.findById(id).populate("invoices");
};

export const updateClient = async (id, updateData) => {
  return await Client.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteClient = async (id) => {
  return await Client.findByIdAndDelete(id);
};

export const deleteMultipleClients = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("No client IDs provided");
  }
  const result = await Client.deleteMany({ _id: { $in: ids } });
  return result;
};
