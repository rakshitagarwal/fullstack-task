import React, { useState, useEffect } from "react";
import { Modal, TextField, Button } from "@mui/material";

const AddRow = ({ isOpen, onClose, columns = [], onInputSubmit }) => {
  const [inputData, setInputData] = useState({}); // State to store input data for each column
  const [isValid, setIsValid] = useState(false); // State to track form validity

  // Function to update form validity based on input values
  const updateValidity = () => {
    setIsValid(Object.values(inputData).every((value) => value.trim() !== ""));
  };

  // Reset validity when modal opens
  useEffect(() => {
    if (isOpen) {
      updateValidity();
    }
  }, [isOpen]);

  const handleInputChange = (columnName, value) => {
    setInputData({ ...inputData, [columnName]: value });
    updateValidity();
  };

  const handleSubmit = () => {
    if (isValid) {
      onInputSubmit(inputData);
      setInputData({});
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
        <h4>Insert Row</h4>
        {columns.map((column, index) => (
          <TextField
            key={index}
            label={column}
            value={inputData[column] || ""}
            onChange={(e) => handleInputChange(column, e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddRow;
