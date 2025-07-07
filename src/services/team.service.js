import { Team } from "../models/team.model.js";

export const createTeamMember = async (data) => {
  const member = new Team(data);
  return await member.save();
};

export const getAllTeamMembers = async () => {
  return await Team.find().populate("projectAssigned");
};

export const getTeamMemberById = async (id) => {
  return await Team.findById(id).populate("projectAssigned");
};

export const updateTeamMember = async (id, updateData) => {
  return await Team.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteTeamMember = async (id) => {
  return await Team.findByIdAndDelete(id);
};

export const deleteMultipleTeamMembers = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("No team member IDs provided");
  }
  return await Team.deleteMany({ _id: { $in: ids } });
};
