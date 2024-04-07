import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({selected, columns, rowsData}) => {
  console.log('selected',selected);
  console.log('colDefs',columns);
  console.log('rowsData',rowsData);

  const chartData = {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [{
      name: 'Series 1',
      data: [30, 40, 35, 50, 49, 60]
    }]
  };

  const options = {
    chart: {
      id: 'basic-line'
    },
    xaxis: {
      categories: chartData.categories
    }
  };

  return (
    <Chart
      options={options}
      series={chartData.series}
      type="line"
      width="100%"
    />
  );
};

export default LineChart;
