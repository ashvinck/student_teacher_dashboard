import React from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';

import { useAddStudentMutation } from '../teachersApiSlice';
import Loading from '../../../Components/Loading';
import { CardWrapper } from '../../../Components/CardWrapper';

// Form Validation
const ValidationSchema = yup.object({
  id: yup
    .string()
    .min(0, 'Invalid Roll Number')
    .required('Please provide the Roll Number'),
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

export const AddStudent = () => {
  const { classId } = useParams(); // to identify the class
  const [addStudent, { isLoading }] = useAddStudentMutation(); // POST API Call

  // Adding Student Data and response handling
  const AddSdata = (data) => {
    addStudent({ classId: classId, data })
      .unwrap()
      .then((response) => toast.success(response.message))
      .catch((error) => toast.error(error.error || error.data.error.message));
  };
  // Formik validationSchema
  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      gender: '',
      guardianName: '',
      contactInfo: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      // console.log('onAddStudent', values);
      AddSdata(values);
    },
  });

  return (
    // Title
    <CardWrapper title='Add Student'>
      <ToastContainer />
      {isLoading ? (
        <Loading open={isLoading} />
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
          <Button variant='outlined' type='submit'>
            Add Student
          </Button>
        </Box>
      )}
    </CardWrapper>
  );
};
