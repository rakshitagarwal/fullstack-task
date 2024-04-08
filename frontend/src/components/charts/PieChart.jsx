import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ chartName, selected, columns, rowsData }) => {
  console.log("selected", selected);
  console.log("colDefs", columns);
  console.log("rowsData", rowsData);

  const chartData = {
    labels: ["January", "February", "March", "April", "May"],
    series: [44, 55, 13, 43, 22],
  };

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
      series={chartData.series}
      type="pie"
      width="100%"
    />
    </div>
  );
};

export default PieChart;
