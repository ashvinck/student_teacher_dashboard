import React from 'react';
import { useGetTeacherDataQuery } from '../teachersApiSlice';
import Loading from '../../../Components/Loading';
import { TeacherCardWrapper } from '../../../Components/TeacherCardWrapper';
import { AddStudent } from './AddStudent';
import { ViewStudents } from './ViewStudents';
import Error from '../../../Components/Error';
import { useParams } from 'react-router-dom';

export const StudentContainer = () => {
  const { classId } = useParams();
  // GET classData
  const { data, isLoading, isSuccess, isError, error } =
    useGetTeacherDataQuery(classId);

  let content;
  if (isLoading) {
    content = <Loading open={isLoading} />;
  } else if (isSuccess) {
    content = (
      <TeacherCardWrapper
        title='Student'
        dialogChildren={<AddStudent />}
        children={<ViewStudents data={data} />}
      />
    );
  } else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
