import React, { useState, useEffect } from "react";
import logo from "./res/logo.png";
import defaultpic from "./res/defaultpic.gif";
import "./Dashboard.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Popover from "@mui/material/Popover";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const { userId } = useLocation().state || {};
  const [projects, setProjects] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userDetails, setUserDetails] = useState({});
  const open = Boolean(anchorEl);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
    console.log(user);
  }, []);

  useEffect(() => {
    axios
      .put("http://localhost:8080/User/findByUid", null, {
        params: { uid: userId },
      })
      .then((response) => {
        setUserDetails(response.data);
        console.log(userDetails.fname);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });

    axios
      .get("http://localhost:8080/Project/getAllApprovedProjects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  const handleProfileClick = () => {
    navigate("/myprofile", { state: { userId } });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleViewUserProjectsClick = () => {
    navigate("/viewuserprojects", { state: { userId } });
  };

  const handleLogOutClick = () => {
    navigate("/landingpage");
  };


  const handleViewClick = (projectId) => {
    console.log(userId);
    console.log(projectId);
    navigate("/viewproject", { state: { userId, projectId } });
  };

  const handleCreateProject = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to create this project?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.post(
          "http://localhost:8080/Project/insertProject",
          {
            projectTitle: projectTitle,
            projectDesc: projectDescription,
            projectCode: projectCode,
            pending: true,
            isDeleted: false,
            userId: userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response && response.data) {
          console.log(response.data);

          // Check if response.data is an array
          if (Array.isArray(response.data)) {
            setProjects([...projects, ...response.data]);
          } else {
            // If it's not an array, assume it's a single project
            setProjects([...projects, response.data]);
          }

          setProjectTitle("");
          setProjectDescription("");
          setProjectCode("");
        } else {
          console.error(
            "Error creating project: Response or response.data is undefined"
          );
        }
      } catch (error) {
        console.error(
          "Error creating project:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className="App-dashboard">
      <header className="App-header-dashboard">
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
        <div className="form-group-search">
          <input type="search" id="search-dashboard" placeholder="Search" />
        </div>

        <div className="ProfilePic">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
            <div style={{ textAlign: "center", color: "white" }}>
              {user?.admin === true && <p> Admin {user?.fname}</p>}
              {user?.mod === true && <p> Moderator {user?.fname}</p>}
              {(user?.admin || user?.mod) === false && (
                <p>{user?.fname}</p>
              )}
            </div>
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
              <a onClick={handleProfileClick} className="user-profile">
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
              {(user?.mod || user?.admin) === true && (
                <a href="/dashboardmoderator">
                  <p>Moderator Dashboard</p>
                </a>
              )}

              {user?.admin === true && (
                <a href="/adminuserlist">
                  <p>Admin User List Page</p>
                </a>
              )}
              {user?.admin === true && (
                <a href="/moderatorpendingpage">
                  <p>Moderator Pending Page</p>
                </a>
              )}
              <a onClick={handleLogOutClick}>
                <p>Logout</p>
              </a>
            </div>
          </Popover>
        </div>
      </header>
      <div
        style={{
          marginTop: "10px",
          marginBottom: "-25px",
          marginLeft: "935px",
        }}
      >
        <button
          style={{
            fontSize: "20px",
            color: "white",
            backgroundColor: "black",
          }}
          onClick={() => handleDashboardClick()}
        >
          Dashboard
        </button>
        <button
          style={{ fontSize: "20px", marginLeft: "10px" }}
          onClick={() => handleViewUserProjectsClick()}
        >
          My Projects
        </button>
      </div>
      <div className="App-body-dashboard">
        <section className="join-section-post">
          <div className="form-container">
            <div className="form-row"></div>
            <div className="form-group-projecttitle">
              <input
                type="text"
                id="projecttitle"
                placeholder="Project Title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
            </div>
            <div className="form-group-projectdescription">
              <input
                type="text"
                id="projectdescription"
                placeholder="Project Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
            <div className="form-group-placecode">
              <input
                type="text"
                id="placecode"
                placeholder="Place your code here..."
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
              />
            </div>
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                border: "1px solid white",
                marginLeft: "80%",
                marginTop: "5px",
              }}
              onClick={handleCreateProject}
            >
              Create Project
            </button>
          </div>
        </section>
        <div className="form-container-list">
          {projects.map((project) => (
            <Card
              key={project.pid}
              style={{
                marginTop: 10,
                marginBottom: 10,
                backgroundColor: "black",
                color: "white",
                width: "900px",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Title: {project.projectTitle}
                </Typography>
                <Typography>Description: {project.projectDesc}</Typography>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    border: "1px solid white",
                  }}
                  onClick={() => handleViewClick(project.pid)}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
