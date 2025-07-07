import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  projectId: {
    type: String,
    required: true,
    unique: true
  },
  projectType: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
   company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  category: {
    type: String,
    required: true
  },
  projectTiming: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  responsiblePersons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    }
  ],
  teamLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  startDate: {
    type: Date
  },
  dueDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Planned', 'In Progress', 'On Hold', 'Completed', 'Cancelled'],
    default: 'Planned'
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

export const Project = model("Project", ProjectSchema);
