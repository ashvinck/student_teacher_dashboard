import React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary[500],
    fontWeight: 'bold',
  },
}));

export const TimeTable = ({ data }) => {
  const theme = useTheme();
  return (
    <TableContainer>
      <Table
        sx={{ minHeight: { lg: '350px' } }}
        size='small'
        aria-label='time table'
      >
        <TableHead sx={{ color: '#858796' }}>
          <TableRow>
            <StyledTableCell>Day</StyledTableCell>
            <StyledTableCell align='center'>1</StyledTableCell>
            <StyledTableCell align='center'>2</StyledTableCell>
            <StyledTableCell align='center'>3</StyledTableCell>
            <StyledTableCell align='center'>4</StyledTableCell>
            <StyledTableCell align='center'>5</StyledTableCell>
            <StyledTableCell align='center'>6</StyledTableCell>
            <StyledTableCell align='center'>7</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row?.day}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component='th'
                scope='row'
                sx={{
                  backgroundColor: theme.palette.primary[500],
                  fontWeight: 'bold',
                }}
              >
                {row.day}
              </TableCell>
              {row?.periods?.map((period) => (
                <TableCell align='center'>{period}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
