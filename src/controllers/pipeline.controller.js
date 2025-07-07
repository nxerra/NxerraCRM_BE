import * as PipelineService from "../services/pipeline.service.js";


// ------------- to create a piepeline ---------------
// ....................................................
export const createPipeline = async (req, res) => {
  try {
    const pipeline = await PipelineService.createPipeline(req.body);
    res.status(201).json(pipeline);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// ------------- to get all pipelines ---------------
// ....................................................
export const getAllPipelines = async (req, res) => {
  try {
    const pipelines = await PipelineService.getAllPipelines();
    res.status(200).json(pipelines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ------------- to get pipeline by id ---------------
// ....................................................
export const getPipelineById = async (req, res) => {
  try {
    const pipeline = await PipelineService.getPipelineById(req.params.id);
    if (!pipeline) return res.status(404).json({ error: "Pipeline not found" });
    res.status(200).json(pipeline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ------------- to update a pipeline ---------------
// ....................................................
export const updatePipeline = async (req, res) => {
  try {
    const updatedPipeline = await PipelineService.updatePipeline(
      req.params.id,
      req.body
    );
    if (!updatedPipeline)
      return res.status(404).json({ error: "Pipeline not found" });
    res.status(200).json(updatedPipeline);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// ------------- to delete a pipeline ---------------
// ....................................................
export const deletePipeline = async (req, res) => {
  try {
    const deletedPipeline = await PipelineService.deletePipeline(req.params.id);
    if (!deletedPipeline)
      return res.status(404).json({ error: "Pipeline not found" });
    res.status(200).json({ message: "Pipeline deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
