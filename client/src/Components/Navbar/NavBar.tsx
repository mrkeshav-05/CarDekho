import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import { RiLogoutBoxLine, RiUserLine } from "react-icons/ri";
import { Tooltip } from "@mui/material";
import { navItems } from "./NavItems"; // Ensure correct import

interface User {
  _id?: string;
  name?: string;
}

interface NavbarProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ user, setUser, setIsLoggedIn }) => {
  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    setUser({});
    setIsLoggedIn(false);
    navigate("/Signin");
  }

  function profile() {
    if (user._id) {
      navigate(`/profile/${user._id}`);
    }
  }

  return (
    <nav className="bg-black p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center text-white text-xl font-bold">
        <FaCar className="text-yellow-400 mr-2" />
        <span className="logo-text">CarDekho</span>
      </Link>

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
            <div className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center" onClick={profile}>
              <Tooltip title="Profile">
                <RiUserLine className="text-2xl mr-3" />
              </Tooltip>
            </div>
            <div className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center" onClick={Logout}>
              <Tooltip title="Logout">
                <RiLogoutBoxLine className="text-2xl mr-3" />
              </Tooltip>
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
};

export default Navbar;