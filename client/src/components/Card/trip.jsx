import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";
import BookerButton from "./BookerButton";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const TripCard = ({ trip, setupdate, setCurrentChat, currentChat }) => {
  console.log("current chat in trip card component", currentChat);
  console.log(trip);

  const [bookerDetails, setBookerDetails] = useState(new Map());

  if (!trip) return <div>Loading trip details...</div>;

  const today = new Date();
  const tripDate = new Date(trip.time);
  const textColorClass = tripDate < today ? "text-red-900" : "text-green-900";
  const bgColorClass = textColorClass === "text-green-900" ? "bg-green-200" : "bg-red-200";

  const handleDelete = async () => {
    try {
      console.log(trip);
      const res = await axios.delete(`${backendUrl}/api/trip/deleteTrip/${trip._id}`);
      console.log(res.data);
      setupdate((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async (id) => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/getUser/${id}`);
      const user = res.data.user;
      setBookerDetails((prev) => {
        const newMap = new Map(prev);
        newMap.set(user._id, user);
        return newMap;
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log("TripCard props:", { setCurrentChat, currentChat });

  useEffect(() => {
    const bookers = trip?.Bookers || [];
    for (let i = 0; i < bookers.length; i++) {
      getUser(bookers[i]);
    }
  }, [trip?.Bookers]);

  console.log(bookerDetails.entries());

  return (
    <div
      className={`border border-gray-300 rounded-lg p-6 transition-transform duration-500 ease-in-out transform hover:scale-105 ${textColorClass}`}
      style={{
        backgroundColor: "#f2f2f2",
        color: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-center">
          <div style={{ textAlign: "left", width: "100%" }}>
            <Typography variant="h5" className="font-bold text-gray-800" style={{ marginBottom: "5px" }}>
              Journey: {trip.source} to {trip.destination}
            </Typography>

            <Typography className="text-gray-800" style={{ marginBottom: "5px" }}>
              Date of Travel:{" "}
              {new Date(trip.time).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Typography>

            <Typography className="text-gray-800" style={{ marginBottom: "5px" }}>
              Fare Charges: <CurrencyRupeeIcon style={{ fontSize: "16px", marginRight: "1px" }} />
              {trip.fare}
            </Typography>

            <Typography className="text-gray-800" style={{ marginBottom: "5px" }}>
              Available Seats: {trip.availableSeats}
            </Typography>

            <Typography className="text-gray-800" style={{ marginBottom: "5px" }}>
              Bookers:{" "}
              {trip.Max_Seats > trip.availableSeats ? (
                Array.from(bookerDetails.entries()).map(([id, user]) => (
                  <BookerButton
                    key={id}
                    user={user}
                    currentChat={currentChat}
                    setCurrentChat={setCurrentChat}
                    curruser={trip.driver}
                  />
                ))
              ) : (
                <span>N/A</span> 
              )}
            </Typography>
          </div>
        </div>

        <div className="flex justify-between space-x-2">
          {new Date() <= new Date(trip.time) && (
            <Button variant="contained" color="error" onClick={handleDelete} style={{ flex: 1 }}>
              Delete Trip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;