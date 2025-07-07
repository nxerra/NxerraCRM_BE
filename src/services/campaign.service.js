import { Campaign } from '../models/campaign.model.js';

export const createCampaign = async (data) => {
  const newCampaign = new Campaign(data);
  return await newCampaign.save();
};

export const getAllCampaigns = async () => {
  return await Campaign.find();
};

export const getCampaignById = async (id) => {
  return await Campaign.findById(id);
};


// ------------- pagination and filter to get campaign ---------------
// ....................................................
export const getFilteredCampaigns = async (filters, page, limit) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [campaigns, total] = await Promise.all([
    Campaign.find(filters).skip(skip).limit(parseInt(limit)),
    Campaign.countDocuments(filters),
  ]);

  return {
    data: campaigns,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit),
  };
};

export const updateCampaign = async (id, updateData) => {
  return await Campaign.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteCampaign = async (id) => {
  return await Campaign.findByIdAndDelete(id);
};


export const deleteMultipleCampaigns = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("No campaign IDs provided");
  }
  const result = await Client.deleteMany({ _id: { $in: ids } });
  return result;
};