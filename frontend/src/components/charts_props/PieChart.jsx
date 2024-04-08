import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ chartName, selected, columns, rowsData }) => {
  console.log("selected", selected);
  console.log("colDefs", columns);
  console.log("rowsData", rowsData);

  // Initialize an empty object to store data for the chart
  const chartData = {
    labels: [],
    series: [],
  };

  // Iterate through each row of data
  rowsData.forEach((row) => {
    // Push the label for this row (assuming it's the selected column)
    chartData.labels.push(row[selected]);

    // Initialize an empty array to store series data for this row
    const rowDataSeries = [];

    // Iterate through each column to get the corresponding value for this row
    columns.forEach((column) => {
      // Skip the selected column as it's used for labels
      if (column !== selected) {
        // Push the value for this column in the current row
        rowDataSeries.push(row[column]);
      }
    });

    // Push the series data for this row to the chartData
    chartData.series.push(rowDataSeries);
  });

  const options = {
    labels: chartData.labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div>
      <h2>{chartName}</h2>
      <Chart
        options={options}
        series={chartData.series.flat()} // Flatten the series array
        type="pie"
        width="100%"
      />
    </div>
  );
};

export default PieChart;
