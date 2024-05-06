import React, { useState, useEffect } from "react";
import logo from "./res/logo.png";
import defaultpic from "./res/defaultpic.gif";
import "./AdminUserList.css";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

function AdminUserList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
    console.log(user);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [users, setUsers] = useState([]);

  // const for adding a user modal
  const [openAddUserModal, setAddUserOpen] = React.useState(false);
  const handleAddUserModalOpen = () => setAddUserOpen(true);
  const handleAddUserModalClose = () => setAddUserOpen(false);

  const [userToEdit, setUserToEdit] = useState();
  // const for editing a user modal
  const [openEditUserModal, setEditUserOpen] = React.useState(false);
  const handleEditUserModalOpen = (uid) => {
    const userToEdit = users.find((user) => user.uid === uid);
    if (!userToEdit) {
      return;
    }
    setUserToEdit(userToEdit);
    setEditUserOpen(true);
  };
  const handleEditUserModalClose = () => setEditUserOpen(false);

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/User/getAllUsers");
    setUsers(result.data);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //Button for editing a user in the database

  const handleEditUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    // console.log(formData);
    try {
      // Send a PUT request to update the user
      const response = await fetch(
        `http://localhost:8080/User/updateUser?sid=${userToEdit.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("User updated successfully");
        await loadUsers();
      } else {
        const errorData = await response.json();
        alert(`Updating user failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error editing user:", error);
      alert("An error occurred while editing the user");
    }
  };
  //Delete a user
  const handleDeleteUser = async (uid) => {
    try {
      // Send a PUT request to update the user
      const response = await fetch(
        `http://localhost:8080/User/adminSoftDeleteUser/${uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("User DELETED successfully");
        await loadUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user");
    }
  };

  // Button for adding a user to the database

  const handleAddUserClick = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    const response = await fetch("http://localhost:8080/User/signUpUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("UserAdded");
      await loadUsers();
    } else {
      const errorData = await response.json();
      alert(`Adding a user failed: ${errorData.message}`);
    }
  };

  return (
    <div className="App-admin-body">
      {/* modal for adding a user */}
      <Modal
        open={openAddUserModal}
        onClose={handleAddUserModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-body">
            <form onSubmit={handleAddUserClick}>
              <div className="form-tag">
                <label htmlFor="fname">Firstname:</label>
                <input type="text" id="firstName" name="fname" />
              </div>
              <div className="form-tag">
                <label htmlFor="lname">Lastname:</label>
                <input type="text" id="lastName" name="lname" />
              </div>
              <div className="form-tag">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-tag">
                <label htmlFor="gender">Gender:</label>
                <select name="gender" id="gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-tag">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
              </div>
              <div className="form-tag">
                <label htmlFor="admin">isAdmin:</label>
                <input type="text" id="admin" name="admin" />
              </div>
              <div className="form-tag">
                <label htmlFor="mod">isMod:</label>
                <input type="text" id="mod" name="mod" />
              </div>
              <div className="form-tag" action="">
                <label htmlFor="applying">isApplying:</label>
                <input type="text" id="applying" name="applying" />
              </div>
              <div className="form-tag" action="">
                <label htmlFor="approved">isApproved:</label>
                <input type="text" id="approved" name="approved" />
              </div>

              <div className="form-tag" action="">
                <label htmlFor="rejected">isRejected:</label>
                <input type="text" id="rejected" name="rejected" />
              </div>
              <div className="modal-buttons">
                <button className="admin-button" type="submit">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      {/* modal for editing a user */}
      <Modal
        open={openEditUserModal}
        onClose={handleEditUserModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-body">
            <form onSubmit={handleEditUser}>
              <input type="hidden" value={userToEdit?.uid} id="uid" />
              <div className="form-tag" action="">
                <label htmlFor="fname">Firstname:</label>
                <input
                  required
                  defaultValue={userToEdit?.fname}
                  type="text"
                  id="firstName"
                  name="fname"
                />
              </div>
              <div className="form-tag">
                <label htmlFor="lname">Lastname:</label>
                <input
                  required
                  defaultValue={userToEdit?.lname}
                  type="text"
                  id="lastName"
                  name="lname"
                />
              </div>
              <div className="form-tag">
                <label htmlFor="email">Email:</label>
                <input
                  required
                  defaultValue={userToEdit?.email}
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
              <div className="form-tag">
                <label htmlFor="gender">Gender:</label>
                <select
                  required
                  defaultValue={userToEdit?.gender.toLowerCase()}
                  name="gender"
                  id="gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-tag">
                <label htmlFor="password">Password:</label>
                <input
                  required
                  defaultValue={userToEdit?.password}
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <div className="form-tag">
                <label htmlFor="admin">isAdmin:</label>
                <input
                  required
                  defaultValue={userToEdit?.admin}
                  type="text"
                  id="admin"
                  name="admin"
                />
              </div>
              <div className="form-tag">
                <label htmlFor="mod">isMod:</label>
                <input
                  required
                  defaultValue={userToEdit?.mod}
                  type="text"
                  id="mod"
                  name="mod"
                />
              </div>
              <div className="form-tag">
                <label htmlFor="applying">isApplying:</label>
                <input
                  required
                  defaultValue={userToEdit?.applying}
                  type="text"
                  id="applying"
                  name="applying"
                />
              </div>
              <div className="form-tag">
                <label htmlFor="approved">isApproved:</label>
                <input
                  required
                  defaultValue={userToEdit?.approved}
                  type="text"
                  id="approved"
                  name="approved"
                />
              </div>

              <div className="form-tag">
                <label htmlFor="rejected">isRejected:</label>
                <input
                  required
                  defaultValue={userToEdit?.rejected}
                  type="text"
                  id="rejected"
                  name="rejected"
                />
              </div>
              <div className="modal-buttons">
                <button className="admin-button" type="submit">
                  Confirm Edit
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
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
              <a href="/admindeleteprojectcommentpage">
                <p>Projects and Comments List</p>
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
        <div className="div-container-admin">
          <div className="add-user-button">
            <button onClick={handleAddUserModalOpen} className="admin-button">
              Add User
            </button>
          </div>
          <div className="div-table">
            <div className="user-table">
              <table>
                <thead>
                  <tr className="table-header-row">
                    <th scope="col">User ID</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Password</th>
                    <th scope="col">isAdmin</th>
                    <th scope="col">isMod</th>
                    <th scope="col">isApplying</th>
                    <th scope="col">isApproved</th>
                    <th scope="col">isRejected</th>
                    <th scope="col">isDeleted</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userDetail, index) => (
                    <tr>
                      <th scope="row" key={index}>
                        {userDetail.uid}
                      </th>
                      <td>{userDetail.fname}</td>
                      <td>{userDetail.lname}</td>
                      <td>{userDetail.email}</td>
                      <td>{userDetail.gender}</td>
                      <td>{userDetail.password}</td>
                      <td>{userDetail.admin.toString()}</td>
                      <td>{userDetail.mod.toString()}</td>
                      <td>{userDetail.applying.toString()}</td>
                      <td>{userDetail.approved.toString()}</td>
                      <td>{userDetail.rejected.toString()}</td>
                      <td>{userDetail.deleted.toString()}</td>
                      <td className="edit-delete-buttons">
                        <button
                          className="admin-button"
                          onClick={() =>
                            handleEditUserModalOpen(userDetail.uid)
                          }
                        >
                          Edit
                        </button>
                        <button
                          onClick={function () {
                            handleDeleteUser(userDetail.uid);
                          }}
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
      </div>
    </div>
  );
}
export default AdminUserList;
