import express from "express";
import { addReview, getReviews, getRating, editReview, deleteReview } from '../controllers/reviews.js';
const router = express.Router();

//Routes for reviews api
router.post("/addReview/:id",addReview);//id of person for which review is being written
router.get("/getReviews/:id",getReviews);//id of person for which reviews are being fetched
router.get("/getRating/:id",getRating);//id of person for which rating is being fetched
router.patch("/editReview/:id",editReview);
router.delete("/deleteReview/:userId/:reviewId",deleteReview);



export default router;