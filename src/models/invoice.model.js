import mongoose from "mongoose";

const { Schema, model } = mongoose;

const InvoiceSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
    },
    dateIssued: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    items: [
      {
        description: String,
        quantity: Number,
        rate: Number,
        amount: Number,
      },
    ],

    tax: {
      type: Number, // e.g., 18 for 18%
      default: 0,
    },

    discount: {
      type: Number, // e.g., 10 for 10%
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "unpaid", "overdue"],
      default: "unpaid",
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Invoice = model("Invoice", InvoiceSchema);
