import * as DealService from "../services/deal.service.js";

export const createDeal = async (req, res) => {
  try {
    const deal = await DealService.createDeal(req.body);
    res.status(201).json(deal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllDeals = async (req, res) => {
  try {
    const deals = await DealService.getAllDeals();
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDealById = async (req, res) => {
  try {
    const deal = await DealService.getDealById(req.params.id);
    res.json(deal);
  } catch (error) {
    res.status(404).json({ error: "Deal not found" });
  }
};

export const updateDeal = async (req, res) => {
  try {
    const updated = await DealService.updateDeal(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDeal = async (req, res) => {
  try {
    await DealService.deleteDeal(req.params.id);
    res.json({ message: "Deal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
