import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./res/logo.png";
import defaultpic from "./res/defaultpic.gif";
import Popover from "@mui/material/Popover";
import axios from "axios";
import "./AdminUserList.css";

function AdminNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  //Popover functions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  //local storage user
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
    console.log(user);
  }, []);

  return (
    <div className="App-admin-body">
      <nav className="admin-nav">
        <img
          src={logo}
          alt="logo"
          onClick={handleDashboardClick}
          style={{
            height: "216px",
            width: "216px",
            marginRight: "16px",
            alignSelf: "flex-start",
          }}
        />
        <div className="nav-center-text">
          <p>PPFAP User List</p>
        </div>
        <div className="ProfilePic">
          <img
            onClick={handleClick}
            src={defaultpic}
            alt="defaultpic"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            style={{
              borderRadius: "50%",
              width: 150,
              height: 150,
            }}
          />
          <div style={{ textAlign: "center", color: "white", padding: "10px" }}>
            {user?.admin === true && <p>Hello Admin {user?.fname}</p>}
            {user?.mod === true && <p>Hello Moderator {user?.fname}</p>}
            {(user?.admin || user?.mod) === false && <p>Hello {user?.fname}</p>}
          </div>
          <Popover
            className="popover-dashboard"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div className="dropdown-items">
              <a href="" className="user-profile">
                <p>Profile</p>
              </a>
              <a href="">
                <p>Notifications</p>
              </a>
              <a href="">
                <p>Settings</p>
              </a>
              <a href="">
                <p>Logout</p>
              </a>
            </div>
          </Popover>
        </div>
      </nav>
    </div>
  );
}
export default AdminNav;
