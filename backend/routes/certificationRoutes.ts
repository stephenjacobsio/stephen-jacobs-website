import express from "express";
import { getAllCertifications, createCertification } from "../controllers/CertificationController";

const router = express.Router();

router.get("/certifications", getAllCertifications);
router.post("/certifications", createCertification);

export default router;