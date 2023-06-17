import React from 'react';
import { Box } from '@mui/material';
import { useGetStudentDataQuery } from './studentApiSlice';
import Loading from '../../Components/Loading';
import Error from '../../Components/Error';
import { PageTitle } from '../../Components/PageTitle';
import { SummaryBox } from '../../Components/Boxes/SummaryBox';
import { AttendanceCharts } from '../../Components/Boxes/AttendanceCharts';
import { ResultsChart } from '../../Components/Boxes/ResultsChart';
import { Timetable } from './Timetable';

const StudentDashboard = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentDataQuery();

  const miscellaneousData = data?.miscellaneousInfo;
  const attendanceData = data?.attendance;
  const resultsData = data?.results;
  const totalStudents = data?.studentInfo.length;

  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />;
  } else if (isSuccess) {
    content = (
      <>
        <PageTitle title={`Class ${data.classId}`} />
        <Box>
          <SummaryBox data={miscellaneousData} />
          <AttendanceCharts data={attendanceData} />
          <ResultsChart data={resultsData} students={totalStudents} />
          <Timetable />
        </Box>
      </>
    );
  } else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
export default StudentDashboard;
