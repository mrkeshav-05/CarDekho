import React from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
const TripCard = ({ trip,setupdate}) => {
  const today = new Date();
  const tripDate = new Date(trip.time);
  const textColorClass = tripDate < today ? "text-red-900" : "text-green-900";
  const bgColorClass =
  textColorClass === "text-green-900" ? "bg-green-200" : "bg-red-200";
  const handleDelete = async()=>{
    try{
      console.log(trip);
        const res=await axios.delete(`https://car-saathi.onrender.com/api/trip/deleteTrip/${trip._id}`)
        console.log(res.data)
        setupdate((prev)=>!(prev))
    }catch(err){
        console.log(err)
    }
  }
  return (
    // <div
    //   className={`border border-gray-300 rounded-md p-4 mb-2 shadow-lg hover:shadow-xl transition-transform duration-500 ease-in-out transform hover:scale- ${textColorClass} ${bgColorClass}`}
    // >
    //   <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
    //     <p className="font-bold text-lg mb-2 sm:mb-0">Source: {trip.source}</p>
    //     <p className="font-bold text-lg">Destination: {trip.destination}</p>
    //   </div>
    //   <div className="flex justify-between items-center mb-4">
    //     <p className="text-gray-700">Fare: ${trip.fare}</p>
    //     <p className="text-gray-700">
    //       Date of Traveling:{" "}
    //       {new Date(trip.time).toLocaleDateString("en-US", {
    //         month: "long",
    //         day: "numeric",
    //         year: "numeric",
    //       })}
    //     </p>
    //   </div>
    //   {textColorClass === "text-green-900" && (
    //     <div className="flex justify-end">
    //       <button className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-600 transition-colors duration-300">
    //         Delete Trip
    //       </button>
    //       <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-300">
    //         Message Driver
    //       </button>
    //     </div>
    //   )}
    // </div>
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
          <Typography
            variant="h5"
            className="font-bold text-gray-800"
            style={{ marginBottom: "16px" }}
          >
            Journey: {trip.source} to {trip.destination}
          </Typography>

          <Typography
            // variant="h6"
            className="text-gray-800"
            style={{ marginBottom: "5px" }}
          >
            Date of Travel:{" "}
            {new Date(trip.time).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>

          <Typography
            // variant="h6"
            className="text-gray-800"
            style={{ marginBottom: "5px" }}
          >
            Fare Charges: ${trip.fare}
          </Typography>
          <Typography
            // variant="h6"
            className="text-gray-800"
            style={{ marginBottom: "5px" }}
          >
            Maximum Seats: {trip.Max_Seats}
          </Typography>
          <Typography
            // variant="h6"
            className="text-gray-800"
            style={{ marginBottom: "5px" }}
          >
            Available Seats: {trip.availableSeats}
          </Typography>
          {/* <Typography
            // variant="h6"
            className="text-gray-800"
            style={{ marginBottom: "5px" }}
          >
            Fare Charges: ${trip.fare}
          </Typography> */}
          
        </div>
      </div>
      {/* <div className="flex justify-between items-center mb-3"> */}

      <div className="flex justify-between space-x-2">
       {(new Date() <= new Date(trip.time)) &&  <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          style={{ flex: 1 }}
        >
          Delete Trip
        </Button>}
        {/* <Button
          variant="contained"
          color="primary"
          // onClick={handleMessageClick}
          style={{ flex: 1 }}
        >
          Message Driver
        </Button> */}
      </div>
      </div>
      </div>
  );
};

export default TripCard;
