import React from 'react';
import { Grid } from '@mui/material';

import { useGetStudentDataQuery } from './studentApiSlice';
import Loading from '../../Components/Loading';
import { TimeTable } from '../../Components/TimeTable';
import { StaffTable } from '../../Components/StaffTable';
import Error from '../../Components/Error';
import { CardWrapper } from '../../Components/CardWrapper';

export const Timetable = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentDataQuery();
  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />;
  } else if (isSuccess) {
    content = (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <CardWrapper title='Time Table'>
            <TimeTable data={data} />
          </CardWrapper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <CardWrapper title='Staff Table'>
            <StaffTable data={data} />
          </CardWrapper>
        </Grid>
      </Grid>
    );
  } else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
