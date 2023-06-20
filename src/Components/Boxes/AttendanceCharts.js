import React from 'react';
import dayjs from 'dayjs';
import { Grid } from '@mui/material';

import { CardWrapper } from '../CardWrapper';
import { AbsentList } from '../AbsentList';
import { LineChart } from '../Charts/LineChart';

export const AttendanceCharts = ({ data }) => {
  // Filtering data for the past 30 days
  const filteredData = data?.filter(({ date }) => {
    const currentDate = dayjs();
    const thirtyDaysAgo = currentDate.subtract(30, 'day');

    const itemDate = dayjs(date, 'DD/MMM/YYYY');
    return (
      itemDate.isAfter(thirtyDaysAgo) || itemDate.isSame(thirtyDaysAgo, 'day')
    );
  });

  // For Attendance Chart
  const dates = filteredData?.map(({ date }) => date);
  const percent = filteredData?.map(
    ({ attendancePercentage }) => attendancePercentage
  );
  const title = 'Attendance Percentage';

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}>
        <CardWrapper title='Attendance Analysis'>
          <LineChart abscissa={dates} ordinate={percent} title={title} />
        </CardWrapper>
      </Grid>
      <Grid item xs={12} lg={4}>
        <CardWrapper title='Absentees Today'>
          <AbsentList data={data} />
        </CardWrapper>
      </Grid>
    </Grid>
  );
};
