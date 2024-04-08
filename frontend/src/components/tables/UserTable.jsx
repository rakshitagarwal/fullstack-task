import React, { useEffect, useRef, useState } from "react";
import XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import ChartSelect from "../modals/ChartSelect";
import { createData, readData, insertRow } from "../../redux/excelSlice";
import { Button } from "@mui/material";
import AddRow from "../modals/AddRow";
import PieChart from "../charts_props/PieChart";
import LineChart from "../charts_props/LineChart";
import DoughnutChart from "../charts_props/DoughnutChart";
import ColumnChart from "../charts_props/ColumnChart";
import BarChart from "../charts_props/BarChart";
import RadialBarChart from "../charts_props/RadialBartChart";
import SemiCircleGaugeChart from "../charts_props/SemiCircleGauge";
import FileTable from "./FileTable";

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

function UserTable({ tableName, datatypeName }) {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.excel);
  console.log("global data array", data);
  const [colDefs, setColDefs] = useState(null);
  const [rowsData, setData] = useState(null);
  const [chart, setChart] = useState(null);
  const [chartName, setChartName] = useState(null);
  const [field, setField] = useState(null);
  const [columns, setColumns] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isAddPopup, setAddPopup] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const fileInputRef = useRef(null);

  const getExention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension);
  };

  const convertToJSON = (headers, rowsData) => {
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
      if (!fileData[fileData.length - 1].length) fileData.pop();
      const convertedData = convertToJSON(headers, fileData);
      setData(convertedData);
      setColumns(headers);
      dispatch(createData({ headers, rows: convertedData, tableName, datatypeName }));
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

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChartInput = (input) => {
    setChart(input.chart);
    setField(input.field);
    setChartName(input.widgetTitle);
  };

  const handleAddInput = (input) => {
    dispatch(insertRow({ tableName, datatypeName, value: input }));
  };

  const openChartModal = () => {
    setPopupVisible(true);
  };

  const closeChartModal = () => {
    setPopupVisible(false);
  };

  const openAddModal = () => {
    setAddPopup(true);
  };

  const closeAddModal = () => {
    setAddPopup(false);
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
              {colDefs ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={openAddModal}
                  >
                    Add Row
                  </Button>&nbsp;&nbsp;
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={openChartModal}
                  >
                    Chart
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
          <br />
          {colDefs ? (
            <FileTable
              colDefs={colDefs}
              rowsData={rowsData}
              tableName={tableName}
              datatypeName={datatypeName}
            />
          ) : (
            <h2 style={{ textAlign: "center" }}>No Data</h2>
          )}
          {ChartComponent && (
            <div style={{ width: "450px", height: "350px" }}>
              <br />
              <br />
              <ChartComponent
                chartName={chartName}
                selected={field}
                columns={columns}
                rowsData={rowsData}
              />
            </div>
          )}
        </>
      )}

      <ChartSelect
        isOpen={isPopupVisible}
        dataset={datatypeName}
        columns={columns}
        onClose={closeChartModal}
        onInputSubmit={handleChartInput}
      />
      <AddRow
        isOpen={isAddPopup}
        onClose={closeAddModal}
        onInputSubmit={handleAddInput}
        columns={columns}
      />
    </div>
  );
}

export default UserTable;
