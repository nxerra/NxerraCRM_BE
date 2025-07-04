import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CompanySchema = new Schema(
  {
    profilePicture: {
      type: String,
    },

    ownerName: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    taskPriority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },

    status: {
      type: String,
      required: true,
    },

    ownerDesignation: {
      type: String,
      required: true,
    },

    language: {
      type: String,
    },

    currency: {
      type: String,
    },

    deals: [
      {
        type: Schema.Types.ObjectId,
        ref: "Deal",
      },
    ],

    invoices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Invoice",
      },
    ],

    // ------------- proposals details -----------
    // ..............................................
    proposals: {
      description: {
        type: String,
      },
      amount: {
        type: String,
      },
      paymentStatus: {
        type: String,
        enum: ["paid", "unpaid", "overdue"],
        default: "unpaid",
      },
    },

    // ------------- full address details -----------
    // ..............................................
    address: {
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pincode: {
        type: String,
      },
      country: {
        type: String,
      },
      fullAddress: {
        type: String,
      },
    },

    // ------------- social media details -----------
    // ..............................................
    socialMedia: {
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      whatsapp: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },

    // ------------- reach out details -----------
    // ..............................................
    contactUs: {
      skype: {
        type: String,
      },
      call: {
        type: String,
      },
    },

    // ------------- all activtiy log details -----------
    // ..............................................
    appointments: [
      {
        meetings: {
          type: String,
        },
        followUps: {
          type: String,
        },
        notes: {
          type: String,
        },
        activity: {
          type: String,
        },
        tasks: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Company = model("Company", CompanySchema);
