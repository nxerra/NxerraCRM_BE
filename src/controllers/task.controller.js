import * as TaskService from '../services/task.service.js';


// ............. Create a task .................
// -------------------------------------
export const createTask = async (req, res) => {
  try {
    const task = await TaskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ............. get all task .................
// -------------------------------------
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ............. get task by id .................
// -------------------------------------
export const getTaskById = async (req, res) => {
  try {
    const task = await TaskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ............. update task by id .................
// -------------------------------------
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await TaskService.updateTask(req.params.id, req.body);
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ............. delete task by id .................
// -------------------------------------
export const deleteTask = async (req, res) => {
  try {
    await TaskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ............. delete multiple task .................
// -------------------------------------
export const deleteMultipleTasks = async (req, res) => {
  try {
    const { ids } = req.body;
    await TaskService.deleteMultipleTasks(ids);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
