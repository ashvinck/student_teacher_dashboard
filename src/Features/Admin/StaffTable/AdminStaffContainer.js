import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetClassDataQuery } from '../adminApiSlice';
import Loading from '../../../Components/Loading';
import Error from '../../../Components/Error';
import { TeacherCardWrapper } from '../../../Components/TeacherCardWrapper';
import { AddStaffInfo } from './AddStaff';
import { ViewStaffInfo } from './ViewStaffInfo';

// StaffContainer component
// Renders the staff container based on the classId
export const StaffContainer = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  // Fetch staff data based on the classId
  const { data, isLoading, isSuccess, isError, error } =
    useGetClassDataQuery(classId);

  // Filtering timetable data
  const { staff } = data || {};

  let content;

  // Show loading state while fetching data
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <TeacherCardWrapper
        title='Staff'
        dialogChildren={<AddStaffInfo data={staff} />}
        children={<ViewStaffInfo data={staff} />}
      />
    );
  }
  // Show error message if there's an error fetching data
  else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
