import React, { useRef, useState } from "react";
import "./App.css";
// import MaterialTable from "material-table";
import XLSX from "xlsx";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const theme = createMuiTheme({
  overrides: {
    MuiTable: {
      root: {
        border: "1px solid rgba(224, 224, 224, 1)",
        "& .MuiTableCell-head": {
          fontSize: "0.875rem",
          fontWeight: "bold",
          color: "rgba(0, 0, 0, 0.87)",
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
        },
        "& .MuiTableCell-body": {
          fontSize: "0.875rem",
          color: "rgba(0, 0, 0, 0.87)",
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
        },
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
    },
    MuiTableBody: {
      root: {
        fontSize: "0.875rem",
      },
    },
    MuiTableRow: {
      root: {
        height: "32px",
      },
    },
    MuiTableCell: {
      root: {
        borderRight: "1px solid rgba(224, 224, 224, 1)",
        padding: "6px 16px",
      },
    },
  },
});

const EXTENSIONS = ["xlsx", "xls", "csv"];
function App() {
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();
  const fileInputRef = useRef(null);

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  const getExention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension); // return boolean
  };

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
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

      setData(convertToJson(headers, fileData));
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

  // return (
  //   <div className="App">
  //     <h4 align="center">Import Data from Excel, CSV in Material Table</h4>
  //     <button onClick={handleUploadButtonClick}>Upload</button>
  //     <input
  //       type="file"
  //       ref={fileInputRef}
  //       style={{ display: "none" }} // Hide the file input visually
  //       onChange={importExcel}
  //     />
  //     <MaterialTable title="Olympic Data" data={data} columns={colDefs} />
  //   </div>
  // );
  
  return (
    <div className="App">
      <h4 align="center">Import Data from Excel, CSV in Material Table</h4>
      <button onClick={handleUploadButtonClick}>Upload</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the file input visually
        onChange={importExcel}
      />
      <br />
      <ThemeProvider theme={theme}>
        {console.log(data)}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>{colDefs && colDefs.map((colDef) => <TableCell key={colDef.field}>{colDef.title}</TableCell>)}</TableRow>
            </TableHead>
            <TableBody>
              {data && data.map((row, index) => (
                <TableRow key={index}>
                  {colDefs && colDefs.map((colDef) => <TableCell key={colDef.field}>{row[colDef.field]}</TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  );
}

export default App;
