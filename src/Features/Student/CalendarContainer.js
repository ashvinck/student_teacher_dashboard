import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useGetStudentDataQuery } from './studentApiSlice';
import Loading from '../../Components/Loading';
import Error from '../../Components/Error';
import { Calendar } from './Calendar';
import { Events } from '../../Components/Events';

export const CalendarContainer = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters
  // Query hook for fetching studentData
  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentDataQuery(classId);

  // Filtering Events Data
  const { events } = data || {};

  let content;
  if (isLoading) {
    content = <Loading open={isLoading} />; // Show loading state while fetching data
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
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
  }
  // Show error message if there's an error fetching data
  else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
