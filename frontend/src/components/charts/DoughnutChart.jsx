import React from 'react';
import Chart from 'react-apexcharts';

const DoughnutChart = ({ data }) => {
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
      type="donut"
      width="100%"
    />
  );
};

export default DoughnutChart;
