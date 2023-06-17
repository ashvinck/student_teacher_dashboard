import { Box } from '@mui/material';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export const DoughnutChart = ({ abscissa, ordinate, title }) => {
  const type = {
    type: 'doughnut',
  };
  const labels = abscissa;

  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        backgroundColor: ['#2196f3', '#f44336'],
        hoverBackgroundColor: ['#4e73df', '#ff1744'],
        hoverBorderColor: 'rgba(234, 236, 244, 1)',
        data: ordinate,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        title: {
          text: 'Attendance Today',
        },
      },
      tooltip: {
        backgroundColor: 'rgb(255, 255, 255)',
        bodyColor: 'rgb(133, 135, 150)',
        borderColor: 'rgb(221, 223, 235)',
        titleColor: '#6e707e',
        titleFont: { weight: 'bold' },
        titleMarginBottom: 10,
        borderWidth: 1,
        padding: 15,
        displayColors: false,
        caretPadding: 10,
      },
    },
    cutout: '80%',
  };

  return (
    <Box sx={{ height: '320px' }}>
      <Doughnut
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
