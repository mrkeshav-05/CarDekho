import tripSchema from "../models/trip.js";
import User from "../models/user.js";
import BookingSchema from "../models/booking.js";

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
  const { source, destination, time, user } = req.body;
  console.log("Request body of find trip", req.body);
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
