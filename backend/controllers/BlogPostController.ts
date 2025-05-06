import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { BlogPost } from "../entities/BlogPost";

const blogPostRepository = AppDataSource.getRepository(BlogPost);

export const getAllBlogPosts = async (req: any, res: Response) => {
  try {
    const posts = await blogPostRepository.find({ relations: ["tags"] });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
};

export const createBlogPost = async (req: any, res: Response) => {
  try {
    const blogPost = blogPostRepository.create(req.body);
    const savedBlogPost = await blogPostRepository.save(blogPost);
    res.status(201).json(savedBlogPost);
  } catch (error) {
    res.status(400).json({ error: "Failed to create blog post" });
  }
};