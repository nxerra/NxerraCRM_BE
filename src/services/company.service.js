import { Company } from "../models/company.model.js";

export const createCompany = async (data) => await Company.create(data);

export const getAllCompanies = async () =>
  await Company.find().populate("deals invoices");

export const getCompanyById = async (id) =>
  await Company.findById(id).populate("deals invoices");

export const updateCompany = async (id, data) =>
  await Company.findByIdAndUpdate(id, data, { new: true });

export const deleteCompany = async (id) => await Company.findByIdAndDelete(id);
