import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@emotion/react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Box,
} from '@mui/material';

import { useUpdateTimetableMutation } from '../adminApiSlice';
import { CardWrapper } from '../../../Components/CardWrapper';
import Loading from '../../../Components/Loading';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const NUM_PERIODS = 7;

export const UpdateTimetable = ({ data }) => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters
  const theme = useTheme();

  const [updateTimetable, { isLoading }] = useUpdateTimetableMutation(); // mutation hook for updating staff data

  const [tableData, setTableData] = useState(() => initializeTableData(data));

  useEffect(() => {
    setTableData(initializeTableData(data));
  }, [data]);

  const handlePeriodChange = (dayIndex, periodIndex, value) => {
    setTableData((prevTableData) => {
      const updatedData = prevTableData.map((dayData) => ({
        day: dayData.day,
        periods: [...dayData.periods], // Make a deep copy of periods array
      }));
      updatedData[dayIndex].periods[periodIndex] = value;
      return updatedData;
    });
  };

  // Function to update the timetable
  const updateTT = (data) => {
    // Call the updateStaffData mutation with the classId and staff data
    updateTimetable({ classId: classId, data })
      .unwrap()
      .then((response) => toast.success(response.message)) // Show success message using toast
      .catch((error) => {
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          'An error occurred.';
        toast.error(errorMessage); // Show error message using toast
      });
  };

  const handleSubmit = () => {
    // Prepare the data to be sent to the API
    const timetableData = tableData.map(({ day, periods }) => ({
      day,
      periods,
    }));
    // Call updateStaff function to handle form submission
    updateTT(timetableData);
  };

  function initializeTableData(data) {
    if (data && data.length > 0) {
      // Pre-populate tableData with the provided data
      return data;
    } else {
      // Initialize tableData with empty values
      return DAYS.map((day) => ({
        day,
        periods: Array(NUM_PERIODS).fill(''),
      }));
    }
  }

  return (
    <CardWrapper title='Update Timetable'>
      <ToastContainer /> {/* Container for displaying toast messages */}
      {isLoading ? (
        <Loading open={isLoading} /> // Show loading indicator while submitting data
      ) : (
        <>
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.common.white,
                    }}
                  >
                    <strong>Day</strong>
                  </TableCell>
                  {[...Array(NUM_PERIODS)].map((_, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        width: '100px',
                      }}
                    >
                      <strong>Period {index + 1}</strong>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((data, dayIndex) => (
                  <TableRow key={data.day}>
                    <TableCell>{data.day}</TableCell>
                    {data.periods.map((period, periodIndex) => (
                      <TableCell key={periodIndex}>
                        <TextField
                          value={period}
                          onChange={(e) =>
                            handlePeriodChange(
                              dayIndex,
                              periodIndex,
                              e.target.value
                            )
                          }
                          required
                          sx={{ width: '100px' }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleSubmit}
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            Update TimeTable
          </Button>
        </>
      )}
    </CardWrapper>
  );
};
