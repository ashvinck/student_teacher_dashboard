import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { formatDate } from '@fullcalendar/core';
import { CardWrapper } from './CardWrapper';

export const Events = (events) => {
  return (
    <CardWrapper title='Events'>
      <Box sx={{ my: 3 }}>
        <Paper sx={{ p: 2 }} elevation={3}>
          {/* <Typography variant='h5'>Events</Typography> */}
          <List>
            {events?.events?.map((evt) => (
              <ListItem key={evt.id}>
                <ListItemText
                  primary={evt.title}
                  secondary={
                    <Typography>
                      {formatDate(evt.start, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Typography>
                  }
                ></ListItemText>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </CardWrapper>
  );
};
