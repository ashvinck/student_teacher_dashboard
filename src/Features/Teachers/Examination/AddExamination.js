import React from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styled from '@emotion/styled';

import { CardWrapper } from '../../../Components/CardWrapper';
import Loading from '../../../Components/Loading';
import ExamData from '../../../Data/Examinations.json';
import { useAddExamsMutation } from '../teachersApiSlice';

// Validation Schema for Form
const ExamsValidationSchema = yup.object({
  id: yup.string().required('Please provide an ID for this examination'),
  examType: yup.string().required('Please select the type of examination'),
  subject: yup.string().required('Please provide the name of the subject'),
  description: yup.string().required('Please provide a description'),
});

// Styled Component for Error Messages
const StyledTypography = styled(Typography)(() => ({
  color: 'red',
}));

export const AddExamination = ({ data }) => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  const [addExams, { isLoading }] = useAddExamsMutation(); // Mutation hook for adding examination

  // Add Exam Function and response handling
  const AddExm = (data) => {
    // Call the addExam mutation with the classId and data
    addExams({ classId: classId, data })
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

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      id: '',
      examType: '',
      subject: '',
      description: '',
    },
    validationSchema: ExamsValidationSchema,
    onSubmit: (values) => {
      // console.log('onExamUpload', values);
      AddExm(values); // Call addExam function to handle form submission
    },
  });
  return (
    // Title
    <CardWrapper title='Upload Exam'>
      {/* -------- Form ------ */}
      <Grid
        container
        component='form'
        direction='row'
        alignItems='center'
        flexWrap='wrap'
        spacing={3}
        onSubmit={formik.handleSubmit}
      >
        <ToastContainer /> {/* Container for displaying toast messages */}
        {isLoading ? (
          <Loading open={isLoading} /> // Show loading indicator while submitting data
        ) : (
          <>
            {/* ------ ID ------- */}
            <Grid item xs={12}>
              <TextField
                id='id'
                fullWidth
                value={formik.values.id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.id && Boolean(formik.errors.id)}
                label='Id'
              />
              <StyledTypography>
                {formik.touched.id && formik.errors.id ? formik.errors.id : ''}
              </StyledTypography>
            </Grid>

            {/* ------ Exam Type ------ */}
            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={
                  formik.touched.examType && Boolean(formik.errors.examType)
                }
              >
                <InputLabel id='examType'>Examination</InputLabel>
                <Select
                  labelId='examType'
                  id='examType'
                  name='examType'
                  value={formik.values.examType}
                  onChange={formik.handleChange}
                  label='Select Examination'
                >
                  {ExamData.examinations.map((exam) => (
                    <MenuItem key={exam.title} value={exam.title}>
                      {exam.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <StyledTypography>
                {formik.touched.examType && formik.errors.examType
                  ? formik.errors.examType
                  : ''}
              </StyledTypography>
            </Grid>

            {/* ------- Subject --------- */}
            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={formik.touched.subject && Boolean(formik.errors.subject)}
              >
                <InputLabel id='subject'>Subject</InputLabel>
                <Select
                  labelId='subject'
                  id='subject'
                  name='subject'
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  label='Select Subject'
                >
                  {data.staff.map((sub) => (
                    <MenuItem key={sub.subject} value={sub.subject}>
                      {sub.subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <StyledTypography>
                {formik.touched.subject && formik.errors.subject
                  ? formik.errors.subject
                  : ''}
              </StyledTypography>
            </Grid>

            {/*  ----- Description ----------- */}
            <Grid item xs={12}>
              <TextField
                id='description'
                name='description'
                fullWidth
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                label='Please provide a description or link'
              />
              <StyledTypography>
                {formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : ''}
              </StyledTypography>
            </Grid>

            {/* -------- Submit Button ----- */}
            <Grid item xs={12}>
              <Button
                variant='contained'
                type='submit'
                fullWidth
                disabled={formik.isSubmitting} // Disable the button when submitting the form
              >
                Upload Examination
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </CardWrapper>
  );
};
