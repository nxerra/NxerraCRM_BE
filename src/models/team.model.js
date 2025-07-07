import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  designation: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  projectAssigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ]
}, {
  timestamps: true
});

export const Team = model("Team", TeamSchema);
