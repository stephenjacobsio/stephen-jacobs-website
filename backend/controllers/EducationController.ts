import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Education } from "../entities/Education";

const educationRepository = AppDataSource.getRepository(Education);

export const getAllEducation = async (req: Request, res: Response) => {
  try {
    const education = await educationRepository.find();
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch education records" });
  }
};

export const createEducation = async (req: Request, res: Response) => {
  try {
    const education = educationRepository.create(req.body);
    const savedEducation = await educationRepository.save(education);
    res.status(201).json(savedEducation);
  } catch (error) {
    res.status(400).json({ error: "Failed to create education record" });
  }
};