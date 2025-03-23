import express from "express";
import { signup, verifyMail, forgetPassword, resetPassword } from "../controllers/signup.controller.js";
import { signin } from "../controllers/signin.controller.js";
import { googleAuth } from "../controllers/google.controller.js";

const router = express.Router();

// Routes for authentication
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/verify", verifyMail);
router.post("/forget-password", forgetPassword);
router.get("/reset-password/:token", resetPassword);
router.post("/google", googleAuth);

export default router;