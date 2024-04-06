import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({ data }) => {
  const options = {
    labels: data.labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <Chart
      options={options}
      series={data.series}
      type="pie"
      width="100%"
    />
  );
};

export default PieChart;
