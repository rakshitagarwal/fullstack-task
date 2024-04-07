import React, { useState, useEffect } from "react";
import { Modal, TextField, Button } from "@mui/material";
import "./CreateTable.css";

const CreateTable = ({ isOpen, onClose, onInputSubmit }) => {
  const [tableName, setTableName] = useState("");
  const [datatypeName, setDatatypeName] = useState("");
  const [isValid, setIsValid] = useState(false); // State to track form validity

  // Function to update form validity based on input values
  const updateValidity = () => {
    setIsValid(tableName.trim() !== "" && datatypeName.trim() !== "");
  };

  // Reset validity when modal opens
  useEffect(() => {
    if (isOpen) {
      updateValidity();
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (isValid) {
      onInputSubmit({ tableName, datatypeName });
      setTableName("");
      setDatatypeName("");
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="custom-modal"
    >
      <div className="modal-content">
        <h4>Create Table</h4>
        <TextField
          label="Table Name"
          value={tableName}
          onChange={(e) => {
            setTableName(e.target.value);
            updateValidity(); // Update validity when input changes
          }}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Data Type Name"
          value={datatypeName}
          onChange={(e) => {
            setDatatypeName(e.target.value);
            updateValidity();
          }}
          fullWidth
          margin="normal"
          required
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Create Table
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateTable;
