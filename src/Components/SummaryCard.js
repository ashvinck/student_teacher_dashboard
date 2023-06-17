import React from 'react';
import * as icons from '@mui/icons-material';
import {
  Grid,
  LinearProgress,
  Paper,
  Typography,
  linearProgressClasses,
  styled,
  useTheme,
} from '@mui/material';

export const SummaryCard = ({ item }) => {
  // Theme
  const theme = useTheme();

  // Linear progress bar (MUI Component)
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: item.color,
    },
  }));

  // Icons are assigned to `Icon`
  const Icon = icons[item.icon];

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderLeft: `0.25rem solid ${item.color}`,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1a2027',
      }}
    >
      <Grid container spacing={1}>
        {/* ----Column 1---- */}

        <Grid item xs={10}>
          {/* ---Title--- */}
          <Typography
            sx={{
              color: item.color,
              textTransform: 'uppercase',
              fontSize: '1rem',
              fontWeight: '600',
            }}
          >
            {item.title}
          </Typography>

          {/* ---- Row 2---- */}
          <Grid
            item
            xs
            container
            direction='row'
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Grid item xs='auto'>
              {/* ---- Progress---- */}
              <Typography
                sx={{
                  color: item.color,
                  fontSize: '1rem',
                  fontWeight: '600',
                }}
              >
                {item.progress}%
              </Typography>
            </Grid>
            {/* ----Progress bar---- */}
            <Grid item xs>
              <BorderLinearProgress
                variant='determinate'
                value={parseInt(item.progress)}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* -----Column 2------ */}
        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {
            // Card Icon
            <Icon fontSize='large' color='disabled'>
              {item.icon}
            </Icon>
          }
        </Grid>
      </Grid>
    </Paper>
  );
};
