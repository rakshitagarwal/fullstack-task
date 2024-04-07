import React from "react";
import Chart from "react-apexcharts";

const ColumnChart = ({ chartName, selected, columns, rowsData }) => {
  // Filter rowsData based on the selected column
  const filteredData = rowsData.map((row) => row[selected]);

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: columns[selected], // Use the selected column as categories
    },
  };

  return (
    <div>
      <h2>{chartName}</h2>
      <Chart
        options={options}
        series={[{ data: filteredData }]} // Use filteredData as the data for the series
        type="bar"
        height={350}
        />
        </div>
  );
};

export default ColumnChart;
