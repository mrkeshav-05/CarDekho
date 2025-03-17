import React from "react";
import { Link } from "react-router-dom";

import { Tooltip } from "react-tooltip"; // Import correctly

function Button() {
  return (
    <div  className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center">
    <Link to="/inbox" className="flex mr-3">
    {/* <FaInbox className="text-3xl font-bold"/> */}
      <Tooltip title="Inbox"><button className="relative text-2xl">✉</button></Tooltip>
    </Link>
    </div>
  );
}

export default Button;