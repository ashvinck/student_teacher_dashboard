import dayjs from 'dayjs';
import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export const AbsentList = ({ data }) => {
  // Getting Today's Date
  const currentDate = dayjs(new Date().toString()).format('DD/MMM/YYYY');
  // Getting the absentee day of today
  let currentAbsenteeData = data?.find((arr) => arr.date === currentDate);

  return (
    <Box sx={{ height: '320px', overflow: 'auto' }}>
      {currentAbsenteeData ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Roll No</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentAbsenteeData?.absentees.map((absentee, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant='body1' component='span'>
                    {absentee?.rollno}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body1' component='span'>
                    {absentee?.name}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>No Attendance Data Found</Typography>
      )}
    </Box>
  );
};
