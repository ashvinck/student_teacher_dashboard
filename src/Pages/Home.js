import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import DashboardImage from '../Assets/Images/Dashboard.png';
import Logo from '../Assets/Images/logo.png';
import { Link } from 'react-router-dom';

const Home = () => {
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
      <Paper
        elevation={3}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ------ Logo --------- */}
        <Box sx={{ m: 2 }}>
          <img src={Logo} alt='logo' height='32' width='32' />
        </Box>
        {/* ---- Greetings ------- */}
        <Box>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Welcome
          </Typography>
        </Box>
        {/* ----- Dashboard Image------- */}
        <Box>
          <img height='300' width='250' src={DashboardImage} alt='Dashboard' />
        </Box>
        {/* ------- Login ------ */}
        <Box>
          <Link to='/auth/login'>
            <Typography sx={{ fontWeight: '500', color: '#1a73e8' }}>
              Login to Dashboard
            </Typography>
          </Link>
        </Box>
        {/* ------- Sign up ----- */}
        <Box>
          <Link to='/auth/signup'>
            <Typography sx={{ fontWeight: '500', color: '#1a73e8' }}>
              Don't have an account?
            </Typography>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
