import React, { useState, useEffect } from "react";
import logo from "./res/logo.png";
import defaultpic from "./res/defaultpic.gif";
import "./ModeratorPendingPage.css";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import axios from "axios";

function ModeratorPendingPage() {
  const [selectedButton, setSelectedButton] = useState(1);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
    console.log(user);
  }, []);

  // const for displaying users applying to be mod
  const [users, setUsers] = useState([]);
  const loadUsers = async () => {
    const result = await axios.get(
      "http://localhost:8080/User/findUsersByIsApplyingAndIsNotMod?isApplying=true"
    );
    setUsers(result.data);
  };
  //for loading users applying to be mod
  useEffect(() => {
    loadUsers();
  }, []);

  // const for displaying mods applying to be admin
  const [mods, setMods] = useState([]);
  const loadMods = async () => {
    const result = await axios.get(
      "http://localhost:8080/User/findByIsModAndIsApplying?isMod=true&isApplying=true"
    );
    setMods(result.data);
  };
  //for loading users applying to be mod
  useEffect(() => {
    loadMods();
  }, []);

  //button for approve mod to admin

  const handleApproveModToAdmin = async (uid) => {
    try {
      // Send a PUT request to update the user
      const response = await fetch(
        `http://localhost:8080/User/approveModToAdmin/${uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response); // Log the entire response for debugging

      if (response.ok) {
        alert("Mod Approved successfully");
        await loadMods();
      }
    } catch (error) {
      console.error("Error approving mod:", error);
      alert("An error occurred while approving the mod");
    }
  };

  //button for reject mod to admin

  const handleRejectModToAdmin = async (uid) => {
    try {
      // Send a PUT request to update the user
      const response = await fetch(
        `http://localhost:8080/User/rejectModToAdmin/${uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("User Approved successfully");
        await loadUsers();
      }
    } catch (error) {
      console.error("Error approving user:", error);
      alert("An error occurred while approving the user");
    }
  };

  //button for approve user to mod

  const handleApproveUserToMod = async (uid) => {
    try {
      // Send a PUT request to update the user
      const response = await fetch(
        `http://localhost:8080/User/approveUserToModerator/${uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("User Approved successfully");
        await loadUsers();
      }
    } catch (error) {
      console.error("Error approving user:", error);
      alert("An error occurred while approving the user");
    }
  };

  //button for rejecting user to mod
  const handleRejectUserToMod = async (uid) => {
    try {
      // Send a PUT request to update the user
      const response = await fetch(
        `http://localhost:8080/User/rejectUserToModerator/${uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Mod Rejected successfully");
        await loadUsers();
      }
    } catch (error) {
      console.error("Error rejecting mod:", error);
      alert("An error occurred while rejecting the mod");
    }
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDashboardModeratorClick = () => {
    navigate("/dashboardmoderator");
  };

  const handleButtonClick = (buttonIDmoderator) => {
    setSelectedButton(buttonIDmoderator);
  };

  return (
    <div className="App-moderator">
      <header className="App-header-moderator">
        <img
          onClick={handleDashboardClick}
          src={logo}
          alt="logo"
          style={{
            height: "216px",
            width: "216px",
            marginRight: "16px",
            alignSelf: "flex-start",
          }}
        />
        <div className="buttonheader-div">
          <button
            className={selectedButton === 1 ? "selected" : ""}
            onClick={() => handleButtonClick(1)}
          >
            Pending for Moderator
          </button>
          <button
            className={selectedButton === 2 ? "selected" : ""}
            onClick={() => handleButtonClick(2)}
          >
            Pending for Admin
          </button>
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
              <a href="" className="send-request-dropdown">
                <p>Send Request</p>
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
      </header>

      <div className="App-body-moderator">
        {/* div for user applying to be moderator */}
        {selectedButton === 1 ? (
          <div className="confirmation-container">
            {users.map((user, index) => (
              <div className="confirmation-items">
                <div className="user-profile">
                  <img
                    src={defaultpic}
                    alt="defaultpic"
                    style={{
                      borderRadius: "50%",
                      width: 116,
                      height: 112,
                    }}
                  />
                  <p>{`${user.fname} ${user.lname}`}</p>
                </div>
                {/* div for items inside the container */}
                <div className="button-confirmation">
                  <div className="date">
                    <p>
                      {`${user.uid} - ${user.fname} ${user.lname}`} is applying
                      for Moderator.
                    </p>
                  </div>
                  <div className="approve-reject-buttons">
                    <button
                      onClick={() => {
                        handleApproveUserToMod(user.uid);
                      }}
                      className="approverejectbuttons"
                      type="button"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleRejectUserToMod(user.uid);
                      }}
                      className="approverejectbuttons"
                      type="button"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // div for mod applying to be admin

          <div className="confirmation-container">
            {mods.map((mod, index) => (
              <div className="confirmation-items-comments">
                <div className="user-profile">
                  <img
                    src={defaultpic}
                    alt="defaultpic"
                    style={{
                      borderRadius: "50%",
                      width: 116,
                      height: 112,
                    }}
                  />
                  <p>{`${mod.fname} ${mod.lname}`}</p>
                </div>
                {/* comment-date container */}
                <div className="button-confirmation">
                  <div className="date">
                    <p>
                      {`${mod.uid} - ${mod.fname} ${mod.lname}`} is applying for
                      Admin.
                    </p>
                  </div>
                  <div className="approve-reject-buttons">
                    <button
                      onClick={() => {
                        handleApproveModToAdmin(mod.uid);
                      }}
                      class="approverejectbuttons"
                      type="button"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleRejectModToAdmin(mod.uid);
                      }}
                      class="approverejectbuttons"
                      type="button"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModeratorPendingPage;
