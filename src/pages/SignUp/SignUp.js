import React from "react";
import logo from "./res/logo.png";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/landingpage");
  };

  const handleSignUpClick = async () => {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const gender = document.getElementById("gender").value;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch("http://localhost:8080/User/signUpUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: firstName,
        lname: lastName,
        email,
        password,
        gender,
      }),
    });

    if (response.ok) {
      alert("Signup Success");
      navigate("/landingpage");
    } else {
      const errorData = await response.json();
      alert(`Signup Failed: ${errorData.message}`);
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
        <div className="signup">SIGN UP</div>
        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                style={{ border: "1px solid black" }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                style={{ border: "1px solid black" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" style={{ width: "50%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" style={{ width: "50%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              style={{ width: "50%" }}
            />
          </div>
          <div
            className="form-group"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label htmlFor="gender">Gender</label>
            <select id="gender" style={{ width: "50%", marginLeft: "50%" }}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <br />
          <br />
          <button className="sign-up-button" onClick={handleSignUpClick}>
            Sign Up
          </button>
          <div className="boxfortermsandalready">
            <div className="terms">
              By creating an account, I agree with Peer Project Feedback
              <br />
              Platform Privacy Policy and Terms of Service.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
