import express from "express";
import { getAllBlogPosts, createBlogPost } from "../controllers/BlogPostController";

const router = express.Router();

router.get("/blog-posts", getAllBlogPosts);
router.post("/blog-posts", createBlogPost);

export default router;