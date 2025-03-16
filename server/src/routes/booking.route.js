import express from "express";
import { booktrip,cancelbooking,confirmbooking,mybookings} from "../controllers/booking.js";
const router = express.Router();

//Routes for booking api
router.post("/booktrip",booktrip);
router.delete("/cancelbooking/:id",cancelbooking);
router.post("/confirmbooking",confirmbooking);
router.get("/mybookings/:id",mybookings);

export default router;