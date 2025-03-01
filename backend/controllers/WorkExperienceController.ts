import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { WorkExperience } from "../entities/WorkExperience";

const workExperienceRepository = AppDataSource.getRepository(WorkExperience);

export const getAllWorkExperience = async (req: Request, res: Response) => {
  try {
    const workExperience = await workExperienceRepository.find();
    res.json(workExperience);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch work experience records" });
  }
};

export const createWorkExperience = async (req: Request, res: Response) => {
  try {
    const workExperience = workExperienceRepository.create(req.body);
    const savedWorkExperience = await workExperienceRepository.save(workExperience);
    res.status(201).json(savedWorkExperience);
  } catch (error) {
    res.status(400).json({ error: "Failed to create work experience record" });
  }
};