import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useUpdatePasswordMutation } from './authApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../Assets/Images/logo.png';
import Loading from '../../Components/Loading';

// Custom Styled TextField Component
const StyledTextField = styled(TextField)(() => ({
  margin: '10px',
}));

const StyledTypography = styled(Typography)(() => ({
  color: 'red',
}));

// Validation Schema using YUP
const ResetpasswordValidationSchema = yup.object({
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

const ResetPassword = () => {
  const navigate = useNavigate();
  const { _id, token } = useParams();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetpasswordValidationSchema,
    onSubmit: (credentials) => {
      // console.log('onResetpassword', values);
      updatePassword({ _id: _id, token: token, ...credentials })
        .unwrap()
        .then((response) => toast.success(response.message))
        .then(() =>
          setTimeout(() => {
            navigate('/auth/login');
          }, 7000)
        )
        .catch((error) => toast.error(error.error || error.data.error.message));
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
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
        <Loading open={isLoading} />
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
          <ToastContainer />
          <Box sx={{ m: 2 }}>
            <img src={Logo} alt='logo' height='32' width='32' />
          </Box>
          <Typography component='h1' variant='h5'>
            Reset Password
          </Typography>
          <Typography component='h1' variant='subtitle1'>
            Create a new Password
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
            />
            <StyledTypography>
              {formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : ''}
            </StyledTypography>
            <Button variant='contained' type='submit' sx={{ m: 2 }} fullWidth>
              Reset Password
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ResetPassword;
