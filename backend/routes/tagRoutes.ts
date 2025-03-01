import express from "express";
import { getAllTags, createTag } from "../controllers/TagController";

const router = express.Router();

router.get("/tags", getAllTags);
router.post("/tags", createTag);

export default router;