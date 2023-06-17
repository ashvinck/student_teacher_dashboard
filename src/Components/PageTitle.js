import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import React from 'react';

export const PageTitle = ({ title }) => {
  const theme = useTheme();
  return (
    // Page Title
    <Box sx={{ mb: 2 }}>
      <Typography
        variant='h4'
        fontWeight='bold'
        sx={{ color: theme.palette.grey[500] }}
      >
        {title}
      </Typography>
    </Box>
  );
};
