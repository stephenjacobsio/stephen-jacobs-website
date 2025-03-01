import express from "express";
import { getAllWorkExperience, createWorkExperience } from "../controllers/WorkExperienceController";

const router = express.Router();

router.get("/work-experience", getAllWorkExperience);
router.post("/work-experience", createWorkExperience);

export default router;