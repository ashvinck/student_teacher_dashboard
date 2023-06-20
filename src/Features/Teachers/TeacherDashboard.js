import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { useGetTeacherDataQuery } from './teachersApiSlice';
import Loading from '../../Components/Loading';
import Error from '../../Components/Error';
import { SummaryBox } from '../../Components/Boxes/SummaryBox';
import { AttendanceCharts } from '../../Components/Boxes/AttendanceCharts';
import { ResultsChart } from '../../Components/Boxes/ResultsChart';
import { TimeTableBox } from './TimeTable/TimeTableBox';

const TeacherDashboard = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  // Query hook for fetching studentData
  const { data, isLoading, isSuccess, isError, error } =
    useGetTeacherDataQuery(classId);

  //Filtering data from API response
  const { miscellaneousInfo, attendance, results, studentInfo } = data || {};
  const totalStudents = studentInfo?.length;

  let content;

  // Show loading state while fetching data
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <Box sx={{ mt: 2 }}>
        <SummaryBox data={miscellaneousInfo} />
        <AttendanceCharts data={attendance} />
        <ResultsChart data={results} students={totalStudents} />
        <TimeTableBox />
      </Box>
    );
  }
  // Show error message if there's an error fetching data
  else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};

export default TeacherDashboard;
