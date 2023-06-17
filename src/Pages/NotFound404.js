import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorGif from '../Assets/Images/404.gif';

const NotFound404 = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        m: 2,
        p: 2,
      }}
    >
      <Box>
        <img src={ErrorGif} alt='error' />
      </Box>
      <Box>
        <Typography variant='h5' color='#2196f3' textAlign='center'>
          Oops! Requested resource does not exist
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound404;
