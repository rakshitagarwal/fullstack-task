import React, { useEffect, useRef, useState } from "react";
import XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
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
import ChartSelect from "./ChartSelect";
import {
  createData,
  showData,
  updateData,
  deleteData,
} from "../redux/excelSlice";
import theme from "../utils/theme";
import { Button } from "@mui/material";
import "../App.css";
import PieChart from "./charts/PieChart";
import LineChart from "./charts/LineChart";
import DoughnutChart from "./charts/DoughnutChart";
import ColumnChart from "./charts/ColumnChart";
import BarChart from "./charts/BarChart";
import RadialBarChart from "./charts/RadialBartChart";
import SemiCircleGaugeChart from "./charts/SemiCircleGauge";

const EXTENSIONS = ["xlsx", "xls", "csv"];

const chartComponents = {
  1: PieChart,
  2: LineChart,
  3: DoughnutChart,
  4: ColumnChart,
  5: BarChart,
  6: RadialBarChart,
  7: SemiCircleGaugeChart,
};

function UserTable({tableName, datatypeName }) {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.excel);
  console.log("state excel data: " + data, status);

  const [colDefs, setColDefs] = useState();
  const [rowsData, setData] = useState();
  const [chart, setChart] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(showData());
  }, [dispatch]);

  const getExention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension);
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
      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      const headers = fileData[0];
      const heads = headers.map((head) => ({ title: head, field: head }));
      setColDefs(heads);
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

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChartInput = (input) => {
    console.log("chartpopup", input);
    setChart(input.chart);
  };

  const openChartModal = () => {
    setPopupVisible(true);
  };

  const closeChartModal = () => {
    setPopupVisible(false);
  };

  const toggleAccordion = () => {
    setIsCollapsed(!isCollapsed);
  };

  const ChartComponent = chartComponents[chart];

  return (
    <div
      className="user-table-container"
      style={{ padding: "20px", border: "1px solid #ccc", paddingTop: "60px" }}
    >
      <Button variant="contained" color="secondary" onClick={toggleAccordion}>
        {isCollapsed ? `${tableName}` : `${tableName}`}
      </Button>
      {!isCollapsed && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ marginLeft: "auto", marginRight: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUploadButtonClick}
              >
                Upload
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={importExcel}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={openChartModal}
            >
              Chart
            </Button>
          </div>
          <br />
          <ThemeProvider theme={theme}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {colDefs &&
                      colDefs.map((colDef) => (
                        <TableCell key={colDef.field}>{colDef.title}</TableCell>
                      ))}
                    {colDefs && <TableCell>Action</TableCell>}
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
                          {Object.keys(row).length !== 0 && (
                            <>
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
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ThemeProvider>
          {ChartComponent && <ChartComponent />}
        </>
      )}

      {/* Chart Modal */}
      <ChartSelect
        isOpen={isPopupVisible}
        dataset={datatypeName}
        onClose={closeChartModal}
        onInputSubmit={handleChartInput}
      />
    </div>
  );
}

export default UserTable;
