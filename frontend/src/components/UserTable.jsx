import React, { useEffect, useRef, useState } from "react";
import XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import {
  createData,
  showData,
  updateData,
  deleteData,
} from "../redux/excelSlice";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import theme from "../utils/theme";
import "../App.css";

const EXTENSIONS = ["xlsx", "xls", "csv"];

function UserTable() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.excel);
  console.log("state excel data: " + data, status);
  const [colDefs, setColDefs] = useState();
  const [rowsData, setData] = useState();
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(showData());
  }, [dispatch]);

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const getExention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension); // return boolean
  };

  const convertToJson = (headers, rowsData) => {
    const rows = [];
    rowsData.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };

  const importExcel = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      //parse data
      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      //get first sheet
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      // console.log(fileData)
      const headers = fileData[0];
      const heads = headers.map((head) => ({ title: head, field: head }));
      setColDefs(heads);

      //removing header
      fileData.splice(0, 1);
      const convertedData = convertToJson(headers, fileData);
      setData(convertedData);
      createData(convertedData);
    };

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        alert("Invalid file input, Select Excel, CSV file");
      }
    } else {
      setData([]);
      setColDefs([]);
    }
  };

  const handleEditClick = (rowData) => {
    console.log("Edit clicked for row:", rowData);
    dispatch(updateData(rowData));
  };

  const handleDeleteClick = (rowData) => {
    console.log("Delete clicked for row:", rowData);
    dispatch(deleteData(rowData));
  };

  return (
    <div className="App">
      <h4 align="center">Aimbrill full stack task</h4>
      <button onClick={handleUploadButtonClick}>Upload</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the file input visually
        onChange={importExcel}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button>Chart</button>
        <br />
      </div>

      <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {colDefs &&
                  colDefs.map((colDef) => (
                    <TableCell key={colDef.field}>{colDef.title}</TableCell>
                  ))}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsData &&
                rowsData.map((row, index) => (
                  <TableRow key={index}>
                    {colDefs &&
                      colDefs.map((colDef) => (
                        <TableCell key={colDef.field}>
                          {row[colDef.field]}
                        </TableCell>
                      ))}
                    <TableCell style={{ width: "100px" }}>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditClick(row)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteClick(row)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  );
}

export default UserTable;
