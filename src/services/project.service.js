import { Project } from "../models/project.model.js";
import { Team } from "../models/team.model.js";
import { sendProjectAssignmentEmail } from "../utils/email.util.js";

export const createProject = async (data) => {
  const project = new Project(data);
  await project.save();

  if (project.responsiblePersons?.length > 0) {
    // Call your email function with projectName, teamLeaderId, and responsiblePersons array
    await sendProjectAssignmentEmail(
      project.name,
      project.teamLeader.toString(),         // teamLeaderId (string)
      project.responsiblePersons.map(id => id.toString()) // array of responsiblePersons IDs as strings
    );
  }

  return project;
};


export const getAllProjects = async () => {
  return await Project.find()
    .populate("client")
    .populate("company")
    .populate("responsiblePersons")
    .populate("teamLeader");
};

export const getProjectById = async (id) => {
  return await Project.findById(id)
    .populate("client")
    .populate("company")
    .populate("responsiblePersons")
    .populate("teamLeader");
};

export const updateProject = async (id, updateData) => {
  const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true });

  // Notify updated assigned team members
  if (updateData.responsiblePersons?.length > 0) {
    const teamMembers = await Team.find({ _id: { $in: updateData.responsiblePersons } });
    for (const member of teamMembers) {
      await sendProjectAssignmentEmail(member.email, updatedProject.name);
    }
  }

  return updatedProject;
};

export const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};

export const deleteMultipleProjects = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("No project IDs provided");
  }
  return await Project.deleteMany({ _id: { $in: ids } });
};
