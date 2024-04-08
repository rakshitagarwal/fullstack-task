import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ chartName, selected, columns, rowsData }) => {
  console.log("selected", selected);
  console.log("colDefs", columns);
  console.log("rowsData", rowsData);

  // Extract categories from rowsData
  const categories = rowsData.map((data) => data[columns[0]]);

  // Extract series data based on selected column
  const seriesData = rowsData.map((data) => data[selected]);

  const chartData = {
    categories: categories,
    series: [
      {
        name: selected,
        data: seriesData,
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
