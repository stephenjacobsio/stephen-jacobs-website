import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Certification } from "../entities/Certification";

const certificationRepository = AppDataSource.getRepository(Certification);

export const getAllCertifications = async (req: Request, res: Response) => {
  try {
    const certifications = await certificationRepository.find();
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch certifications" });
  }
};


export const createCertification = async (req: Request, res: Response) => {
  try {
    const certification = certificationRepository.create(req.body);
    const savedCertification = await certificationRepository.save(certification);
    res.status(201).json(savedCertification);
  } catch (error) {
    res.status(400).json({ error: "Failed to create certification record" });
  }
};

