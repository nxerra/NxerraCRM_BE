// src/services/lead.service.js
import { Lead } from "../models/lead.model.js";

export const createLead = async (data) => {
  const lead = new Lead(data);
  return await lead.save();
};

export const getAllLeads = async () => {
  return await Lead.find();
};

// ------------- pagination + Filter to get leads ---------------
// ....................................................
export const getPaginatedLeads = async (page = 1, limit = 10, filters = {}) => {
  const skip = (page - 1) * limit;

  const query = {};

  if (filters.gender) query.gender = filters.gender;
  if (filters.priority) query.priority = filters.priority;

  if (filters.name) {
    query.name = { $regex: filters.name, $options: "i" };
  }

  const [leads, total] = await Promise.all([
    Lead.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Lead.countDocuments(query),
  ]);

  return {
    data: leads,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    total,
  };
};

export const getLeadById = async (id) => {
  return await Lead.findById(id);
};

export const updateLead = async (id, data) => {
  return await Lead.findByIdAndUpdate(id, data, { new: true });
};

export const deleteLead = async (id) => {
  return await Lead.findByIdAndDelete(id);
};

export const deleteMultipleLeads = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("No lead IDs provided");
  }
  const result = await Lead.deleteMany({ _id: { $in: ids } });
  return result;
};
