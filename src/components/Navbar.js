import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/view-surveys">View All Surveys</Link>
        </li>
        <li>
          <Link to="/create-survey">Create New Survey</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
