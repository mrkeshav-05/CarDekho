import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

// Define the functional component with TypeScript
const Footer: React.FC = () => {
  return (
    <div className="w-full bg-black py-16 px-4 text-gray-300">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        <div>
        <h1 className="w-full text-3xl font-bold text-[#dbaa08] mb-4 font- ">
  CarDekho.Com
</h1>
          <p className="py-4 text-sm">
            CarDekho is your go-to platform for finding and offering rides. We aim to make commuting easier, more affordable, and environmentally friendly by connecting drivers and passengers for carpooling.
          </p>
          <div className="flex justify-between md:w-[75%] my-6">
            <FaFacebookSquare size={30} className="hover:text-blue-500" />
            <FaInstagram size={30} className="hover:text-purple-500" />
            <FaTwitterSquare size={30} className="hover:text-blue-400" />
            <FaGithubSquare size={30} className="hover:text-gray-600" />
            <FaDribbbleSquare size={30} className="hover:text-pink-500" />
          </div>
        </div>
        <div className="lg:col-span-2 flex justify-around mt-6">
          <div>
            <h6 className="font-medium text-[#00df9a] mb-2">About</h6>
            <ul>
              <li className="py-2 text-sm hover:text-[#00df9a]">How it Works?</li>
              <li className="py-2 text-sm hover:text-[#00df9a]">About Us</li>
              <li className="py-2 text-sm hover:text-[#00df9a]">Help Center</li>
              <li className="py-2 text-sm hover:text-[#00df9a]">We are Hiring!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;