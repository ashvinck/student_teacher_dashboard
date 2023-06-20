import React from 'react';
import { useGetTeacherDataQuery } from '../teachersApiSlice';
import Loading from '../../../Components/Loading';
import { TeacherCalendar } from './TeacherCalendar';
import { Events } from '../../../Components/Events';
import { Grid } from '@mui/material';
import Error from '../../../Components/Error';
import { useParams } from 'react-router-dom';

// TeacherCalendar component
// Renders the Teacher container based on the classId
export const TeacherCalendarContainer = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  // Fetch teacher data based on the classId
  const { data, isLoading, isSuccess, isError, error } =
    useGetTeacherDataQuery(classId);

  // Filtering event Data
  const { events } = data || {};

  let content;

  // Show loading state while fetching data
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
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
  }
  // Show error message if there's an error fetching data
  else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
