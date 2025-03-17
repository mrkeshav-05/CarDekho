import React from "react";
import { useNavigate } from "react-router-dom";
import carImage from "../../Images/1.png"; // Import the image

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-[#171717] py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="max-w-xl mx-auto text-center md:text-left md:mr-6 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            India's Premier Carpooling Platform
          </h1>
          <p className="text-md md:text-md mb-2">
            Connecting Travelers, One Ride at a Time
          </p>
          <p className="text-md mb-2">
            Fast, Flexible, Reliable Carpooling Services
          </p>
          <p className="text-md font-bold mb-6">
            Your Journey Begins, Sharing Rides Along the Way
          </p>
          <button
            onClick={() => navigate("/search")}
            className="bg-[#e1b437] hover:bg-orange-700 text-[#f2f2f2] font-bold py-4 px-8 rounded-md transition duration-300 ease-in-out"
          >
            FIND A RIDE →
          </button>
        </div>
        <div className="flex-shrink-0 w-full md:w-1/2 ">
          <img
            src={carImage} // Use the imported image
            alt="car illustration"
            className="w-[50vw] h-auto p-4 "
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
