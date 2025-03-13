import tripSchema from "../models/trip.js";
import User from "../models/user.js";
import BookingSchema from "../models/booking.js"

export const createtrip =async(req,res)=>{
    const {source,destination,driver,availableSeats,CarModel,Riders,Max_Seats,completed,time,route,fare} = req.body;
    const trip = tripSchema(req.body);
    console.log(req.body)
    try{
        await trip.save()
        const user = await User.findByIdAndUpdate(
            driver,
            { $push: { trips:trip } },
            { new: true }
        );
        
        res.status(200).json({trip})

    }catch(err){
   
    }
    console.log(trip)
}

