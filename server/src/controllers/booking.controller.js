import bookingSchema from '../models/booking.model.js';
import Trip from "../models/trip.model.js";
import User from "../models/user.js";
import Notification from "../models/notifications.model.js";


export const booktrip = async (req, res) => {
  const { Driver, Bookingperson, trip, NoofBookedSeats } = req.body;
  const rt = Math.random();
  const booking = new bookingSchema({ ...req.body, rt });
  console.log("Request body", req.body)
  try {

    await booking.save();
    const findtrip = await Trip.findById(trip);
    console.log("Find Trip", findtrip)
    console.log("seats avail", findtrip.availableSeats - NoofBookedSeats)
    if (findtrip.availableSeats - NoofBookedSeats < 0) {
      return res.status(400).json("not enough seats,Sorry!")
    }
    const tripdriver = await User.findById(findtrip.driver);
    const drivercontent = `New booking made by ${Bookingperson.name} with you from ${findtrip.source} to ${findtrip.destination} with  ${NoofBookedSeats} ${NoofBookedSeats == 1 ? 'seat' : 'seats'}`;
    const bookercontent = `New booking made by you with ${tripdriver.name} from ${findtrip.source} to ${findtrip.destination} with ${NoofBookedSeats} ${NoofBookedSeats == 1 ? 'seat' : 'seats'}`;
    //   console.log("Content",content);
    console.log("Trip", trip);
    console.log("Booking person", Bookingperson)
    const notification1 = new Notification({
      userId: Bookingperson._id,
      type: "booking-confirmed",
      content: bookercontent
    });
    const notification2 = new Notification({
      userId: tripdriver._id,
      type: "booking-confirmed",
      content: drivercontent
    });
    await notification1.save();
    await notification2.save();

    const updatedTrip = await Trip.findByIdAndUpdate(
      trip,
      {
        $push: {
          Bookings: booking._id,
          Riders: booking.riders,
          Bookers: Bookingperson,
        },
        $inc: { availableSeats: -NoofBookedSeats }
      },
      { new: true }
    );
    const user = await User.findByIdAndUpdate(
      Bookingperson,
      { $push: { bookings: booking._id } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      Driver,
      { $pull: { trips: findtrip } },
      { new: true }
    );

    const user2 = await User.findByIdAndUpdate(
      Driver,
      { $push: { trips: updatedTrip } },
      { new: true }
    );
    console.log("Updated Trip", updatedTrip);

    res.status(200).json({ booking });
  } catch (err) {
    if (err.code === 11000) {
      console.log(err);
      return res.status(400).json({ message: 'Duplicate key error. This record already exists.' });
    }
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};