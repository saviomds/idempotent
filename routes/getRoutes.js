import express from "express";
import { Register, Login, Logout } from "../controllers/getControllers.js";

const router = express.Router();

// Route for user registration
router.post("/Register", Register);

// Route for user login
router.post("/Login", Login);
router.get("/Logout", Logout);

export default router;
