import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Tag } from "../entities/Tag";

const tagRepository = AppDataSource.getRepository(Tag);

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await tagRepository.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tags" });
  }
};

export const createTag = async (req: Request, res: Response) => {
  try {
    const tag = tagRepository.create(req.body);
    const savedTag = await tagRepository.save(tag);
    res.status(201).json(savedTag);
  } catch (error) {
    res.status(400).json({ error: "Failed to create tag" });
  }
};