import React, { useState, useEffect } from "react";

function EditProject({ open, onClose, onEdit, project }) {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  const [editedCode, setEditedCode] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    if (project) {
      setEditedTitle(project.projectTitle || "");
      setEditedDesc(project.projectDesc || "");
      setEditedCode(project.projectCode || "");
    }
  }, [project]);

  // Handle the edit action
  const handleEdit = () => {
    if (project) {
      setIsConfirmationOpen(true);
    }
  };

  // Handle the confirmation
  const handleConfirmation = (confirm) => {
    if (confirm) {
      onEdit(project.pid, editedTitle, editedDesc, editedCode);
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
        <label style={{ marginRight: "10px" }}>Title:</label>
        <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        style={{ width: "300px", marginLeft: "70px" }}
        />
    </div>

    <div style={{ marginBottom: "10px", display: "flex" }}>
        <label style={{ marginRight: "10px" }}>Description:</label>
        <input
        type="text"
        value={editedDesc}
        onChange={(e) => setEditedDesc(e.target.value)}
        style={{ width: "300px", marginLeft: "12px" }}
        />
    </div>

    <div style={{ marginBottom: "10px", display: "flex" }}>
        <label style={{ marginRight: "10px" }}>Code:</label>
        <input
        type="text"
        value={editedCode}
        onChange={(e) => setEditedCode(e.target.value)}
        style={{ width: "300px", marginLeft: "59px" }}
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

export default EditProject;
