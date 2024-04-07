import React, { useState, useEffect } from "react";
import { Modal, TextField, Button } from "@mui/material";

const EditRow = ({ isOpen, onClose, values, onInputSubmit }) => {
  const [inputData, setInputData] = useState({}); // State to store input data for each column

  // Reset input data when modal opens
  useEffect(() => {
    if (isOpen) {
      setInputData(values); // Populate form fields with initial values
    }
  }, [isOpen, values]);

  const handleInputChange = (columnName, value) => {
    setInputData({ ...inputData, [columnName]: value });
  };

  const handleSubmit = () => {
    onInputSubmit(inputData);
    setInputData({});
    onClose();
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
        <h4>Update Data</h4>
        {Object.keys(values).map((column, index) => (
          <TextField
            key={index}
            label={column}
            value={inputData[column] || ""} // Populate form fields with initial values
            onChange={(e) => handleInputChange(column, e.target.value)}
            fullWidth
            margin="normal"
          />
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            Update
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditRow;
