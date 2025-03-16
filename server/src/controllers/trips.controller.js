import tripSchema from "../models/trip.model.js";
import User from "../models/user.model.js";
import BookingSchema from "../models/booking.model.js";

export const createtrip = async (req, res) => {
  const {
    source,
    destination,
    driver,
    availableSeats,
    CarModel,
    Riders,
    Max_Seats,
    completed,
    time,
    route,
    fare,
  } = req.body;
  const trip = tripSchema(req.body);
  console.log(req.body);
  try {
    await trip.save();
    const user = await User.findByIdAndUpdate(
      driver,
      { $push: { trips: trip } },
      { new: true }
    );

    res.status(200).json({ trip });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    console.log(err);
  }
  console.log(trip);
};

export const mytrips = async (req, res) => {
  const userId = req.params.id;
  try {
    const { trips } = await User.findById(userId);
    trips.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.status(200).json({ trips });
  } catch (err) {
    res.status(500).json("error in finding trips");
    console.log(err);
  }
};

export const findtrip = async (req, res) => {
  const { source, destination, time } = req.body;
  try {
    const trip = await tripSchema.find({
      source: source,
      destination: destination,
      time: { $gte: time },
      availableSeats: { $gte: 1 },
    });
    console.log("Trip", trip);
    res.status(200).json({ trip });
  } catch {
    res.json({ message: "No such trips found" });
  }
};

//add delet trip
export const deleteTrip = async(req,res)=>{
    try{
        console.log(req.params.id);
        const trip = await tripSchema.findByIdAndDelete(req.params.id);
        console.log(trip);
        const driver = trip.driver;
        const updatedDriver = await User.findByIdAndUpdate(
            driver,
            {$pull:{trips:trip}},
            {new: true}
        );
        console.log(driver);
        // Iterate through each booking associated with the trip
        for (const bookingId of trip.Bookings) {
            const booking = await BookingSchema.findById(bookingId);
            if (booking) {
                // Removing the trip from each booker's bookings array
                const updatedUser = await User.findByIdAndUpdate(
                    booking.Bookingperson,
                    {$pull:{bookings:bookingId}},
                    {new: true}
                );
            }
        }
        res.json({trip});
    } catch(err){
        console.error(err);
        res.status(500).json({message:"cannot delete the trip/trip not found"});
    }
}

export const edittrip = async(req,res)=>{
    try{
        const trip = await tripSchema.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.json({message:"trip edited"})
    }catch(err){
        res.json({message:"cannot edit the trip/trip not found"})
    }
}