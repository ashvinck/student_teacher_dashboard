import React from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Grid } from '@mui/material';

import { useAddStaffDataMutation } from '../adminApiSlice';
import { CardWrapper } from '../../../Components/CardWrapper';
import Loading from '../../../Components/Loading';

// Define validation schema using yup
const validationSchema = yup.object().shape({
  id: yup.string().required('Please provide a valid ID'),
  subject: yup.string().required('Subject is required'),
  name: yup.string().required('Name is required'),
  contactInfo: yup.string().required('Contact info is required'),
});

export const AddStaffInfo = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  const [addStaffData, { isLoading }] = useAddStaffDataMutation(); // mutation hook for adding staff data

  // Function to handle adding staff data
  const addStaff = (data) => {
    // Call the addStaffData mutation with the classId and staff data
    addStaffData({ classId: classId, data })
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

  const formik = useFormik({
    initialValues: {
      id: '',
      subject: '',
      name: '',
      contactInfo: '',
    },
    validationSchema,
    onSubmit: (values) => {
      addStaff(values); // Call addStaff function to handle form submission
    },
  });

  return (
    <CardWrapper title='Update Staff Table'>
      <ToastContainer /> {/* Container for displaying toast messages */}
      {isLoading ? (
        <Loading open={isLoading} /> // Show loading indicator while submitting data
      ) : (
        <Grid
          container
          component='form'
          direction='row'
          alignItems='center'
          flexWrap='wrap'
          spacing={3}
          onSubmit={formik.handleSubmit}
        >
          {/* ------ ID --------- */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='id'
              name='id'
              label='Staff ID'
              value={formik.values.id}
              onChange={formik.handleChange}
              error={formik.touched.id && Boolean(formik.errors.id)}
              helperText={formik.touched.id && formik.errors.id}
            />
          </Grid>
          {/* ---------- Name ----------- */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='name'
              name='name'
              label='Name of the Staff'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          {/* ----------- Subject --------- */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='subject'
              name='subject'
              label='Subject taken by Staff'
              value={formik.values.subject}
              onChange={formik.handleChange}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
            />
          </Grid>

          {/* ---------- ContactInfo -------- */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='contactInfo'
              name='contactInfo'
              label='Contact Info'
              value={formik.values.contactInfo}
              onChange={formik.handleChange}
              error={
                formik.touched.contactInfo && Boolean(formik.errors.contactInfo)
              }
              helperText={
                formik.touched.contactInfo && formik.errors.contactInfo
              }
            />
          </Grid>
          <Grid item xs={12} textAlign='center'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={formik.isSubmitting} // Disable the button when submitting the form
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </CardWrapper>
  );
};
