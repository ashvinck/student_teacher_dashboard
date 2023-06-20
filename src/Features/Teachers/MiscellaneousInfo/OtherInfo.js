import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Box, Button, Slider, Typography } from '@mui/material';
import styled from '@emotion/styled';

import {
  useAddMiscellanousInfoMutation,
  useGetTeacherDataQuery,
} from '../teachersApiSlice';
import Loading from '../../../Components/Loading';
import { CardWrapper } from '../../../Components/CardWrapper';
import Error from '../../../Components/Error';

// Styled Slider Component
const StyledSlider = styled(Slider)(({ value }) => ({
  color: value < 30 ? 'red' : value < 60 ? 'orange' : value < 90 ? '' : 'green',
}));

export const OtherInfo = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  const [syllabusCompleted, setSyllabusCompleted] = useState(0);
  const [projectsSubmitted, setProjectsSubmitted] = useState(0);
  const [homeworkSubmitted, setHomeworkSubmitted] = useState(0);
  const [libraryBooksReturned, setLibraryBooksReturned] = useState(0);

  const { data, isLoading, isSuccess, isError, error } =
    useGetTeacherDataQuery(classId); // Query for getting teacher Data

  // mutation hook for posting miscellaneous Info
  const [addMiscellanousInfo] = useAddMiscellanousInfoMutation();

  useEffect(() => {
    if (isSuccess) {
      const progressMap = new Map(
        data?.miscellaneousInfo?.map((info) => [info.title, info.progress])
      );

      setSyllabusCompleted(progressMap.get('Syllabus') || 0);
      setProjectsSubmitted(progressMap.get('Projects') || 0);
      setHomeworkSubmitted(progressMap.get('Homework') || 0);
      setLibraryBooksReturned(progressMap.get('Library') || 0);
    }
  }, [isSuccess, data]);

  // Handling Form
  const handleSyllabusChange = (event, newValue) => {
    setSyllabusCompleted(newValue);
  };

  const handleProjectChange = (event, newValue) => {
    setProjectsSubmitted(newValue);
  };

  const handleHomeworkChange = (event, newValue) => {
    setHomeworkSubmitted(newValue);
  };

  const handleLibraryChange = (event, newValue) => {
    setLibraryBooksReturned(newValue);
  };

  // Handling Submit
  const handleSubmit = () => {
    const data = [
      { title: 'Syllabus', progress: syllabusCompleted },
      { title: 'Projects', progress: projectsSubmitted },
      { title: 'Homework', progress: homeworkSubmitted },
      { title: 'Library', progress: libraryBooksReturned },
    ];
    // Prepare data to send to the API
    addMiscellanousInfo({ classId: classId, data })
      .unwrap()
      .then((response) => toast.success(response.message)) // Show success message using toast
      .catch((error) => {
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          'An error occurred.';
        toast.error(errorMessage); // Show error message using toast
      });
  };

  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />; // Show loading state while fetching data
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <CardWrapper title='Update Other Info'>
        <ToastContainer /> {/* Container for displaying toast messages */}
        <Box>
          <Typography gutterBottom>
            Syllabus Completed: {syllabusCompleted}%
          </Typography>
          <StyledSlider
            value={syllabusCompleted}
            onChange={handleSyllabusChange}
            aria-label='Syllabus Completed'
            valueLabelDisplay='auto'
            min={0}
            max={100}
          />

          <Typography gutterBottom>
            Projects Submitted: {projectsSubmitted}%
          </Typography>
          <StyledSlider
            value={projectsSubmitted}
            onChange={handleProjectChange}
            aria-label='Projects Submitted'
            valueLabelDisplay='auto'
            min={0}
            max={100}
          />

          <Typography gutterBottom>
            Homework Submitted: {homeworkSubmitted}%
          </Typography>
          <StyledSlider
            value={homeworkSubmitted}
            onChange={handleHomeworkChange}
            aria-label='Homework Submitted'
            valueLabelDisplay='auto'
            min={0}
            max={100}
          />

          <Typography gutterBottom>
            Library Books Returned: {libraryBooksReturned}%
          </Typography>
          <StyledSlider
            value={libraryBooksReturned}
            onChange={handleLibraryChange}
            aria-label='Library Books Returned'
            valueLabelDisplay='auto'
            min={0}
            max={100}
          />
          <Button
            sx={{ color: '#4e73df', fontWeight: '600' }}
            variant='outlined'
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </CardWrapper>
    );
  }
  // Show error message if there's an error fetching data
  else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
