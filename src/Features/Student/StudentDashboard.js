import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { useGetStudentDataQuery } from './studentApiSlice';
import Loading from '../../Components/Loading';
import Error from '../../Components/Error';
import { SummaryBox } from '../../Components/Boxes/SummaryBox';
import { AttendanceCharts } from '../../Components/Boxes/AttendanceCharts';
import { ResultsChart } from '../../Components/Boxes/ResultsChart';
import { Timetable } from './Timetable';

const StudentDashboard = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  // Query hook for fetching studentData
  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentDataQuery(classId);

  // Filtering Data from API response
  const { miscellaneousInfo, attendance, results, studentInfo } = data || {};
  const totalStudents = studentInfo?.length;

  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />; // Show loading state while fetching data
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <Box sx={{ mt: 2 }}>
        <SummaryBox data={miscellaneousInfo} />
        <AttendanceCharts data={attendance} />
        <ResultsChart data={results} students={totalStudents} />
        <Timetable />
      </Box>
    );
  }
  // Show error message if there's an error fetching data
  else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};

export default StudentDashboard;
