import React from 'react';
import { Grid } from '@mui/material';
import { TimeTable } from '../../../Components/TimeTable';
import { StaffTable } from '../../../Components/StaffTable';
import { useGetTeacherDataQuery } from '../teachersApiSlice';
import Loading from '../../../Components/Loading';
import Error from '../../../Components/Error';
import { useParams } from 'react-router-dom';
import { CardWrapper } from '../../../Components/CardWrapper';

// Main Function
export const TimeTableBox = () => {
  const { classId } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetTeacherDataQuery(classId);

  let content;

  const timeTableData = data?.timetable;
  const staffData = data?.staff;
  // console.log(data);

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
            <StaffTable data={staffData} />
          </CardWrapper>
        </Grid>
      </Grid>
    );
  } else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
