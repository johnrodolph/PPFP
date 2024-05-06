import React, { useState } from "react";
import axios from "axios";
import logo from "./res/logo.png";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogoClick = () => {
    navigate("/landingpage");
  };

  const handleDashboardClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/User/authenticate",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        // console.log("User ID:", userId);

        // Use navigate to redirect to the dashboard and pass state
        navigate("/dashboard", { state: { userId: user.uid } });
      } else {
        alert("Invalid Email or Password, or Account does not exist!");
      }
    } catch (error) {
      alert("Invalid Email or Password, or Account does not exist!");
      console.error("Authentication failed", error.response.data);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          onClick={handleLogoClick}
          src={logo}
          alt="logo"
          style={{ height: "216px", width: "216px", alignSelf: "center" }}
        />
      </header>
      <div className="App-body">
        <div className="signin">SIGN IN</div>
        <div className="form-container">
          <div className="form-row"></div>
          <div className="form-group">
            <label style={{ marginLeft: "290px"}} htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              style={{ width: "100%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label style={{ marginLeft: "290px"}} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              style={{ width: "100%" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className="sign-in-signinpage-button"
          onClick={handleDashboardClick}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignIn;
