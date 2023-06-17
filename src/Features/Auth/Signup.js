import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Logo from '../../Assets/Images/logo.png';
import { useSignupMutation } from './authApiSlice';
import Loading from '../../Components/Loading';
import ClassInfo from '../../Data/Classes.json';

// Form Styling
// Custom Styled TextField Component
const StyledTextField = styled(TextField)(() => ({
  margin: '10px',
}));

const StyledTypography = styled(Typography)(() => ({
  color: 'red',
}));

// Validation Schema using YUP
const SignUpValidationSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Please enter a valid username')
    .required('Please enter your username'),

  classInfo: yup.number().required('Please select classInfo assigned to you'),
  email: yup
    .string()
    .min(5, 'Please enter a valid email address')
    .max(30, 'Enter an alternate email address')
    .required('Please provide a email address')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid format'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Character limit exceeded')
    .required('Please enter your password')
    .matches(/\d/, 'Password must contain atleast one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain atleast one special character'
    ),

  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords doesnot match'),
});

// Signup form
const SignUp = () => {
  const [signup, { isLoading }] = useSignupMutation(); //signup mutation
  const navigate = useNavigate();

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      username: '',
      classInfo: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: (values) => {
      // console.log('onSignup', values);
      signupUser(values); // calling auth signup function
    },
  });

  // Auth signup function
  const signupUser = (credentials) => {
    signup(credentials)
      .unwrap()
      .then((response) => toast.success(response.message))
      .then(() =>
        setTimeout(() => {
          navigate('/auth/login');
        }, 7500)
      )
      .catch((error) => {
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          'An error occurred.';
        toast.error(errorMessage);
      });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    // Signup Layout
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {/* ----- if Loading ---- */}
      {isLoading ? (
        <Loading open={isLoading} />
      ) : (
        // else
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ToastContainer />
          <Box sx={{ m: 2 }}>
            <img src={Logo} alt='logo' height='32' width='32' />
          </Box>
          <Typography component='h1' variant='h5'>
            SignUp
          </Typography>
          <Typography component='h1' variant='subtitle1'>
            Create a new account
          </Typography>
          <Box
            component='form'
            sx={{
              m: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onSubmit={formik.handleSubmit}
          >
            {/* ------- Username --------- */}
            <StyledTextField
              required
              id='username'
              label='Username'
              fullWidth
              name='username'
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
            />
            <StyledTypography>
              {formik.touched.username && formik.errors.username
                ? formik.errors.username
                : ''}
            </StyledTypography>

            {/* ------ Class ------- */}
            <FormControl
              fullWidth
              required
              error={
                formik.touched.classInfo && Boolean(formik.errors.classInfo)
              }
            >
              <InputLabel id='classInfo'>Class</InputLabel>
              <Select
                labelId='classInfo'
                id='classInfo'
                name='classInfo'
                value={formik.values.classInfo}
                onChange={formik.handleChange}
                label='Select Assigned classInfo'
              >
                {ClassInfo.map((classInfo) => (
                  <MenuItem key={classInfo.title} value={classInfo.title}>
                    {classInfo.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <StyledTypography>
              {formik.touched.classInfo && formik.errors.classInfo
                ? formik.errors.classInfo
                : ''}
            </StyledTypography>

            {/* --------- Email ------------ */}
            <StyledTextField
              required
              id='email'
              label='E-mail'
              fullWidth
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <StyledTypography>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ''}
            </StyledTypography>
            {/* -------- Password -------- */}
            <StyledTextField
              required
              fullWidth
              id='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
            <StyledTypography>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ''}
            </StyledTypography>
            {/* ----------- Confirm Password -------- */}
            <StyledTextField
              required
              fullWidth
              id='confirmPassword'
              label='Confirm Password'
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
            />
            <StyledTypography>
              {formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : ''}
            </StyledTypography>
            {/* ----- Sign up Button --------- */}
            <Button variant='contained' type='submit' sx={{ m: 2 }} fullWidth>
              Sign Up
            </Button>
          </Box>
          <Box>
            {/* -------- Other links --------- */}
            <Link to='/auth/login'>
              <Typography sx={{ fontWeight: '500', color: '#1a73e8' }}>
                Already have an account?
              </Typography>
            </Link>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default SignUp;
