import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';

import {
  useAddAttendanceMutation,
  useGetTeacherDataQuery,
} from '../teachersApiSlice';
import { CardWrapper } from '../../../Components/CardWrapper';
import Loading from '../../../Components/Loading';
import Error from '../../../Components/Error';

const StyledButton = styled(Button)(() => ({
  color: '#4e73df',
  fontWeight: '600',
  variant: 'contained',
}));

export const Attendance = () => {
  const { classId } = useParams(); //for identifying the class

  // GET Data
  const { data, isLoading, isSuccess, isError, error } =
    useGetTeacherDataQuery(classId);

  const [addAttendance] = useAddAttendanceMutation();

  const students = data?.studentInfo;

  // Getting Today's Date
  const currentDate = dayjs(new Date().toString()).format('DD/MMM/YYYY');

  // console.log(students);

  // For attendance
  const [attendance, setAttendance] = useState([]);

  // Handling Present or Absent
  const handleRadioChange = (index, value) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index] = value;
    setAttendance(updatedAttendance);
  };

  // Color change according to Attendance
  const getLabelColor = (index) => {
    const status = attendance[index];
    return status === 'Present' ? '#4e73df' : 'red';
  };

  // Clear the Attendance sheet
  const handleClearAttendance = () => {
    setAttendance([]);
  };

  // For quick marking if all are present
  const handleAllPresent = () => {
    const updatedAttendance = students.map(() => 'Present');
    setAttendance(updatedAttendance);
  };

  // Handling Data
  const handleAttendance = () => {
    // Calculate the attendance percentage
    const presentCount = attendance.filter(
      (status) => status === 'Present'
    ).length;
    const totalStudents = students.length;
    const attendancePercentage = ((presentCount / totalStudents) * 100).toFixed(
      2
    );

    // Filter and output only the absentees
    const absentArray = students.filter(
      (student, index) => attendance[index] !== 'Present'
    );
    let absentees = absentArray.map((student) => ({
      name: student.name,
      rollno: student.id,
    }));
    if (absentees.length === 0) {
      absentees = ['All Present'];
    }

    // Attendance object to send to API
    const attendanceObject = {
      date: currentDate,
      absentees: absentees,
      attendancePercentage: attendancePercentage,
    };
    console.log('data', attendanceObject);
    Attndnce(attendanceObject);
  };

  const Attndnce = (data) => {
    addAttendance({ classId: classId, data })
      .unwrap()
      .then((response) => toast.success(response.message))
      .catch((error) => toast.error(error.error || error.data.error.message));
  };

  //  Handling Page Display
  let content;
  if (isLoading) {
    content = <Loading open={isLoading} />;
  } else if (isSuccess) {
    content = (
      <CardWrapper title='Attendance'>
        <ToastContainer />
        <Box>
          <Typography
            variant='h6'
            component='h2'
            textAlign='center'
            gutterBottom
            sx={{ color: '#4e73df', fontWeight: '600' }}
          >
            {currentDate}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography
                      variant='body1'
                      component='span'
                      style={{
                        color: getLabelColor(index),
                        fontWeight: 'bold',
                      }}
                    >
                      {student.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant='body1'
                      component='span'
                      style={{
                        color: getLabelColor(index),
                        fontWeight: 'bold',
                      }}
                    >
                      {student.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      value={attendance[index] || 'Absent'}
                      onChange={(event) =>
                        handleRadioChange(index, event.target.value)
                      }
                      row
                    >
                      <FormControlLabel
                        value='Present'
                        control={<Radio />}
                        label='Present'
                      />
                      <FormControlLabel
                        value='Absent'
                        control={<Radio color='error' />}
                        label='Absent'
                      />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box mt={2} display='flex' justifyContent='space-between'>
            <StyledButton variant='outlined' onClick={handleAllPresent}>
              All Present
            </StyledButton>
            <StyledButton variant='outlined' onClick={handleAttendance}>
              Submit Attendance
            </StyledButton>
            <StyledButton variant='outlined' onClick={handleClearAttendance}>
              Clear All
            </StyledButton>
          </Box>
        </Box>
      </CardWrapper>
    );
  } else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
