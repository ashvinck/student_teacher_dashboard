import React from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

export const CardWrapper = ({ title, children }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mt: 3 }}>
      <Paper
        sx={{
          backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1a2027',
          pb: 1,
        }}
      >
        <Box>
          <Typography
            sx={{ p: 2, fontSize: '1rem', color: '#4e73df', fontWeight: '700' }}
          >
            {title}
          </Typography>
          <Divider />
        </Box>
        <Box sx={{ m: 2 }}>{children}</Box>
      </Paper>
    </Box>
  );
};
