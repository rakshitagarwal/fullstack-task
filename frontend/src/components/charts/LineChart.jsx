import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ chartName, selected, columns, rowsData }) => {
  console.log("selected", selected);
  console.log("colDefs", columns);
  console.log("rowsData", rowsData);

  const chartData = {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    series: [
      {
        name: "Series 1",
        data: [30, 40, 35, 50, 49, 60],
      },
    ],
  };

  const options = {
    chart: {
      id: "basic-line",
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
      type="line"
      width="100%"
    />
    </div>
  );
};

export default LineChart;
