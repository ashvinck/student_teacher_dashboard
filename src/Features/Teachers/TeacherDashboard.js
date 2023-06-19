import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { useGetTeacherDataQuery } from './teachersApiSlice';
import Loading from '../../Components/Loading';
import Error from '../../Components/Error';
import { PageTitle } from '../../Components/PageTitle';
import { SummaryBox } from '../../Components/Boxes/SummaryBox';
import { AttendanceCharts } from '../../Components/Boxes/AttendanceCharts';
import { ResultsChart } from '../../Components/Boxes/ResultsChart';
import { TimeTableBox } from './TimeTable/TimeTableBox';

const TeacherDashboard = () => {
  const { classId } = useParams();
  //Fetching Data
  const { data, isLoading, isSuccess, isError, error } =
    useGetTeacherDataQuery(classId);

  //Filtering data for various components
  const miscellaneousData = data?.miscellaneousInfo;
  const attendanceData = data?.attendance;
  const resultsData = data?.results;
  const totalStudents = data?.studentInfo.length;

  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />;
  } else if (isSuccess) {
    content = (
      <Box sx={{ mt: 2 }}>
        <SummaryBox data={miscellaneousData} />
        <AttendanceCharts data={attendanceData} />
        <ResultsChart data={resultsData} students={totalStudents} />
        <TimeTableBox />
      </Box>
    );
  } else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};

export default TeacherDashboard;
