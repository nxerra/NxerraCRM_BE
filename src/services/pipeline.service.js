import { Pipeline } from "../models/pipeline.model.js";

export const createPipeline = async (data) => await Pipeline.create(data);

export const getAllPipelines = async () => await Pipeline.find();

export const getPipelineById = async (id) => await Pipeline.findById(id);

export const updatePipeline = async (id, data) =>
  await Pipeline.findByIdAndUpdate(id, data, { new: true });

export const deletePipeline = async (id) =>
  await Pipeline.findByIdAndDelete(id);
