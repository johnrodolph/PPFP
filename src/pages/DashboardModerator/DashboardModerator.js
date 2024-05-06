import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./res/logo.png";
import defaultpic from "./res/defaultpic.gif";
import "./DashboardModerator.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

function DashboardModerator() {
  const navigate = useNavigate();
  const { userId } = useLocation().state || {};
  const [projects, setProjects] = useState([]);

  const handlePendingComsClick = () => {
    navigate('/pendingcommentsmoderator');
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/Project/getAllProjectsDisplay")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching all projects:", error);
      });
  }, []);

  const handleViewClick = (projectId) => {
    console.log(userId);
    console.log(`View button clicked for project ID: ${projectId}`);
  };

  const handleApproveClick = async (projectId) => {
    const shouldApprove = window.confirm("Are you sure you want to Approve this project?");
    if (shouldApprove ) {
      try {
        await approveProjectModerator(projectId);
        console.log("Project Approved successfully", projectId);
        alert("Project Approved successfully");
      } catch (error) {
        console.error("Error Approving project:", error.response?.data || error.message);
      }
    }
  }
  const handleRejectClick = async (projectId) => {
    const shouldReject = window.confirm("Are you sure you want to Reject this project?");
    if (shouldReject ) {
      try {
        await rejectProjectModerator(projectId);
        console.log("Project Reject successfully", projectId);
        alert("Project Reject successfully");
      } catch (error) {
        console.error("Error Rejecting project:", error.response?.data || error.message);
      }
    }
  }

  const approveProjectModerator = async (projectId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/Project/approveProjectModerator?pid=${projectId}`
      );
      if (response && response.data) {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.pid === projectId ? { ...project, approved: true } : project
          )
        );
      } else {
        console.error("Error approving project: Response or response.data is undefined");
      }
    } catch (error) {
      throw error;
    }
  };

  const rejectProjectModerator = async (projectId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/Project/rejectProjectModerator?pid=${projectId}`
      );
      if (response && response.data) {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.pid === projectId ? { ...project, rejected: true } : project
          )
        );
      } else {
        console.error("Error approving project: Response or response.data is undefined");
      }
    } catch (error) {
      throw error;
    }
  };
  const handleDashboardClick = () => {
    navigate("/dashboard", { state: { userId } });
  };

  return (
    <div className="App-dashboard">
      <header className="App-header-dashboard">

        <img onClick={handleDashboardClick}src={logo} alt="logo"style={{height: "216px",width: "216px", marginRight: "16px",alignSelf: "flex-start",}} />

        <div className="form-group-search">
          <input type="search" id="search-dashboard" placeholder="Search" />
        </div>
        <div className="ProfilePic">
          <img src={defaultpic}  alt="defaultpic" style={{ borderRadius: "50%", width: 150, height: 150,}}/>
        </div>
      
      </header>
      <div className="PendingComments">

<button className="pendingcoms" onClick={handlePendingComsClick}>
GO TO PENDING COMMENTS
    </button>
</div>

      <div  style={{ marginTop: "10px", marginBottom: "-5px", marginLeft: "935px" }} ></div>

      <div className="App-body-dashboard">
        <div className="form-container-list">
          {projects.map((project) => (
            <Card
              key={project.pid}
              style={{ marginTop: 10, marginBottom: 10, backgroundColor: "black",  color: "white",  width: "900px",}}>  

              <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

                <Typography variant="h5" component="div">
                  Title: {project.projectTitle}
                </Typography>
                
                <Typography>
                Description: {project.projectDesc}
                </Typography>

                <div style={{ display: 'flex', gap: '10px'  }}>

                <Button variant="contained" style={{ backgroundColor: 'black', color: 'white', border: '1px solid white' }} onClick={() => handleViewClick(project.pid)}>View </Button>

                <Button style={{ backgroundColor: "green", color: "white",border: "1px solid white"}} onClick={() => handleApproveClick(project.pid)}> Approve</Button>

                <Button style={{backgroundColor: "red",color: "white",border: "1px solid white"}} onClick={() => handleRejectClick(project.pid)}>Reject</Button>

                </div>
                
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardModerator;
