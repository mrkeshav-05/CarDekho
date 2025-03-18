import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button() {
  return (
    <Link to="/booking"> 
      <button className="book-button">Book Ride</button>
    </Link>
  );
}

export default Button;
