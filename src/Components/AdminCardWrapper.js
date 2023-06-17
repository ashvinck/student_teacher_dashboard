import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

export const AdminCardWrapper = ({ title, children, dialogChildren }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const StyledBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }));

  return (
    <Box sx={{ mt: 3 }}>
      <Paper
        sx={{
          backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1a2027',
          pb: 1,
        }}
      >
        <StyledBox>
          <Typography
            sx={{ p: 2, fontSize: '1rem', color: '#4e73df', fontWeight: '700' }}
          >
            {title}
          </Typography>
          <Button
            sx={{
              mx: 2,
              color: '#4e73df',
              fontWeight: '600',
            }}
            variant='outlined'
            onClick={handleClickOpen}
          >
            Update {title}
          </Button>
        </StyledBox>
        <Divider />
        <Box sx={{ m: 2 }}>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>{dialogChildren}</DialogContent>
          </Dialog>
          {children}
        </Box>
      </Paper>
    </Box>
  );
};
