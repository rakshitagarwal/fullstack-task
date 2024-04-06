import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({ data }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: data.categories,
    },
  };

  return (
    <Chart
      options={options}
      series={data.series}
      type="bar"
      height={350}
    />
  );
};

export default BarChart;
