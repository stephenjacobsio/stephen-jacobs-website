import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Project } from "../entities/Project";

const projectRepository = AppDataSource.getRepository(Project);

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectRepository.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = projectRepository.create(req.body);
    const savedProject = await projectRepository.save(project);
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ error: "Failed to create project" });
  }
};