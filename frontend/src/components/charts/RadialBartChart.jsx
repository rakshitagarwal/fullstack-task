import React from "react";
import Chart from "react-apexcharts";

const RadialBarChart = ({ chartName, selected, columns, rowsData }) => {
  console.log("selected", selected);
  console.log("colDefs", columns);
  console.log("rowsData", rowsData);

  const chartData = {
    labels: ["Series 1", "Series 2", "Series 3", "Series 4"],
    series: [44, 55, 67, 83],
    total: 249, // Total value of all series, used in dataLabels.total formatter
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
