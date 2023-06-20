import React from 'react';
import { useGetTeacherDataQuery } from '../teachersApiSlice';
import Loading from '../../../Components/Loading';
import { TeacherCardWrapper } from '../../../Components/TeacherCardWrapper';
import { AddResults } from './AddResults';
import { ViewResults } from './ViewResults';
import Error from '../../../Components/Error';
import { useParams } from 'react-router-dom';

// TeacherResults component
// Renders the results of students based on the classId
export const TeacherResultsContainer = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  // Fetch staff data based on the classId
  const { data, isLoading, isSuccess, isError, error } =
    useGetTeacherDataQuery(classId);

  // Filtering timetable data
  const { results } = data || {};

  let content;

  // Show loading state while fetching data
  if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <TeacherCardWrapper
        title='Results'
        dialogChildren={<AddResults />}
        children={<ViewResults data={results} />}
      />
    );
  }
  // Show error message if there's an error fetching data
  else if (isError) {
    <Error error={error} />;
  }
  return content;
};
