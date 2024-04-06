import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import "./ModalPopup.css";

const ModalPopup = ({ isOpen, onClose, onInputSubmit }) => {
  const [tableName, setTableName] = useState("");
  const [datatypeName, setDatatypeName] = useState("");
  const [isValid, setIsValid] = useState(false); // State to track form validity

  // Function to update form validity based on input values
  const updateValidity = () => {
    setIsValid(tableName.trim() !== "" && datatypeName.trim() !== "");
  };

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
        <Button onClick={handleSubmit} disabled={!isValid}>
          Submit
        </Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};

export default ModalPopup;
