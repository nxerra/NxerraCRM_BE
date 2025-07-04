import * as CompanyService from "../services/company.service.js";

export const createCompany = async (req, res) => {
  try {
    const company = await CompanyService.createCompany(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await CompanyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await CompanyService.getCompanyById(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const updatedCompany = await CompanyService.updateCompany(
      req.params.id,
      req.body
    );
    if (!updatedCompany)
      return res.status(404).json({ error: "Company not found" });
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await CompanyService.deleteCompany(req.params.id);
    if (!deletedCompany)
      return res.status(404).json({ error: "Company not found" });
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
