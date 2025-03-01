import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { SocialLink } from "../entities/SocialLink";

const socialLinkRepository = AppDataSource.getRepository(SocialLink);

export const getAllSocialLinks = async (req: Request, res: Response) => {
  try {
    const socialLinks = await socialLinkRepository.find();
    res.json(socialLinks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch social links" });
  }
};

export const createSocialLink = async (req: Request, res: Response) => {
  try {
    const socialLink = socialLinkRepository.create(req.body);
    const savedSocialLink = await socialLinkRepository.save(socialLink);
    res.status(201).json(savedSocialLink);
  } catch (error) {
    res.status(400).json({ error: "Failed to create social link" });
  }
};