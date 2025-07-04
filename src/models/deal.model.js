import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DealSchema = new Schema(
  {
    DealName: {
      type: String,
      required: true,
    },

    DealValue: {
      type: String,
    },

    pipeline: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pipeline",
      },
    ],

    expectedCloseDate: {
      type: Date,
    },

    dueDate: {
      type: Date,
    },

    followUpDate: {
      type: Date,
    },

    stages: {
      type: String,
    },

    contactPerson: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client",
      },
    ],

    contactCompany: [
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
      },
    ],

    status: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },

    period: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Deal = model("Deal", DealSchema);
