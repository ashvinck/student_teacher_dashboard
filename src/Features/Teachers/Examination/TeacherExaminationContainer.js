import React from 'react';
import { useGetTeacherDataQuery } from '../teachersApiSlice';
import { TeacherCardWrapper } from '../../../Components/TeacherCardWrapper';
import Loading from '../../../Components/Loading';
import Error from '../../../Components/Error';
import { AddExamination } from './AddExamination';
import { ViewExaminations } from './ViewExaminations';
import { useParams } from 'react-router-dom';

// TeacherExamination component
// Renders the teacher examination based on the classId
export const TeacherExaminationContainer = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  // Fetch staff data based on the classId
  const { data, isLoading, isSuccess, isError, error } =
    useGetTeacherDataQuery(classId);

  let content;

  // Show loading state while fetching data
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <TeacherCardWrapper
        title='Examination'
        dialogChildren={<AddExamination data={data} />}
        children={<ViewExaminations data={data} />}
      />
    );
  }
  // Show error message if there's an error fetching data
  else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
