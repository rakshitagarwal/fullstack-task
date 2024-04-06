import React, { useState } from "react";
import ModalPopup from "./ModalPopup";
import UserTable from "./UserTable";
import { Button } from '@mui/material';

const Overall = () => {
  const [tableData, setTableData] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false); // State to control modal visibility

  const handleTableNameInput = (input) => {
    setTableData((prevTableData) => [...prevTableData, input]);
  };

  const handleButtonClick = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <>
      {tableData.length === 0 && (
        <div style={{paddingLeft: "20px"}}>
          <br />
          <br />
          <br />
          <Button variant="contained" color="primary" onClick={handleButtonClick}>Create Table</Button>
        </div>
      )}
      <ModalPopup
        isOpen={isPopupVisible} // Pass the state to control modal visibility
        onClose={handlePopupClose} // Pass the handler function to close the modal
        onInputSubmit={handleTableNameInput}
      />
      {tableData.map((oneTable, index) => (
        <div key={index}>
          <UserTable tableName={oneTable.tableName} datatypeName={oneTable.datatypeName} />
        </div>
      ))}
      {tableData.length !== 0 && (
        <div style={{paddingLeft: "20px"}}>
          <br />
          <Button variant="contained" color="primary" onClick={handleButtonClick}>Create Table</Button>
          <br />
        </div>
      )}
    </>
  );
};

export default Overall;
