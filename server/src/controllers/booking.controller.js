import bookingSchema from '../models/booking.model.js';
import Trip from "../models/trip.model.js";
import User from "../models/user.model.js";
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

export const mybookings=async(req,res)=>{
  const userId=req.params.id;
  try{
      const {bookings} = await User.findById(userId)
      bookings.sort((a, b) => new Date(a.date) - new Date(b.date));
      const book =[];
      for(const id of bookings){
          const bookingdata = await bookingSchema.findById(id)
          if(!bookingdata){
              // res.status(400).json("nhi ho rha bhai");
          }
          else{
              book.push(bookingdata);
          }
      }
      res.status(200).json({book});
  }
  catch(err){
      res.status(500).json("error in finding trips");
      console.log(err);
  }
}

export const cancelbooking = async(req,res)=>{
  try {
      const booking = await bookingSchema.findByIdAndDelete(req.params.id);
      if (!booking) {
          return res.status(404).json({ message: "Booking not found" });
      }
  
      const Driver = booking.Driver;
      const bookinguser = booking.Bookingperson;
  
      console.log("Driver:", Driver);
      console.log("Booking user:", bookinguser);
  
      const findtrip = await Trip.findById(booking.trip);
      console.log("Find trip:", findtrip);
  
      const updatedTrip = await Trip.findByIdAndUpdate(
          booking.trip,
          {
              $pull: { Bookers: booking.Bookingperson },
              $inc: { availableSeats: booking.NoofBookedSeats }
          },
          { new: true }
      );
      console.log("Updated trip:", updatedTrip);
  
      const user = await User.findByIdAndUpdate(
          bookinguser,
          { $pull: { bookings: req.params.id } },
          { new: true }
      );
      console.log("Updated user:", user);
  
      const driver = await User.findByIdAndUpdate(
          Driver,
          { $pull: { trips: findtrip } },
          { new: true }
      );
      console.log("Updated driver (pull):", driver);
  
      const driver2 = await User.findByIdAndUpdate(
          Driver,
          { $push: { trips: updatedTrip } },
          { new: true }
      );
      console.log("Updated driver (push):", driver2);
      res.status(200).json({ 
          message: "Booking cancelled", 
          booking, 
          user, 
          driver: driver2 
      });
  } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ message: "Internal server error" });
  }    
}

export const confirmbooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
      const booking = await bookingSchema.findById(bookingId);

      if (!booking) {
          return res.status(404).json({ message: "Booking not found" });
      }
      const user = await User.findById(booking.Bookingperson);
      const driver = await User.findById(booking.Driver);

      if (!user || !driver) {
          return res.status(404).json({ message: "User or Driver not found" });
      }
      const updatedUser = await User.findByIdAndUpdate(
          booking.Bookingperson,
          { 
              $pull: { requestedbookings: bookingId }, 
              $push: { bookings: bookingId } 
          },
          { new: true }
      );
      const updatedTrip = await trip.findByIdAndUpdate(
          booking.trip,
          { 
              $pull: { requestedbookings: bookingId }, 
              $push: { 
                  Bookings: bookingId,
                  riders: booking.riders,
                  bookers: booking.UserId
              },
              $dec: { availableSeats: booking.NoofBookedSeats }
          },
          { new: true }
      );
      const updatedDriver = await User.findByIdAndUpdate(
          booking.Driver,
          { 
              $pull: { requestedtrips: bookingId },
          },
          { new: true }
      );
      booking.status = true;
      await booking.save();
      res.json({ message: "Booking confirmed", user: updatedUser, driver: updatedDriver });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error confirming the booking" });
  }
};