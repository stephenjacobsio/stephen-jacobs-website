import express from "express";
import { getAllTechnologies, createTechnology } from "../controllers/TechnologiesController";

const router = express.Router();

router.get("/technologies", getAllTechnologies);
router.post("/technologies", createTechnology);

export default router;