import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Technology } from "../entities/Technology";

const technologyRepository = AppDataSource.getRepository(Technology);

export const getAllTechnologies = async (req: Request, res: Response) => {
  try {
    const technologies = await technologyRepository.find();
    res.json(technologies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch technologies" });
  }
};

export const createTechnology = async (req: Request, res: Response) => {
  try {
    const technology = technologyRepository.create(req.body);
    const savedTechnology = await technologyRepository.save(technology);
    res.status(201).json(savedTechnology);
  } catch (error) {
    res.status(400).json({ error: "Failed to create technology record" });
  }
};