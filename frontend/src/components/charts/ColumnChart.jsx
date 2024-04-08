import React from "react";
import Chart from "react-apexcharts";

const ColumnChart = ({ chartName, selected, columns, rowsData }) => {
  console.log("selected", selected);
  console.log("colDefs", columns);
  console.log("rowsData", rowsData);

  const chartData = 42;
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
      categories: [`Category`],
    },
  };

  return (
    <div>
      <h2>{chartName}</h2>
    <Chart
      options={options}
      series={[{ data: [chartData] }]}
      type="bar"
      height={350}
    />
    </div>
  );
};

export default ColumnChart;
