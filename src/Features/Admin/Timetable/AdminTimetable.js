import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetClassDataQuery } from '../adminApiSlice';
import Loading from '../../../Components/Loading';
import Error from '../../../Components/Error';
import { AdminCardWrapper } from '../../../Components/AdminCardWrapper';
import { TimeTable } from '../../../Components/TimeTable';
import { UpdateTimetable } from './UpdateTimetable';

// Main Function
export const AdminTimeTable = () => {
  // to determine classId
  const { classId } = useParams();

  // Fetching data
  const { data, isLoading, isSuccess, isError, error } =
    useGetClassDataQuery(classId);

  // Filtering timetable data
  const timeTableData = data?.timetable;

  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />;
  } else if (isSuccess) {
    content = (
      <AdminCardWrapper
        title='Time Table'
        dialogChildren={<UpdateTimetable data={timeTableData} />}
        children={<TimeTable data={timeTableData} />}
      />
    );
  } else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
