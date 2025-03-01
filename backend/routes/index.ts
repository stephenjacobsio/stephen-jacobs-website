import express from "express";
import blogPostRoutes from "./blogPostRoutes";
import educationRoutes from "./educationRoutes";
import workExperienceRoutes from "./workExperienceRoutes";
import certificationsRoutes from "./certificationRoutes";
import projectsRoutes from "./projectsRoutes";
import technologiesRoutes from "./technologiesRoutes";
import socialLinksRoutes from "./socialLinksRoutes";
import tagRoutes from "./tagRoutes";
import navigationItemRoutes from "./navigationItemsRoutes";

const router = express.Router();

router.use("/blog-posts", blogPostRoutes);
router.use("/education", educationRoutes);
router.use("/work-experience", workExperienceRoutes);
router.use("/certifications", certificationsRoutes);
router.use("/projects", projectsRoutes);
router.use("/technologies", technologiesRoutes);
router.use("/social-links", socialLinksRoutes);
router.use("/tags", tagRoutes);
router.use("/navigation-items", navigationItemRoutes);

export default router;