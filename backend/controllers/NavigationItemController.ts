import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { NavigationItem } from "../entities/NavigationItem";

const navigationItemRepository = AppDataSource.getRepository(NavigationItem);

export const getAllNavigationItems = async (req: Request, res: Response) => {
  try {
    const navigationItems = await navigationItemRepository.find();
    res.json(navigationItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch navigation items" });
  }
};

export const createNavigationItem = async (req: Request, res: Response) => {
  try {
    const navigationItem = navigationItemRepository.create(req.body);
    const savedNavigationItem = await navigationItemRepository.save(navigationItem);
    res.status(201).json(savedNavigationItem);
  } catch (error) {
    res.status(400).json({ error: "Failed to create navigation item" });
  }
};