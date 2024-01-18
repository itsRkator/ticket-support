// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import { Toolbar, Button } from "@mui/material";

import logo from "../logo.svg";

const NavBar = () => {
  return (
    <Toolbar
      style={{
        backgroundColor: "#1976D2",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
      }}
    >
      <Button type="button" component={Link} to="/" color="inherit">
        <img
          src={logo}
          alt="Company Logo"
          style={{ maxHeight: "40px", width: "40px" }}
        />
      </Button>
      <div>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/create-support-agent" color="inherit">
          Create Agent
        </Button>
        <Button component={Link} to="/create-support-ticket" color="inherit">
          Create Ticket
        </Button>
      </div>
    </Toolbar>
  );
};

export default NavBar;
