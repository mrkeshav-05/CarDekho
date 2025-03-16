import express from "express";
import { newMessage,getMessages } from '../controllers/message.js'
const router = express.Router();

//Routes for auth api
router.post("/",newMessage);
router.get("/:conversationId",getMessages);

export default router;