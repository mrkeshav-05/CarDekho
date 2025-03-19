import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import { RiLogoutBoxLine, RiUserLine } from "react-icons/ri";
import { navItems } from "./Navitems.jsx";
import Button from "./Button.jsx";
import { Tooltip } from "react-tooltip"; 

function Navbar({ user, setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("hello");
    console.log(user);
  }, [user]);

  function Logout() {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/Signin");
  }

  function profile() {
    navigate(`/profile/${user._id}`);
  }

  return (
    <nav className="bg-black p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center text-white text-xl font-bold">
        <FaCar className="text-yellow-400 mr-2" />
        <span className="logo-text">CarDekho</span>
      </Link>
      <div className="w-[#80vw] bg-slate-500 text-center mr-72"></div>
      <ul className="flex justify-end space-x-10 flex-grow w-20 pr-12">
        {navItems.map((item) => (
          <li key={item.id} className="relative text-white hover:text-yellow-400 cursor-pointer">
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-4 ml-auto">
        {user._id ? (
          <div className="flex">
            <Button />
            <div className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center" onClick={profile}>
              <RiUserLine className="text-2xl mr-3" data-tooltip-id="profile-tooltip" />
              <Tooltip id="profile-tooltip" place="bottom" content="Profile" />
            </div>
            <div className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center" onClick={Logout}>
              <RiLogoutBoxLine className="text-2xl mr-3" data-tooltip-id="logout-tooltip" />
              <Tooltip id="logout-tooltip" place="bottom" content="Logout" />
            </div>
          </div>
        ) : (
          <div className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center" onClick={() => navigate("/Signin")}>
            <RiUserLine className="text-3xl mr-3" />
            <span>Login</span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;