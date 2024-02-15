import React, { useState, useEffect } from "react";
import logo from "./res/logo.png";
import "./MyProfile.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function MyProfile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const { userId } = useLocation().state || {};

  useEffect(() => {
    axios
      .put("http://localhost:8080/User/findByUid", null, {
        params: { uid: userId },
      })
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [userId]);

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const handleApplyClick = async () => {
    if (userDetails.applying) {
      alert("You are already applying. Please wait for the approval.");
      return;
    }

    if (!userDetails.applying) {
      const applyAsMod = window.confirm("Do you want to apply as a Moderator?");
      
      if (applyAsMod) {
        try {
          const response = await axios.put(
            `http://localhost:8080/User/applyForModerator?sid=${userId}`
          );
          
          if (response) {
            console.log("Applied for Moderator role successfully");
            setUserDetails(response.data);
          } else {
            console.error("Error applying for Moderator role");
          }
        } catch (error) {
          console.error("Error applying for Moderator role:", error);
        }
      }
    } else if (userDetails.applying && !userDetails.mod) {
      const applyAsMod = window.confirm("Do you want to apply as a Moderator?");
      
      if (applyAsMod) {
        try {
          const response = await axios.put(
            `http://localhost:8080/User/applyForModerator?sid=${userId}`
          );
          
          if (response) {
            console.log("Applied for Moderator role successfully");
            setUserDetails(response.data);
          } else {
            console.error("Error applying for Moderator role");
          }
        } catch (error) {
          console.error("Error applying for Moderator role:", error);
        }
      }
    } else if (userDetails.applying && userDetails.mod && !userDetails.admin) {
      const applyAsAdmin = window.confirm("Do you want to apply as an Admin?");
      
      if (applyAsAdmin) {
        try {
          const response = await axios.put(
            `http://localhost:8080/User/applyForAdmin?sid=${userId}`
          );
          
          if (response) {
            console.log("Applied for Admin role successfully");
            setUserDetails(response.data);
          } else {
            console.error("Error applying for Admin role");
          }
        } catch (error) {
          console.error("Error applying for Admin role:", error);
        }
      }
    }
  };
  
  const handleEditClick = async () => {
    const confirmed = window.confirm("Are you sure you want to update your profile?");
    
    if (confirmed) {
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const newPassword = document.getElementById("newPassword").value;
  
      if (!newPassword || newPassword.trim() === "") {
        alert("Password cannot be null or empty.");
        return;
      }
  
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
      if (!passwordRegex.test(newPassword)) {
        alert("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one special character.");
        return;
      }
  
      try {
        const updatedUserDetails = {
          fname: firstName,
          lname: lastName,
          email: email,
          password: newPassword,
          mod: userDetails.mod,
          gender: userDetails.gender,
        };
  
        const response = await axios.put(
          `http://localhost:8080/User/updateUser?sid=${userId}`,
          updatedUserDetails
        );
  
        if (response) {
          console.log("User details updated successfully");
          setUserDetails(response.data);
        } else {
          console.error("Error updating user details");
        }
      } catch (error) {
        console.error("Error updating user details:", error);
      }
    }
  };
  

  const handleDeleteClick = async () => {
    console.log(userId);
    const shouldDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
  
    if (shouldDelete) {
      try {
        const response = await axios.put(
          `http://localhost:8080/User/softDeleteUser?uid=${userId}`
        );
        if (response) {
          navigate("/landingpage");
        } else {
          console.error("Error deleting User: Response or response.data is undefined");
        }
      } catch (error) {
        throw error;
      }
    }
  };

  const getRole = () => {
    if (userDetails.admin) {
      return "Admin";
    } else if (userDetails.mod) {
      return "Moderator";
    } else {
      return "User";
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          onClick={handleLogoClick}
          src={logo}
          alt="logo"
          style={{
            height: "216px",
            width: "216px",
            marginRight: "16px",
            alignSelf: "flex-start",
          }}
        />
      </header>
      <div className="App-body">
        <div className="myprofile">MY PROFILE</div>
        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label style={{marginRight: '100px'}} htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                style={{ border: "1px solid black" }}
                defaultValue={userDetails.fname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                style={{ border: "1px solid black" }}
                defaultValue={userDetails.lname}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                style={{ border: "1px solid black" }}
                defaultValue={userDetails.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                style={{ border: "1px solid black" }}
                defaultValue={getRole()}
                readOnly
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="currentpassword">Current Password</label>
            <input
              type="text"
              id="currentpassword"
              style={{ width: "50%", border: "1px solid black" }}
              defaultValue={userDetails.password}
              readOnly
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="text"
                id="newPassword"
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <button className="submit-button" onClick={handleApplyClick}>
                  Apply
                </button>
              </div>
              <div className="form-group">
                <button className="submit-button" onClick={handleEditClick}>
                  Edit
                </button>
              </div>
              <div className="form-group">
                <button className="submit-button" onClick={handleDeleteClick}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
