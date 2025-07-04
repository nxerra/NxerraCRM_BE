import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PipelineSchema = new Schema(
  {
    PipelineName: {
      type: String,
      required: true,
    },

    totalDealValue: {
      type: String,
    },

    noOfDeals: {
      type: String,
    },

    stages: {
      type: String,
    },

    status: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Pipeline = model("Pipeline", PipelineSchema);
