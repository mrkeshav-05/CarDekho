import express from "express";
import { bookingnotification,getnotifications } from "../controllers/notifications.controller.js";
const router = express.Router();

router.post("/booknotify",bookingnotification);
router.get("/getnotifications/:id",getnotifications);

export default router;