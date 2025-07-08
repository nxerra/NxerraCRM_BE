import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  taskId: {
    type: String,
    required: true,
    unique: true
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
  responsiblePersons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    }
  ],
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
    enum: ['Not Started', 'Planned', 'In Progress', 'On Hold', 'Completed', 'Cancelled'],
    default: 'Planned'
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

export const Task = model("Task", TaskSchema);
