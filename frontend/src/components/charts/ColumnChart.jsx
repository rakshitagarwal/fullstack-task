import React from 'react';
import Chart from 'react-apexcharts';

const ColumnChart = ({ data }) => {
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
      categories: ['Category'],
    },
  };

  return (
    <Chart
      options={options}
      series={[{ data: [data] }]}
      type="bar"
      height={350}
    />
  );
};

export default ColumnChart;
