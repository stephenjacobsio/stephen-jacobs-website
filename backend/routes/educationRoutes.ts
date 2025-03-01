import express from "express";
import { getAllEducation, createEducation } from "../controllers/EducationController";

const router = express.Router();

router.get("/education", getAllEducation);
router.post("/education", createEducation);

export default router;