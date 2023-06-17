import React from 'react';
import { useTheme } from '@emotion/react';
import { Paper } from '@mui/material';
import { CustomNoRowsOverlay } from '../NoRowsOverlay';

export const Messages = () => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1a2027',
        p: 2,
      }}
    >
      <CustomNoRowsOverlay />
    </Paper>
  );
};
