import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetClassDataQuery } from '../adminApiSlice';
import Loading from '../../../Components/Loading';
import Error from '../../../Components/Error';
import { AdminCardWrapper } from '../../../Components/AdminCardWrapper';
import { TimeTable } from '../../../Components/TimeTable';
import { UpdateTimetable } from './UpdateTimetable';

// TimeTableContainer component
// Renders the TimeTable container based on the classId
export const AdminTimeTable = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  // Fetching data based on the classId
  const { data, isLoading, isSuccess, isError, error } =
    useGetClassDataQuery(classId);

  // Filtering timetable data
  const { timetable } = data || {};

  let content;

  // Show loading state while fetching data
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <AdminCardWrapper
        title='Time Table'
        dialogChildren={<UpdateTimetable data={timetable} />}
        children={<TimeTable data={timetable} />}
      />
    );
  }
  // Show error message if there's an error fetching data
  else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
