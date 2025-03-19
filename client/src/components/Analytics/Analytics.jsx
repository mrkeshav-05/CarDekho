import React from "react";
import carImage from "../../Images/4.png"; 

function Analytics() {
  return (
    <>
      <div className="w-full bg-white py-0 px-10">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 items-up">
        
          <div className="text-center md:text-left mt-8 md:mt-0 p-6 flex flex-col justify-center">
            <p className="text-yellow-500 font-bold font-serif text-lg md:text-xl mb-4">
              Discover Your Next Adventure✨
            </p>
            <h1 className="text-[#171717] md:text-5xl sm:text-4xl text-3xl font-bold mb-4 font-serif leading-tight">
              Find the Cheapest Rides Anywhere
            </h1>
            <p className="text-justify pr-8 text-base md:text-md font-serif mb-6 text-[#171717">
              Are you ready to embark on unforgettable journeys without breaking
              the bank? With our platform, discover the most affordable rides to
              your dream destinations. Say yes to adventures!
            </p>
          </div>
          <img
            src={carImage}
            alt="Spreadsheet Illustration"
            className="w-[90%] h-[80%] my-4 rounded-md ml-24"
          />
        </div>
      </div>
    </>
  );
}

export default Analytics;
