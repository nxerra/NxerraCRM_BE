import { Deal } from "../models/deal.model.js";

export const createDeal = async (data) => await Deal.create(data);

export const getAllDeals = async () =>
  await Deal.find().populate("pipeline contactPerson contactCompany");

export const getDealById = async (id) =>
  await Deal.findById(id).populate("pipeline contactPerson contactCompany");

export const updateDeal = async (id, data) =>
  await Deal.findByIdAndUpdate(id, data, { new: true });

export const deleteDeal = async (id) => await Deal.findByIdAndDelete(id);
