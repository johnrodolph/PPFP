import React, { useState, useEffect} from "react";
import logo from "./res/logo.png";
import defaultpic from "./res/defaultpic.gif";
import "./ViewUserProjects.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Button} from "@mui/material";
import axios from "axios";
import EditProject from "./EditProject";
import Popover from "@mui/material/Popover";

function ViewUserProjects() {
  const navigate = useNavigate();
  const { userId } = useLocation().state || {};
  const [projects, setProjects] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 

  useEffect(() => {
    console.log("userId in ViewUserProjects:", userId);
    axios
    .get(`http://localhost:8080/Project/getAllUserProjects?uid=${userId}`)
    .then((response) => {
      setProjects(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user projects:", error);
    });
  }, [userId]);

  const handleDashboardClick = () => {
    navigate("/dashboard", { state: { userId } });
  };

  const handleDashboardModeratorClick = () => {
    navigate("/dashboardmoderator");
  };

  const handleViewClick = (projectId) => {
    console.log(userId);
    console.log(`View button clicked for project ID: ${projectId}`);
  };

  const handleDeleteClick = async (projectId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this project?");
    if (shouldDelete) {
      try {
        await deleteProject(projectId);
        console.log("Project deleted successfully:", projectId);
        alert("Project deleted successfully:");
      } catch (error) {
        console.error("Error deleting project:", error.response?.data || error.message);
      }
    }
  }

  const handleEditClick = (projectId) => {
    const projectToEdit = projects.find((project) => project.pid === projectId);
    setSelectedProject(projectToEdit);
    setEditModalOpen(true);
  }

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedProject(null);
  };
  

  const handleEditProject = async (projectId, editedTitle, editedDesc, editedCode) => {
    try {
        const response = await axios.put(
          `http://localhost:8080/Project/updateProject?sid=${projectId}`,
          {
            projectTitle: editedTitle,
            projectDesc: editedDesc,
            projectCode: editedCode,
          }
        );
        if (response && response.data) {
          console.log("Project updated successfully:", response.data);
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project.pid === projectId
                ? { ...project, projectTitle: editedTitle, projectDesc: editedDesc, projectCode: editedCode }
                : project
            )
          );
          handleEditModalClose();
        } else {
          console.error("Error updating project: Response or response.data is undefined");
        }
      } catch (error) {
        console.error("Error updating project:", error.response?.data || error.message);
      }
    };

    const deleteProject = async (projectId) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/Project/deleteProject?sid=${projectId}`
        );
        if (response && response.data) {
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project.pid === projectId ? { ...project, deleted: true } : project
            )
          );
        } else {
          console.error("Error deleting project: Response or response.data is undefined");
        }
      } catch (error) {
        throw error;
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
              
            </div>
          </Popover>
        </div>
        
      </header>
      <div style={{ marginTop: '10px', marginBottom: '-5px', marginLeft: '935px' }}>
        <button style={{ fontSize: '20px' }}
          onClick={() => handleDashboardClick()}
        >
          Dashboard
        </button>
        <button style={{ fontSize: '20px', marginLeft: '10px',  color: 'white', backgroundColor: 'black' }}
          onClick={() => handleViewClick()}
        >
          My Projects
        </button>
      </div>
      <div className="App-body-dashboard">
        <div className="form-container-list">
        {projects.map((project) => (
          <Card key={project.pid} style={{ marginTop: 10, marginBottom: 10, backgroundColor: 'black', color: 'white', width: '900px' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Display project status */}
            <div style={{ marginBottom: '10px' }}>
              {project.pending && <span style={{ marginRight: '10px', color: 'yellow' }}>Pending</span>}
              {project.approved && <span style={{ marginRight: '10px', color: 'green' }}>Accepted</span>}
              {project.rejected && <span style={{ marginRight: '10px', color: 'red' }}>Rejected</span>}
            </div>
        
            <Typography variant="h5" component="div" style={{ textAlign: 'center', marginBottom: '10px' }}>
              Title: {project.projectTitle}
            </Typography>
            <Typography style={{ textAlign: 'center', marginBottom: '10px' }}>
              Description: {project.projectDesc}
            </Typography>
        
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="contained" style={{ backgroundColor: 'black', color: 'white', border: '1px solid white' }} onClick={() => handleViewClick(project.pid)}>
                View
              </Button>
              <Button variant="contained" style={{ backgroundColor: 'green', color: 'white', border: '1px solid white' }} onClick={() => handleEditClick(project.pid)}>
                Edit
              </Button>
              <Button variant="contained" style={{ backgroundColor: 'red', color: 'white', border: '1px solid white' }} onClick={() => handleDeleteClick(project.pid)}>
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
        ))}
        </div>
      </div>
      <EditProject
        open={editModalOpen}
        onClose={handleEditModalClose}
        onEdit={handleEditProject}
        project={selectedProject}
      />
    </div>
  );
}

export default ViewUserProjects;