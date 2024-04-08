import React from "react";
import Chart from "react-apexcharts";

const RadialBarChart = ({ chartName, selected, columns, rowsData }) => {
  console.log("selected", selected);
  console.log("colDefs", columns);
  console.log("rowsData", rowsData);

  // Extracting labels and series from props
  const labels = rowsData.map((data) => data[columns[0]]); // Assuming the first column is used for labels
  const series = rowsData.map((data) => data[selected]); // Using the selected column for series data

  const chartData = {
    labels: labels,
    series: series,
    total: series.reduce((total, value) => total + value, 0), // Calculate total from series values
  };

  const options = {
    labels: chartData.labels,
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              // By default, the 'w' parameter contains the total value. You can format it here if needed.
              return chartData.total || "";
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>{chartName}</h2>
      <Chart
        options={options}
        series={chartData.series}
        type="radialBar"
        width="100%"
      />
    </div>
  );
};

export default RadialBarChart;
