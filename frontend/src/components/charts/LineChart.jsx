import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({ data }) => {
  const options = {
    chart: {
      id: 'basic-line'
    },
    xaxis: {
      categories: data.categories
    }
  };

  return (
    <Chart
      options={options}
      series={data.series}
      type="line"
      width="100%"
    />
  );
};

export default LineChart;
