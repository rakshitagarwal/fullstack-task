import React from "react";
import Chart from "react-apexcharts";

const DoughnutChart = ({ chartName, selected, columns, rowsData }) => {
  console.log("selected", selected);
  console.log("colDefs", columns);
  console.log("rowsData", rowsData);

  const chartData = {
    labels: ["Team A", "Team B", "Team C", "Team D"],
    series: [44, 55, 13, 43],
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
      type="donut"
      width="100%"
    />
    </div>
  );
};

export default DoughnutChart;
