import React from 'react';
import Chart from 'react-apexcharts';

const DoughnutChart = ({ chartName, selected, columns, rowsData }) => {
  console.log('selected', selected);
  console.log('colDefs', columns);
  console.log('rowsData', rowsData);

  // Extracting labels from rowsData based on the selected column
  const labels = rowsData.map(row => row[selected]);

  // Extracting series data from rowsData based on all columns
  const series = columns.map(column => {
    return rowsData.reduce((acc, row) => {
      acc.push(row[column]);
      return acc;
    }, []);
  });

  const chartData = {
    labels: labels,
    series: series
  };

  const options = {
    labels: chartData.labels,
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
    <div>
    <h2>{chartName}</h2>
    <Chart
      options={options}
      series={chartData.series}
      type="donut"
      width="100%"
    />
    </div>
  );
};

export default DoughnutChart;
