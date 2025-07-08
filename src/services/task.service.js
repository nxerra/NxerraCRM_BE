import { Task } from '../models/task.model.js';
import { Team } from '../models/team.model.js';
import { sendProjectAssignmentEmail } from '../utils/email.util.js'; // Reused the same email utility

export const createTask = async (data) => {
  const task = new Task(data);
  await task.save();

  if (task.responsiblePersons?.length > 0) {
    await sendProjectAssignmentEmail(
      task.title,
      null, // No team leader in tasks
      task.responsiblePersons.map(id => id.toString())
    );
  }

  return task;
};

export const getAllTasks = async () => {
  return await Task.find()
    .populate('client')
    .populate('company')
    .populate('responsiblePersons');
};

export const getTaskById = async (id) => {
  return await Task.findById(id)
    .populate('client')
    .populate('company')
    .populate('responsiblePersons');
};

export const updateTask = async (id, updateData) => {
  const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });

  // Notify updated assigned team members
  if (updateData.responsiblePersons?.length > 0) {
    const teamMembers = await Team.find({ _id: { $in: updateData.responsiblePersons } });
    for (const member of teamMembers) {
      await sendProjectAssignmentEmail(member.email, updatedTask.title);
    }
  }

  return updatedTask;
};

export const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

export const deleteMultipleTasks = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("No task IDs provided");
  }
  return await Task.deleteMany({ _id: { $in: ids } });
};
