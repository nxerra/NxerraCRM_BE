// src/controllers/team.controller.js
import * as TeamService from "../services/team.service.js";

// Create a new team member
export const createTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamService.createTeamMember(req.body);
    res.status(201).json(teamMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamService.getAllTeamMembers();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get team member by ID
export const getTeamMemberById = async (req, res) => {
  try {
    const member = await TeamService.getTeamMemberById(req.params.id);
    if (!member) return res.status(404).json({ message: "Team member not found" });
    res.json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update team member
export const updateTeamMember = async (req, res) => {
  try {
    const updated = await TeamService.updateTeamMember(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Team member not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete team member
export const deleteTeamMember = async (req, res) => {
  try {
    const deleted = await TeamService.deleteTeamMember(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Team member not found" });
    res.json({ message: "Team member deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete multiple team members
export const deleteMultipleTeamMembers = async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await TeamService.deleteMultipleTeamMembers(ids);
    res.json({
      message: `${result.deletedCount} team member(s) deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to delete team members" });
  }
};
