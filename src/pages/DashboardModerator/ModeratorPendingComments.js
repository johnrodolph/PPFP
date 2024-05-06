import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./res/logo.png";
import defaultpic from "./res/defaultpic.gif";
import "./ModeratorPendingComments.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

function ModeratorPendingComments() {
  const navigate = useNavigate();
  const { userId } = useLocation().state || {};
  const [comments, setComments] = useState([]);

  const handlePendingProjClick = () => {
    navigate('/dashboardmoderator');
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/Comment/getAllProjectCommentsDisplay")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching all comments:", error);
      });
  }, []);

  const handleViewClick = (commentId) => {
    console.log(userId);
    console.log(`View button clicked for comment ID: ${commentId}`);
  };

  const handleApproveClick = async (commentId) => {
    const shouldApprove = window.confirm("Are you sure you want to Approve this comment?");
    if (shouldApprove ) {
      try {
        await approveCommentModerator(commentId);
        console.log("Comment Approved successfully", commentId);
        alert("Comment Approved successfully");
      } catch (error) {
        console.error("Error Approving comment:", error);
        alert("Error Approving comment");
      }
    }
  }
  const handleRejectClick = async (commentId) => {
    const shouldReject = window.confirm("Are you sure you want to Reject this comment?");
    if (shouldReject ) {
      try {
        await rejectCommentModerator(commentId);
        console.log("Comment Reject successfully", commentId);
        alert("Comment Reject successfully");
      } catch (error) {
        console.error("Error Rejecting comment:", error.response?.data || error.message);
      }
    }
  }

  const approveCommentModerator = async (commentId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/Comment/approveCommentModerator?cid=${commentId}`
      );
      if (response && response.data) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
          comment.cid === commentId ? { ...comment, approved: true } : comment
          )
        );
      } else {
        console.error("Error approving comment: Response or response.data is undefined");
      }
    } catch (error) {
      throw error;
    }
  };

  const rejectCommentModerator = async (commentId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/Comment/rejectCommentModerator?cid=${commentId}`
      );
      if (response && response.data) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
          comment.cid === commentId ? { ...comment, rejected: true } : comment
          )
        );
      } else {
        console.error("Error approving comment: Response or response.data is undefined");
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

<button className="pendingcoms" onClick={handlePendingProjClick}>
     GO TO PENDING PROJECTS
    </button>
</div>

      <div  style={{ marginTop: "10px", marginBottom: "-5px", marginLeft: "935px" }} ></div>

      <div className="App-body-dashboard">
        <div className="form-container-list">
          {comments.map((comment) => (
            <Card
              key={comment.cid}
              style={{ marginTop: 10, marginBottom: 10, backgroundColor: "black",  color: "white",  width: "900px",}}>  

              <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

                <Typography variant="h5" component="div">
                  Comment: {comment.comment}
                </Typography>

                <div style={{ display: 'flex', gap: '10px'  }}>

                <Button variant="contained" style={{ backgroundColor: 'black', color: 'white', border: '1px solid white' }} onClick={() => handleViewClick(comment.cid)}>View </Button>

                <Button style={{ backgroundColor: "green", color: "white",border: "1px solid white"}} onClick={() => handleApproveClick(comment.cid)}> Approve</Button>

                <Button style={{backgroundColor: "red",color: "white",border: "1px solid white"}} onClick={() => handleRejectClick(comment.cid)}>Reject</Button>

                </div>
                
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModeratorPendingComments;
