import React from 'react';
import Chart from 'react-apexcharts';

const ColumnChart = () => {
  const data = 42;
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
