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
import styled from '@emotion/styled';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useAddResultsMutation } from '../teachersApiSlice';
import Loading from '../../../Components/Loading';
import { CardWrapper } from '../../../Components/CardWrapper';
import ExaminationData from '../../../Data/Examinations.json';

// Form validation Schema
const ResultsValidationSchema = yup.object({
  id: yup.string().required('Please provide an Id'),
  examType: yup.string().required('Please select the type of examination'),
  passPercentage: yup
    .number()
    .required('Please enter the pass percentage of the exam'),
  description: yup.string().required('Please provide a link'),
});

// Styled Component for Error Messages
const StyledTypography = styled(Typography)(() => ({
  color: 'red',
}));

export const AddResults = () => {
  const { classId } = useParams(); //for identifying the class

  const [addResults, { isLoading }] = useAddResultsMutation(); //POST API Call

  // Add Results Function and response handling
  const addRslt = (data) => {
    addResults({ classId: classId, data })
      .unwrap()
      .then((response) => toast.success(response.message))
      .catch((error) => {
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          'An error occurred.';
        toast.error(errorMessage);
      });
  };

  // Formik form Handling
  const formik = useFormik({
    initialValues: {
      id: '',
      examType: '',
      passPercentage: '',
      description: '',
    },
    validationSchema: ResultsValidationSchema,
    onSubmit: (values) => {
      // console.log('onResultUpload', values);
      addRslt(values);
    },
  });

  return (
    // Title
    <CardWrapper title='Upload Results'>
      {/* --------- Form ----------- */}
      <Grid
        container
        component='form'
        direction='row'
        alignItems='center'
        flexWrap='wrap'
        spacing={3}
        onSubmit={formik.handleSubmit}
      >
        <ToastContainer />
        {isLoading ? (
          <Loading open={isLoading} />
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
              <FormControl fullWidth>
                <InputLabel id='examType'>Examination</InputLabel>
                <Select
                  labelId='examType'
                  id='examType'
                  name='examType'
                  value={formik.values.examType}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.examType && Boolean(formik.errors.examType)
                  }
                  label='Select Examination'
                >
                  {ExaminationData.examinations.map((exam) => (
                    <MenuItem key={exam.title} value={exam.title}>
                      {exam.title}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.examType && formik.errors.examType && (
                  <StyledTypography>{formik.errors.examType}</StyledTypography>
                )}
              </FormControl>
            </Grid>

            {/* -------Pass Percentage --------- */}
            <Grid item xs={12}>
              <TextField
                id='passPercentage'
                fullWidth
                value={formik.values.passPercentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.passPercentage &&
                  Boolean(formik.errors.passPercentage)
                }
                label='Pass Percentage'
              />
              <StyledTypography>
                {formik.touched.passPercentage && formik.errors.passPercentage
                  ? formik.errors.passPercentage
                  : ''}
              </StyledTypography>
            </Grid>

            {/* ------------ Description ---------  */}
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
            {/* ----------- Submit Button --------  */}
            <Grid item xs={12}>
              <Button variant='contained' type='submit' fullWidth>
                Submit
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </CardWrapper>
  );
};
