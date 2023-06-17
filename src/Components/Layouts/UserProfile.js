import { useTheme } from '@emotion/react';
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  selectCurrentRole,
  selectCurrentUser,
} from '../../Features/Auth/AuthSlice';
import dayjs from 'dayjs';

export const UserProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentRole);

  const getGreeting = useMemo(() => {
    const currentTime = dayjs();
    const hour = currentTime.hour();

    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Paper
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1a2027',
        p: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}
          >
            {getGreeting}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign='right'>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
              {user}
            </Typography>
          </Box>
          <Box textAlign='right'>
            <Typography
              variant='body2'
              sx={{ color: theme.palette.text.secondary }}
            >
              {role}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Grid container xs={12}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            color='primary'
            sx={{ color: theme.palette.primary.contrastText }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
