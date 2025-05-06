import express from "express";
import { getAllBlogPosts, createBlogPost } from "../controllers/BlogPostController";

const router = express.Router();

router.get("/", getAllBlogPosts);
router.post("/", createBlogPost);

export default router;