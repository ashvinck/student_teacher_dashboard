import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorGif from '../Assets/Images/404.gif';

const Error = ({ error }) => {
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
        <Typography variant='h5' color='red' textAlign='center'>
          {console.log(error)}
          {error.data.error.message}
        </Typography>
      </Box>
    </Box>
  );
};

export default Error;
