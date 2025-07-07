import * as campaignService from '../services/campaign.service.js';

// ------------- create campaign ---------------
// ....................................................
export const createCampaign = async (req, res) => {
  try {
    const data = req.body;
    const campaign = await campaignService.createCampaign(data);
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ------------- get all campaign ---------------
// ....................................................
export const getAllCampaign = async (req, res) => {
  try {
    const campaigns = await campaignService.getAllCampaigns();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------- get campaign by id ---------------
// ....................................................

export const getCampaignById = async (req, res) => {
  try {
    const campaign = await campaignService.getCampaignById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Not found" });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------- to get all paginated + Filter campaigns ---------------
// ....................................................
export const getFilteredCampaigns = async (req, res) => {
  try {
    const {
      periodValue,
      status,
      CampaignType,
      period,
      targetAudience,
      page = 1,
      limit = 10,
    } = req.query;

    const filters = {};
    if (periodValue) filters.periodValue = periodValue;
    if (status) filters.status = status;
    if (CampaignType) filters.CampaignType = CampaignType;
    if (period) filters.period = period;
    if (targetAudience) filters.targetAudience = targetAudience;

    const result = await campaignService.getFilteredCampaigns(filters, page, limit);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ------------- update campaign ---------------
// ....................................................

export const updateCampaign = async (req, res) => {
  try {
    const updated = await campaignService.updateCampaign(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------- delete campaign ---------------
// ....................................................
export const deleteCampaign = async (req, res) => {
  try {
    const deleted = await campaignService.deleteCampaign(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------- delete bulk campaign ---------------
// ....................................................
export const deleteMultipleCampaigns = async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await campaignService.deleteMultipleCampaigns(ids);
    res.json({
      message: `${result.deletedCount} campaign(s) deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to delete campaigns" });
  }
};
