import React, { useState, useEffect } from "react";
import logo from "./res/logo.png";
import "./ViewProject.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Button } from "@mui/material";
import EditComment from "./EditComment";  

function ViewProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useLocation().state || {};
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const projectId = location.state?.projectId;

    if (projectId) {
      axios
        .put(`http://localhost:8080/Project/findById?pid=${projectId}`)
        .then((response) => {
          console.log("Project details:", response.data);
          setProject(response.data);
        })
        .catch((error) => {
          console.error("Error fetching project details:", error);
        });
    }
  }, [location.state?.projectId]);

  useEffect(() => {
    const projectId = location.state?.projectId;

    if (projectId) {
      axios
        .put(`http://localhost:8080/Comment/getAllProjectComments?pid=${projectId}`)
        .then((response) => {
          console.log("Comments for project:", response.data);

          const approvedComments = response.data.filter(comment => comment.approved);

          // Sort comments with the user's comment first
          setComments (() => {
            const sortedComments = [...approvedComments].sort((a, b) => {
              if (a.userId === location.state?.userId) return -1;
              if (b.userId === location.state?.userId) return 1;
              // Sort other comments based on your criteria (e.g., timestamp)
              return 0;
            });

            return sortedComments;
          });
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
  }, [location.state?.projectId, location.state?.userId]);

  const handleCommentInputChange = (event) => {
    setNewCommentText(event.target.value);
  };

  const handleAddCommentClick = () => {
    if (newCommentText.trim() !== "") {
      handleAddComment(newCommentText);
      setNewCommentText(""); // Clear the input field after adding a comment
    }
  };

 
  const handleAddComment = async () => {
    const projectId = location.state?.projectId;
    const userId = location.state?.userId;

    if (projectId && userId) {
      try {
        const response = await axios.post(
          "http://localhost:8080/Comment/insertComment",
          {
            projectId: projectId,
            userId: userId,
            comment: newCommentText,
            pending: true,
            isDeleted: false
          },
          {
            headers: {
              "Content-Type": "application/json",
            }, 
          }
        );

        if (response && response.data) {
          console.log(response.data);

          if (Array.isArray(response.data)) {
            setComments([...comments, ...response.data]);
          } else {
            
            setComments([...comments, response.data]);
          }

          setNewCommentText("");
        } else {
          console.error(
            "Error creating comment: Response or response.data is undefined"
          );
        }
      } catch (error) {
        console.error(
          "Error creating comment:",
          error.response?.data || error.message
        );
      }
    }
  };

  const handleEditClick = (commentId) => {
    const commentToEdit = comments.find((comment) => comment.cid === commentId);
    setSelectedComment(commentToEdit);
    setEditModalOpen(true);
  }

  const handleDeleteClick = async (commentId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this comment?");
    if (shouldDelete) {
      try {
        await handledeleteComment(commentId);
        console.log("Comment deleted successfully:", commentId);
        alert("Comment deleted successfully:");
      } catch (error) {
        console.error("Error deleting comment:", error.response?.data || error.message);
      }
    }
  }


  const handledeleteComment = async (commentId) => {
    // Implement the API call to delete the comment by ID
    try {
      const response = await axios.put(`http://localhost:8080/Comment/deleteComment?cid=${commentId}`);

      if (response && response.data) {
        console.log(`Comment deleted: ${commentId}`);
        // Update comments state after deletion
        setComments((prevComments) => prevComments.filter(comment => comment.cid !== commentId));
      } else {
        console.error(`Error deleting comment: Response or response.data is undefined for comment ID ${commentId}`);
      }
    } catch (error) {
      console.error(`Error deleting comment: ${error.response?.data || error.message}`);
    }
  };


  const handleEditComment = async (commentId, editedComment) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/Comment/updateComment?cid=${commentId}`,
        {
          comment: editedComment,
          approved: false // Set approved to false when editing a comment
        }
      );
  
      if (response && response.data) {
        console.log("Comment updated successfully:", response.data);
        // Update the state to include only approved comments
        setComments((prevComments) => {
          const updatedComments = prevComments
            .filter((comment) => comment.approved) // Filter out unapproved comments
            .map((comment) =>
              comment.cid === commentId
                ? { ...comment, comment: editedComment, approved: false } // Set approved to false for the edited comment
                : comment
            );
          return updatedComments;
        });
        handleEditModalClose();
      } else {
        console.error("Error updating comment: Response or response.data is undefined");
      }
    } catch (error) {
      console.error("Error updating comment:", error.response?.data || error.message);
    }
  };
  

  const handleDashboardClick = () => {
    navigate("/dashboard", { state: { userId } });
  };
  
  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedComment(null);
  };
  return (
    <div className="App-ViewProject">
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
      </header>

      <main className="App-main-content">
        {project && (
          <div className="project-details">
            <Card style={{ align: "center", marginTop: 10, marginBottom: 10, marginLeft: 280, backgroundColor: '#c8c4c4', color: 'black', width: '900px'}}>
              <CardContent>
                <Typography variant="h5" component="div">
                  <h1>{project.projectTitle || "No Title"}</h1>
                </Typography>
                <Typography>
                  <p>{project.projectDesc || "No Description"}</p>
                </Typography>
                <div className="project-code-box">
                  <Typography>
                    <p>{project.projectCode || "No Code"}</p>
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        

        <Card style={{ marginTop: 10, marginBottom: 10, marginLeft: 300, backgroundColor: 'white', color: 'black', border: "1px solid", width: '900px', borderRadius: '10px'}}>
          <CardContent>
            <h2>Comments</h2>
            <div style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#c8c4c4', color: 'white', borderRadius: '5px'}}>
              <textarea
                style={{ marginTop: 10, marginBottom: 10, backgroundColor: 'white', color: 'black', width: '500px', borderRadius: '5px'}}
                value={newCommentText}
                onChange={handleCommentInputChange}
                placeholder="Write a comment..."
              />
              <Button
                variant="contained"
                style={{ marginLeft: 10, marginBottom: 10, backgroundColor: 'black', color: 'white', border: '1px solid black', borderRadius: '5px' }}
                onClick={handleAddCommentClick}
              >
                Add
              </Button>
            </div>
            {comments.map((comment) => (
              <div key={comment.cid} style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#c8c4c4', color: 'black', border: "1px solid white", borderRadius: '10px'}}>
                
                <p>{comment.comment}</p>
                {comment.userId === location.state?.userId && (
                  <>
                    <Button
                      variant="contained"
                      style={{ border: '1px solid white', backgroundColor: 'green', color: 'white', marginRight: '8px', borderRadius: '5px'}}
                      onClick={() => handleEditClick(comment.cid)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      style={{ border: '1px solid white', backgroundColor: 'red', color: 'white', borderRadius: '5px' }}
                      onClick={() => handleDeleteClick(comment.cid)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
              )
            )}

          </CardContent>
        </Card>

        <div className="ViewProjectMenu">{/* extra space */}</div>

        {/* Edit Comment Modal */}
        <EditComment
          open={editModalOpen}
          onClose={handleEditModalClose}
          onEdit={handleEditComment}
          comment={selectedComment}
        />
      </main>
    </div>
  );
}

export default ViewProject;
