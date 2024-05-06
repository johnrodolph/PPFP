import React, { useState, useEffect } from "react";
import logo from "./res/logo.png";
import defaultpic from "./res/defaultpic.gif";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import axios from "axios";
import "./AdminUserList.css";

function AdminDeleteProjectAndCommentPage() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  //local storage user
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
    console.log(user);
  }, []);

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

  //conditional rendering for buttons in the header
  const [selectedButton, setSelectedButton] = useState(1);
  const handleButtonClick = (buttonIDmoderator) => {
    setSelectedButton(buttonIDmoderator);
  };

  //displaying the projects
  const [projects, setProjects] = useState([]);
  const loadProjects = async () => {
    const result = await axios.get(
      "http://localhost:8080/Project/getAllProjects"
    );

    setProjects(result.data);
  };
  useEffect(() => {
    loadProjects();
  }, []);

  //displaying the comments
  const [comments, setComments] = useState([]);
  const loadComments = async () => {
    const result = await axios.get(
      "http://localhost:8080/Comment/getAllComments"
    );
    setComments(result.data);
  };
  useEffect(() => {
    loadComments();
  }, []);

  //Delete a project
  const handleDeleteProject = async (pid) => {
    try {
      // Send a PUT request to update the project
      const response = await fetch(
        `http://localhost:8080/Project/adminSoftDeleteProject/${pid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Project DELETED successfully");
        await loadProjects();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project");
    }
  };

  //Delete a comment
  const handleDeleteComment = async (cid) => {
    try {
      // Send a PUT request to update the comment
      const response = await fetch(
        `http://localhost:8080/Comment/adminSoftDeleteComment/${cid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Comment DELETED successfully");
        await loadComments();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("An error occurred while deleting the Comment");
    }
  };

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
          <div className="buttonheader-div">
            <button
              className={selectedButton === 1 ? "selected" : ""}
              onClick={() => handleButtonClick(1)}
            >
              Project List
            </button>
            <button
              className={selectedButton === 2 ? "selected" : ""}
              onClick={() => handleButtonClick(2)}
            >
              Comment List
            </button>
          </div>
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
              <a href="/adminuserlist">
                <p>User List</p>
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

      <div className="App-body-admin">
        {selectedButton === 1 ? (
          //DIV FOR PROJECTS

          <div className="div-container-admin">
            <div className="div-table">
              <div className="user-table">
                <table>
                  <thead>
                    <tr className="table-header-row">
                      <th scope="col">Project ID</th>
                      <th scope="col">User ID</th>
                      <th scope="col">Project Code</th>
                      <th scope="col">Project Title</th>
                      <th scope="col">Project Desc</th>
                      <th scope="col">isApproved</th>
                      <th scope="col">isRejected</th>
                      <th scope="col">isDeleted</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((projectDetail, index) => (
                      <tr>
                        <th scope="row" key={index}>
                          {projectDetail.pid}
                        </th>
                        <th scope="row" key={index}>
                          {projectDetail.userId}
                        </th>
                        <td>{projectDetail.projectCode}</td>
                        <td>{projectDetail.projectTitle}</td>
                        <td>{projectDetail.projectDesc}</td>
                        <td>{projectDetail.approved.toString()}</td>
                        <td>{projectDetail.rejected.toString()}</td>
                        <td>{projectDetail.deleted.toString()}</td>
                        <td className="edit-delete-buttons">
                          <button
                            onClick={() =>
                              handleDeleteProject(projectDetail.pid)
                            }
                            className="admin-button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          // DIV FOR COMMENTS

          <div className="div-container-admin">
            <div className="div-table">
              <div className="user-table">
                <table>
                  <thead>
                    <tr className="table-header-row">
                      <th scope="col">Comment ID</th>
                      <th scope="col">Project ID</th>
                      <th scope="col">User ID</th>
                      <th scope="col">Comment</th>
                      <th scope="col">isPending</th>
                      <th scope="col">isApproved</th>
                      <th scope="col">isRejected</th>
                      <th scope="col">isDeleted</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.map((commentDetail, index) => (
                      <tr>
                        <th scope="row" key={index}>
                          {commentDetail.cid}
                        </th>
                        <th scope="row" key={index}>
                          {commentDetail.projectId}
                        </th>
                        <td scope="row" key={index}>
                          {commentDetail.userId}
                        </td>
                        <td>{commentDetail.comment}</td>
                        <td>{commentDetail.pending.toString()}</td>
                        <td>{commentDetail.approved.toString()}</td>
                        <td>{commentDetail.rejected.toString()}</td>
                        <td>{commentDetail.deleted.toString()}</td>
                        <td className="edit-delete-buttons">
                          <button
                            onClick={() =>
                              handleDeleteComment(commentDetail.cid)
                            }
                            className="admin-button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default AdminDeleteProjectAndCommentPage;
