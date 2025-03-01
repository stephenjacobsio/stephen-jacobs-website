import express from "express";
import { getAllSocialLinks, createSocialLink } from "../controllers/SocialLinksController";

const router = express.Router();

router.get("/social-links", getAllSocialLinks);
router.post("/social-links", createSocialLink);

export default router;