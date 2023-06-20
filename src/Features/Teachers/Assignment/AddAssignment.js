import React from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';

import { useAddAssignmentMutation } from '../teachersApiSlice';
import { CardWrapper } from '../../../Components/CardWrapper';
import Loading from '../../../Components/Loading';

// Form Validation Schema
const ValidationSchema = yup.object({
  id: yup.string().min(0, 'Invalid id').required('Please enter id'),
  subject: yup
    .string()
    .min(2, 'Please enter a valid subject')
    .required('Please enter the name of the subject'),
  description: yup
    .string()
    .min(4, 'Please specify description')
    .required('Please enter the description of the task'),
  lds: yup
    .date()
    .min(new Date(Date.now()), 'Please enter the last date of submission')
    .required('Please enter the last date of submission'),
  assignedBy: yup
    .string()
    .min(0, 'Please enter your name')
    .required('Please enter your name'),
});

// Custom component for Error messages
const StyledTypography = styled(Typography)(() => ({
  color: 'red',
}));

export const AddAssignments = () => {
  const { classId } = useParams(); // Retrieve classId from URL parameters

  const [addAssignment, { isLoading }] = useAddAssignmentMutation(); // Mutation hook for adding assignment

  // Function to handle adding assignment and response handling
  const AddAssignment = (data) => {
    addAssignment({ classId: classId, data })
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

  // Formik validationSchema
  const formik = useFormik({
    initialValues: {
      id: '',
      subject: '',
      description: '',
      lds: dayjs(Date.now()),
      assignedBy: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      // console.log('onAddAssignment', values);
      AddAssignment(values); // Call addAssignment function to handle form submission
    },
  });
  return (
    // Title
    <CardWrapper title='Add Assignment'>
      <ToastContainer /> {/* Container for displaying toast messages */}
      {isLoading ? (
        <Loading open={isLoading} /> // Show loading indicator while submitting data
      ) : (
        <Box
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '30px',
          }}
          onSubmit={formik.handleSubmit}
        >
          {/* ---------- ID------- */}
          <TextField
            id='id'
            value={formik.values.id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.id && Boolean(formik.errors.id)}
            label='Id'
          />
          <StyledTypography>
            {formik.touched.id && formik.errors.id ? formik.errors.id : ''}
          </StyledTypography>

          {/* ------- Subject Name ------*/}
          <TextField
            id='subject'
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.subject && Boolean(formik.errors.subject)}
            label='Subject'
          />
          <StyledTypography>
            {formik.touched.subject && formik.errors.subject
              ? formik.errors.subject
              : ''}
          </StyledTypography>

          {/* --------- Description --------- */}
          <TextField
            id='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            label='Description'
          />
          <StyledTypography>
            {formik.touched.description && formik.errors.description
              ? formik.errors.description
              : ''}
          </StyledTypography>

          {/* ------- Last Date of Submission ---------  */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Last date of submission'
              disablePast
              format='DD/MM/YYYY'
              value={formik.values.lds}
              error={formik.touched.lds && Boolean(formik.errors.lds)}
              onChange={(value) => formik.setFieldValue('lds', value, true)}
            />
          </LocalizationProvider>
          <StyledTypography>
            {formik.touched.lds && formik.errors.lds ? formik.errors.lds : ''}
          </StyledTypography>

          {/* --------- Assigned By ------------ */}
          <TextField
            id='assignedBy'
            value={formik.values.assignedBy}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.assignedBy && Boolean(formik.errors.assignedBy)
            }
            label='Assigned By'
          />
          <StyledTypography>
            {formik.touched.assignedBy && formik.errors.assignedBy
              ? formik.errors.assignedBy
              : ''}
          </StyledTypography>

          {/* ------ Submit Button ---------- */}
          <Button
            variant='outlined'
            sx={{ color: '#4e73df', fontWeight: '600' }}
            type='submit'
            disabled={formik.isSubmitting} // Disable the button when submitting the form
          >
            Upload Task
          </Button>
        </Box>
      )}
    </CardWrapper>
  );
};
