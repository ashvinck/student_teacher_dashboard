import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetClassDataQuery } from '../adminApiSlice';
import Loading from '../../../Components/Loading';
import { AddStaffInfo } from './AddStaff';
import Error from '../../../Components/Error';
import { TeacherCardWrapper } from '../../../Components/TeacherCardWrapper';
import { ViewStaffInfo } from './ViewStaffInfo';

// Main Function
export const StaffContainer = () => {
  // to determine classId
  const { classId } = useParams();

  // Fetching data
  const { data, isLoading, isSuccess, isError, error } =
    useGetClassDataQuery(classId);

  // Filtering timetable data
  const staffData = data?.staff;

  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />;
  } else if (isSuccess) {
    content = (
      <TeacherCardWrapper
        title='Staff'
        dialogChildren={<AddStaffInfo data={staffData} />}
        children={<ViewStaffInfo data={staffData} />}
      />
    );
  } else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
