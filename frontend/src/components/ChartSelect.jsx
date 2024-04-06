import React, { useState } from "react";
import {
  Modal,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";

const ChartSelect = ({ isOpen, dataset, onClose, onInputSubmit }) => {
  const [step, setStep] = useState(1);
  const [selectedChart, setSelectedChart] = useState(null);
  const [widgetTitle, setWidgetTitle] = useState("");
  const [dataType, setDataType] = useState("");
  const [field, setField] = useState("");

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleSubmit = () => {
    const chartPopup = {
      chart: Number(selectedChart),
      widgetTitle: widgetTitle,
      dataType: dataType,
      field: field,
    };
    onInputSubmit(chartPopup); // Submit the selected chart type
    setSelectedChart(null);
    setWidgetTitle("");
    setDataType("");
    setField("");

    setStep(1);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        }}
      >
        {step === 1 && (
          <div>
            <h2>Select Chart</h2>
            <RadioGroup
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value)}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Pie Chart"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Line Chart"
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label="Donut Chart"
              />
              <FormControlLabel
                value={4}
                control={<Radio />}
                label="Single Column Chart"
              />
              <FormControlLabel
                value={5}
                control={<Radio />}
                label="Bar Chart"
              />
              <FormControlLabel
                value={6}
                control={<Radio />}
                label="Radial Bar Chart"
              />
              <FormControlLabel
                value={7}
                control={<Radio />}
                label="Semi Circle Gauge"
              />
            </RadioGroup>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2>Chart Settings</h2>
            <TextField
              label="Widget Title"
              value={widgetTitle}
              onChange={(e) => setWidgetTitle(e.target.value)}
              fullWidth
            />
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Data Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dataType}
                label="Select Data Type"
                onChange={(event) => {
                  setDataType(event.target.value);
                }}
              >
                <MenuItem value={dataset}>{dataset}</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Field
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={field}
                label="Select Field"
                onChange={(event) => {
                  setField(event.target.value);
                }}
              >
                <MenuItem value={"Field 1"}>Field 1</MenuItem>
                <MenuItem value={"Field 2"}>Field 2</MenuItem>
                <MenuItem value={"Field 3"}>Field 3</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ChartSelect;
