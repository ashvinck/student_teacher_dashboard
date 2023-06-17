import React from 'react';
import { useGetTeacherDataQuery } from '../teachersApiSlice';
import Loading from '../../../Components/Loading';
import { TeacherCalendar } from './TeacherCalendar';
import { Events } from '../../../Components/Events';
import { Grid } from '@mui/material';
import Error from '../../../Components/Error';
import { useParams } from 'react-router-dom';

export const TeacherCalendarContainer = () => {
  const { classId } = useParams();

  const { data, isLoading, isSuccess, isError, error } =
    useGetTeacherDataQuery(classId);

  // Filtering event Data
  const events = data?.events;

  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />;
  } else if (isSuccess) {
    content = (
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TeacherCalendar events={events} />
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
