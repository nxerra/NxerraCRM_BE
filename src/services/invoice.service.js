import { Invoice } from "../models/invoice.model.js";

export const createInvoice = async (data) => {
  const invoice = new Invoice(data);
  return await invoice.save();
};

export const getAllInvoices = async () => {
  return await Invoice.find().populate("client");
};

export const getInvoiceById = async (id) => {
  return await Invoice.findById(id).populate("client");
};

export const updateInvoice = async (id, data) => {
  return await Invoice.findByIdAndUpdate(id, data, { new: true });
};

export const deleteInvoice = async (id) => {
  return await Invoice.findByIdAndDelete(id);
};
