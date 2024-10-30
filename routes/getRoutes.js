import express from "express";
import { Register, Login } from "../controllers/getControllers.js";

const router = express.Router();

// Route for user registration
router.post("/Register", Register);

// Route for user login
router.post("/Login", Login);

export default router;
