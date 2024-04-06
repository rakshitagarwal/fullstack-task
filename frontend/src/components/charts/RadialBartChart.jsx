import React from 'react';
import Chart from 'react-apexcharts';

const RadialBarChart = ({ data }) => {
  const options = {
    labels: data.labels,
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              // By default, the 'w' parameter contains the total value. You can format it here if needed.
              return data.total || '';
            }
          }
        }
      }
    }
  };

  return (
    <Chart
      options={options}
      series={data.series}
      type="radialBar"
      width="100%"
    />
  );
};

export default RadialBarChart;
