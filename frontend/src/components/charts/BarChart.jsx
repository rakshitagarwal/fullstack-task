import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({selected, columns, rowsData}) => {
  console.log('selected',selected);
  console.log('colDefs',columns);
  console.log('rowsData',rowsData);

  const chartData = {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 45, 50, 49]
      },
      {
        name: 'Series 2',
        data: [35, 45, 50, 55, 60]
      }
    ]
  };

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
      categories: chartData.categories,
    },
  };

  return (
    <Chart
      options={options}
      series={chartData.series}
      type="bar"
      height={350}
    />
  );
};

export default BarChart;
