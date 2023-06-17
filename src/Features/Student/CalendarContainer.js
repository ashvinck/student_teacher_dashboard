import React from 'react';
import { useGetStudentDataQuery } from './studentApiSlice';
import Loading from '../../Components/Loading';
import { Grid } from '@mui/material';
import { Calendar } from './Calendar';
import { Events } from '../../Components/Events';
import Error from '../../Components/Error';

export const CalendarContainer = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentDataQuery();

  const events = data?.events;

  let content;
  if (isLoading) {
    content = <Loading open={isLoading} />;
  } else if (isSuccess) {
    content = (
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Calendar events={events} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Events events={events} />
        </Grid>
      </Grid>
    );
  } else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
