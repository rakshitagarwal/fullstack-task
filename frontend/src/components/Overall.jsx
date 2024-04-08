import React, { useState } from "react";
import CreateTable from "./modals/CreateTable";
import UserTable from "./tables/UserTable";
import { Button } from "@mui/material";

const Overall = () => {
  const [tableData, setTableData] = useState([]); // Array to store table data
  const [isPopupVisible, setPopupVisible] = useState(false); // State to control modal visibility

  // Handler function to update table data when a new table is created
  const handleTableNameInput = (input) => {
    setTableData((prevTableData) => [...prevTableData, input]);
  };

  // Handler function to show modal when 'Create Table' button is clicked
  const handleButtonClick = () => {
    setPopupVisible(true);
  };

  // Handler function to close the modal
  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <>
      {/* Render 'Create Table' button only when tableData is empty */}
      {tableData.length === 0 && (
        <div style={{ paddingLeft: "20px" }}>
          <br />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            Create Table
          </Button>
        </div>
      )}
      {/* Render CreateTable modal with appropriate props */}
      <CreateTable
        isOpen={isPopupVisible} // Pass the state to control modal visibility
        onClose={handlePopupClose} // Pass the handler function to close the modal
        onInputSubmit={handleTableNameInput} // Pass the handler function to submit table name input
      />
      {/* Render UserTable component for each table in tableData */}
      {tableData.map((oneTable, index) => (
        <div key={index}>
          <UserTable
            tableName={oneTable.tableName} // Pass table name as prop
            datatypeName={oneTable.datatypeName} // Pass datatype name as prop
          />
        </div>
      ))}
      {/* Render 'Create Table' button again if tableData is not empty */}
      {tableData.length !== 0 && (
        <div style={{ paddingLeft: "20px" }}>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            Create Table
          </Button>
          <br />
        </div>
      )}
    </>
  );
};

export default Overall;
