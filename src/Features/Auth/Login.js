import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useLoginMutation } from './authApiSlice';
import Logo from '../../Assets/Images/logo.png';
import Loading from '../../Components/Loading';
import { setCredentials } from './AuthSlice';

// Form Styling
// Custom Styled TextField Component
const StyledTextField = styled(TextField)(() => ({
  margin: '10px',
}));
const StyledTypography = styled(Typography)(() => ({
  color: 'red',
  wordWrap: 'break-word',
  maxWidth: '250px',
}));

// Validation Schema
const LoginValidationSchema = yup.object({
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
});

// Login Form
const Login = () => {
  const [login, { isLoading }] = useLoginMutation(); // mutation hook for login
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    onSubmit: (values) => {
      // console.log('onLogin', values);
      loginUser(values); // Call updateStaff function to handle form submission
    },
  });

  // Auth Login Function
  const loginUser = (credentials) => {
    // Call the Login mutation with the email and password
    login(credentials)
      .unwrap()
      .then((data) => dispatch(setCredentials(data)))
      .then(() => navigate('/dashboard'))
      .catch((error) => {
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          'An error occurred.';
        toast.error(errorMessage); // Show error message using toast
      });
  };

  // For viewing or hiding password input field
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    // Login layout
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {isLoading ? (
        <Loading open={isLoading} /> // Show loading indicator while submitting data
      ) : (
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ToastContainer /> {/* Container for displaying toast messages */}
          {/* --- Logo ---- */}
          <Box sx={{ m: 2 }}>
            <img src={Logo} alt='logo' height='32' width='32' />
          </Box>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Typography component='h1' variant='subtitle1'>
            Login to your dashboard
          </Typography>
          {/* ---Form--- */}
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
            {/* ---- E-mail ---- */}
            <StyledTextField
              required
              id='email'
              label='E-mail'
              fullWidth
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <StyledTypography>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ''}
            </StyledTypography>

            {/* ------- Password ---- */}
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
            />
            <StyledTypography>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ''}
            </StyledTypography>

            {/* ----Login Buton----- */}
            <Button variant='contained' type='submit' sx={{ m: 2 }} fullWidth>
              Login
            </Button>
          </Box>
          {/* ----External Links----- */}
          <Box>
            {/* --- Forgot Password --- */}
            <Link to='/auth/forgotpassword'>
              <Typography sx={{ fontWeight: '500', color: '#1a73e8' }}>
                Forgot Password ?
              </Typography>
            </Link>
          </Box>
          <Box>
            {/* ---- Sign up ----- */}
            <Link to='/auth/signup'>
              <Typography sx={{ fontWeight: '500', color: '#1a73e8' }}>
                Don't have an account?
              </Typography>
            </Link>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Login;
