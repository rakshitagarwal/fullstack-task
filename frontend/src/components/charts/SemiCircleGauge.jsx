import React from "react";
import Chart from "react-apexcharts";

const SemiCircleGaugeChart = ({ chartName, selected, columns, rowsData }) => {
  console.log("selected", selected);
  console.log("colDefs", columns);
  console.log("rowsData", rowsData);

  const chartData = 70; // Example value for the gauge chart

  const options = {
    chart: {
      type: "radialBar",
      height: 350,
      offsetX: -10,
      offsetY: -20,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: "70%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 25,
            fontSize: "22px",
            color: "#1e88e5",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#FFD700"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: ["Progress"],
  };

  return (
    <div>
    <h2>{chartName}</h2>
    <Chart
      options={options}
      series={[chartData]}
      type="radialBar"
      width="100%"
    />
    </div>
  );
};

export default SemiCircleGaugeChart;
