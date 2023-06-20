import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

import { useGetStudentDataQuery } from './studentApiSlice';
import Loading from '../../Components/Loading';
import { TimeTable } from '../../Components/TimeTable';
import { StaffTable } from '../../Components/StaffTable';
import Error from '../../Components/Error';
import { CardWrapper } from '../../Components/CardWrapper';

/**
 * Component for displaying the timetable and staff table.
 * Uses the useGetStudentDataQuery hook to fetch data.
 */
export const Timetable = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  // Get Student Query Hook
  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentDataQuery(classId);

  let content;

  // Filtering Timetable and staffData
  const { timetable, staff } = data || {};

  if (isLoading) {
    content = <Loading open={isLoading} />; // Show loading state while fetching data
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <CardWrapper title='Time Table'>
            <TimeTable data={timetable} />
          </CardWrapper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <CardWrapper title='Staff Table'>
            <StaffTable data={staff} />
          </CardWrapper>
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
