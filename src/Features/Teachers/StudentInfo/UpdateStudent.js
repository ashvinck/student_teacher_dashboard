import React from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';

import { useUpdateStudentMutation } from '../teachersApiSlice';
import Loading from '../../../Components/Loading';
import { CardWrapper } from '../../../Components/CardWrapper';

// Form Validation Schema
const ValidationSchema = yup.object({
  id: yup
    .string()
    .min(0, 'Invalid Roll Number')
    .required('Please fill the Roll Number'),
  name: yup
    .string()
    .min(4, 'Please provide fullName')
    .required('Please provide the full-name of the student'),
  gender: yup
    .string()
    .min(4, 'Please specify gender')
    .required('Please enter the gender of the student'),
  guardianName: yup
    .string()
    .min(4, 'Please enter the Name')
    .required('Please enter the name of the guardian of the student'),
  contactInfo: yup
    .number()
    .min(10, 'Invalid Phone Number')
    .required('Please fill the contact number of the guardian of the student'),
});

// Custom Component for Error Messages
const StyledTypography = styled(Typography)(() => ({
  color: 'red',
}));

export const UpdateStudent = ({ data, id }) => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  const [updateStudent, { isLoading }] = useUpdateStudentMutation(); // Mutation hook for updating student

  //Updating Student Data and response handling
  const UpdateStdnt = (data) => {
    // Call the updateStudent mutation with the classId,id and data
    updateStudent({ classId: classId, id: id, data })
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

  // Formik form Handling
  const formik = useFormik({
    initialValues: {
      id: data?.id,
      name: data?.name,
      gender: data?.gender,
      guardianName: data?.guardianName,
      contactInfo: data?.contactInfo,
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      // console.log('onUpdate', values);
      UpdateStdnt(values); // Call updateStudent fn to handle form submission
    },
  });

  return (
    // Title
    <CardWrapper title='Update Student'>
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
          {/* ---------- Roll No. ------------- */}
          <TextField
            id='id'
            name='id'
            value={formik.values.id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.id && Boolean(formik.errors.id)}
            label='Roll No.'
          />
          <StyledTypography>
            {formik.touched.id && formik.errors.id ? formik.errors.id : ''}
          </StyledTypography>

          {/* ------------ Name ---------------*/}
          <TextField
            id='name'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            label='Name'
          />
          <StyledTypography>
            {formik.touched.name && formik.errors.name
              ? formik.errors.name
              : ''}
          </StyledTypography>

          {/* ------------- Gender --------------- */}
          <TextField
            id='gender'
            name='gender'
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            label='Gender'
          />
          <StyledTypography>
            {formik.touched.gender && formik.errors.gender
              ? formik.errors.gender
              : ''}
          </StyledTypography>

          {/* -------------- Guardian Name ------------- */}
          <TextField
            id='guardianName'
            name='guardianName'
            value={formik.values.guardianName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.guardianName && Boolean(formik.errors.guardianName)
            }
            label='GuardianName'
          />
          <StyledTypography>
            {formik.touched.guardianName && formik.errors.guardianName
              ? formik.errors.guardianName
              : ''}
          </StyledTypography>

          {/* ------------- Contact Info --------------- */}
          <TextField
            id='contactInfo'
            name='contactInfo'
            value={formik.values.contactInfo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.contactInfo && Boolean(formik.errors.contactInfo)
            }
            label='Contact Info'
          />
          <StyledTypography>
            {formik.touched.contactInfo && formik.errors.contactInfo
              ? formik.errors.contactInfo
              : ''}
          </StyledTypography>
          {/* --------- Submit Button ---------- */}
          <Button
            variant='outlined'
            sx={{ color: '#4e73df', fontWeight: '600' }}
            type='submit'
            disabled={formik.isSubmitting} // Disable the button when submitting the form
          >
            Add Student
          </Button>
        </Box>
      )}
    </CardWrapper>
  );
};
