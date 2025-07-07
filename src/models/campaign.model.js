import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CampaignSchema = new Schema(
  {
    CampaignName: {
      type: String,
      required: true,
    },

    CampaignType: {
      type: String,
      required: true,
    },

    totalDealValue: {
      type: String,
    },

    currency: {
      type: String,
    },

    period: {
      type: String,
    },

    periodValue: {
      type: String,
      enum: ["Active", "Completed", "Upcomings"],
      default: "Completed",
      required: true,
    },

    targetAudience: {
      type: String,
      required: true,
    },

     status: {
      type: String,
      enum: ["Success", "Pending", "Bounced"],
      default: "Pending",
      required: true,
    },


     members: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },  

    attachments: {
      type: [String],
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Campaign = model("Campaign", CampaignSchema);
