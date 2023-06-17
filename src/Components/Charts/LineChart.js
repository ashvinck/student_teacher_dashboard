import React from 'react';
import { Line } from 'react-chartjs-2';
import { registerables, Chart } from 'chart.js';
import { Box } from '@mui/material';
Chart.register(...registerables);

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
    dec = typeof dec_point === 'undefined' ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

export const LineChart = ({ abscissa, ordinate, title }) => {
  const type = {
    type: 'line',
  };

  // Y axis labels
  const labels = abscissa;

  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        lineTension: 0.3,
        backgroundColor: 'rgba(78, 115, 223, 0.05)',
        borderColor: 'rgba(78, 115, 223, 1)',
        pointRadius: 3,
        pointBackgroundColor: 'rgba(78, 115, 223, 1)',
        pointBorderColor: 'rgba(78, 115, 223, 1)',
        pointHoverRadius: 3,
        pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
        pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
        pointHitRadius: 10,
        pointBorderWidth: 2,
        fill: 'origin',
        // X axis elements
        data: ordinate,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 25,
      },
    },
    scales: {
      x: {
        time: {
          unit: 'date',
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 7,
          color: '#9e9e9e',
        },
        // maxBarThickness: 25,
      },
      y: {
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          color: '#9e9e9e',
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return number_format(value) + '%';
          },
        },
        grid: {
          color: 'rgb(234, 236, 244)',
        },
        border: {
          display: false,
          dash: [2],
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgb(255, 255, 255)',
        bodyColor: 'rgb(133, 135, 150)',
        titleMarginBottom: 10,
        titleColor: '#6e707e',
        titleFont: { weight: 'bold' },
        borderColor: 'rgb(221, 223, 235)',
        borderWidth: 1,
        padding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
          label: function (tooltipItem) {
            var datasetLabel = tooltipItem.dataset.label || '';
            var value = tooltipItem.parsed.y;
            return datasetLabel + ': ' + number_format(value, 2, '.', ' ');
          },
        },
      },
    },
  };

  return (
    <Box sx={{ height: '320px' }}>
      <Line
        data={data}
        options={options}
        type={type}
        abscissa={abscissa}
        ordinate={ordinate}
        title={title}
      />
    </Box>
  );
};
