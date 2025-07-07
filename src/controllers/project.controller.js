// src/controllers/project.controller.js
import * as ProjectService from "../services/project.service.js";

// Create a project .................
// -------------------------------------
export const createProject = async (req, res) => {
  try {
    const project = await ProjectService.createProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all projects  .................
// -------------------------------------
export const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectService.getAllProjects();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get project by ID .................
// -------------------------------------
export const getProjectById = async (req, res) => {
  try {
    const project = await ProjectService.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
 
// Update project .................
// -------------------------------------
export const updateProject = async (req, res) => {
  try {
    const updated = await ProjectService.updateProject(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete project .................
// -------------------------------------
export const deleteProject = async (req, res) => {
  try {
    const deleted = await ProjectService.deleteProject(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete multiple projects .................
// -------------------------------------
export const deleteMultipleProjects = async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await ProjectService.deleteMultipleProjects(ids);
    res.json({
      message: `${result.deletedCount} project(s) deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to delete projects" });
  }
};
