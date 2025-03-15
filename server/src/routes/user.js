import express from "express";
import { getUser } from '../controllers/user.js'
const router = express.Router();

//Routes for auth api
router.get("/getUser/:id",getUser);

export default router;