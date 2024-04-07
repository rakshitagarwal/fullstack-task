import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ chartName, selected, columns, rowsData }) => {
  console.log("selected", selected);
  console.log("colDefs", columns);
  console.log("rowsData", rowsData);

  // Dynamically generate chartData based on props
  const chartData = {
    categories: rowsData.map((row) => row[selected]),
    series: columns.map((col) => ({
      name: col,
      data: rowsData.map((row) => row[col]),
    })),
  };

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
      categories: chartData.categories,
    },
  };

  return (
    <div>
      <h2>{chartName}</h2>
      <Chart
        options={options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
