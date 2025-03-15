import React from "react";
import carImage from "../../Images/4.png"; // Ensure this is a transparent PNG

const Analytics: React.FC = () => {
  return (
    <>
      <div className="w-full bg-white py-12 px-10">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="text-center md:text-left mt-8 md:mt-0 p-6 flex flex-col justify-center">
            <p className="text-yellow-500 font-bold font-serif text-lg md:text-xl mb-4">
              Discover Your Next Adventure✨
            </p>
            <h1 className="text-[#171717] md:text-5xl sm:text-4xl text-3xl font-bold mb-4 font-serif leading-tight">
              Find the Cheapest Rides Anywhere
            </h1>
            <p className="text-justify pr-8 text-base md:text-md font-serif mb-6 text-[#171717]">
              Are you ready to embark on unforgettable journeys without breaking
              the bank? With our platform, discover the most affordable rides to
              your dream destinations. Say yes to adventures!
            </p>
          </div>

          {/* Transparent Image Section */}
          <div className="flex justify-center">
            <img
              src={carImage}
              className="w-[90%] md:w-[100%] lg:w-[120%] h-auto max-w-2xl my-4"
              alt="Adventure"
              style={{
                background: "transparent", // Ensure no background
                mixBlendMode: "multiply", // Helps with transparency blending
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;