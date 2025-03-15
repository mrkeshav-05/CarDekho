import React from "react";
import { useNavigate } from "react-router-dom";
import carImage from "../../Images/2.png"; // Ensure this image has transparency

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="py-20 flex flex-col md:flex-row items-center justify-center">
      {/* Left Section: Text Content */}
      <div className="max-w-xl text-center md:text-left md:mr-6">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
          India's Premier Carpooling Platform
        </h1>
        <p className="text-md mb-2">Connecting Travelers, One Ride at a Time</p>
        <p className="text-md font-serif mb-2">Fast, Flexible, Reliable Carpooling Services</p>
        <p className="text-md font-serif font-bold mb-6">
          Your Journey Begins, Sharing Rides Along the Way
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/search")}
          className="bg-[#e1b437] hover:bg-orange-700 text-white  font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out shadow-md"
        >
          FIND A RIDE →
        </button>
      </div>

      {/* Right Section: Image Without Background */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center">
  <img
    src={carImage}
    alt="Car illustration"
    className="w-[70vw] max-w-[600px] h-auto scale-110"
  />
</div>
    </div>
  );
};

export default Hero;