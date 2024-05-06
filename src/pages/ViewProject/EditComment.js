import React, { useState, useEffect } from "react";

function EditComment({ open, onClose, onEdit, comment }) {
  const [editedComment, setEditedComment] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    if (comment) {
      setEditedComment(comment.newCommentText || "");
    }
  }, [comment]);

  // Handle the edit action
  const handleEdit = () => {
    if (comment) {
      setIsConfirmationOpen(true);
    }
  };

  // Handle the confirmation
  const handleConfirmation = (confirm) => {
    if (confirm) {
      onEdit(comment.cid, editedComment);
    }
    setIsConfirmationOpen(false);
  };

  return (
    <div
    style={{
        display: open ? "block" : "none",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 1000,
    }}
    >
    <div style={{ marginBottom: "10px", display: "flex" }}>
        <label style={{ marginRight: "10px" }}>Update Comment:</label>
        <input
        type="text"
        value={editedComment}
        onChange={(e) => setEditedComment(e.target.value)}
        style={{ width: "300px", marginLeft: "70px" }}
        />
    </div>

    <button onClick={handleEdit} style={{ marginRight: "10px" }}>
        Save Changes
    </button>
    <button onClick={onClose}>Cancel</button>
    {isConfirmationOpen && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to apply changes?</p>
          <button onClick={() => handleConfirmation(true)}>Yes</button>
          <button onClick={() => handleConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default EditComment;
