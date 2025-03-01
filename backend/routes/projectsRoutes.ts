import express from "express";
import { getAllProjects, createProject } from "../controllers/ProjectsController";

const router = express.Router();

router.get("/projects", getAllProjects);
router.post("/projects", createProject);

export default router;