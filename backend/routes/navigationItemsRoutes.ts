import express from "express";
import { getAllNavigationItems, createNavigationItem } from "../controllers/NavigationItemController";

const router = express.Router();

router.get("/navigation-items", getAllNavigationItems);
router.post("/navigation-items", createNavigationItem);

export default router;