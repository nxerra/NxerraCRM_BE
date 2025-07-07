import * as CompanyService from "../services/company.service.js";


// ------------- For company creation ---------------
// ....................................................
export const createCompany = async (req, res) => {
  try {
    const company = await CompanyService.createCompany(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// ------------- to fetch all the companies ---------------
// ....................................................
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await CompanyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ------------- to fetch all the company according to their id ---------------
// ....................................................
export const getCompanyById = async (req, res) => {
  try {
    const company = await CompanyService.getCompanyById(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ------------- to update the company missing details ---------------
// ....................................................
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


// ------------- to delete the company ---------------
// ....................................................
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
