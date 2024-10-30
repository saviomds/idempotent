import express from "express";
import { getServices } from "../controllers/serviceController.js";

const router = express.Router();

// Route for services page
router.get("/Services", getServices);

export default router;
