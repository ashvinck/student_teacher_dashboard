import { Grid } from '@mui/material';
import React from 'react';
import { CardWrapper } from '../CardWrapper';
import { AbsentList } from '../AbsentList';
import dayjs from 'dayjs';
import { LineChart } from '../Charts/LineChart';

export const AttendanceCharts = ({ data }) => {
  // Filtering data for the past 30 days
  const filteredData = data.filter((item) => {
    const date = dayjs(item.date, 'DD/MMM/YYYY');
    const currentDate = dayjs();
    const thirtyDaysAgo = currentDate.subtract(30, 'day');

    return date.isAfter(thirtyDaysAgo) || date.isSame(thirtyDaysAgo, 'day');
  });
  // For Attendance Chart
  const dates = filteredData?.map((res) => res.date);
  const percent = filteredData?.map((res) => res.attendancePercentage);
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
