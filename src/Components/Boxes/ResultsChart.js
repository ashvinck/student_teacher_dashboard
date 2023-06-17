import { Grid } from '@mui/material';
import React from 'react';
import { CardWrapper } from '../CardWrapper';
import { LineChart } from '../Charts/LineChart';
import { DoughnutChart } from '../Charts/Doughtnut';

export const ResultsChart = ({ data, students }) => {
  const exam = data?.map((res) => res.examType);
  const percent = data?.map((res) => res.passPercentage);

  const percentages = percent.map(Number);

  const cumulativePassRate = percentages.reduce(
    (acc, percent) => acc + percent,
    0
  );
  const avgPassRate = (cumulativePassRate / percent.length).toFixed(2);
  const failRate = 100 - avgPassRate;
  const labels = ['Will graduate', 'Will not graduate'];
  const graduationData = [avgPassRate, failRate];
  const lineChartTitle = 'Pass Percentage';
  const doughnutTitle = 'Percentage';

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={4}>
        <CardWrapper title='Graduation Rate'>
          <DoughnutChart
            abscissa={labels}
            ordinate={graduationData}
            title={doughnutTitle}
          />
        </CardWrapper>
      </Grid>
      <Grid item xs={12} lg={8}>
        <CardWrapper title='Results Analysis'>
          <LineChart
            abscissa={exam}
            ordinate={percent}
            title={lineChartTitle}
          />
        </CardWrapper>
      </Grid>
    </Grid>
  );
};
