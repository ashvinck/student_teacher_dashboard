import React from 'react';
import { Grid } from '@mui/material';

import { useGetStudentDataQuery } from './studentApiSlice';
import Loading from '../../Components/Loading';
import { TimeTable } from '../../Components/TimeTable';
import { StaffTable } from '../../Components/StaffTable';
import Error from '../../Components/Error';
import { CardWrapper } from '../../Components/CardWrapper';
import { useParams } from 'react-router-dom';

export const Timetable = () => {
  const { classId } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentDataQuery(classId);
  let content;

  const timeTableData = data?.timetable;
  const staffTableData = data?.staff;

  if (isLoading) {
    content = <Loading open={isLoading} />;
  } else if (isSuccess) {
    content = (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <CardWrapper title='Time Table'>
            <TimeTable data={timeTableData} />
          </CardWrapper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <CardWrapper title='Staff Table'>
            <StaffTable data={staffTableData} />
          </CardWrapper>
        </Grid>
      </Grid>
    );
  } else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
