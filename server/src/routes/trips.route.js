import express from "express";
import { createtrip,findtrip,edittrip,deleteTrip,mytrips} from "../controllers/trips.js";
const router = express.Router();

//Routes for booking api
router.post("/createtrip",createtrip);
router.post("/findtrip",findtrip);
router.put("/edittrip",edittrip);
router.delete("/deleteTrip/:id",deleteTrip);
router.get("/mytrips/:id",mytrips);
export default router;