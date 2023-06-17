import React from 'react';
import Table from '@mui/material/Table';
import styled from '@emotion/styled';
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

// Staff Table
export const StaffTable = ({ data }) => {
  return (
    <TableContainer>
      <Table
        size='small'
        aria-label='staff table'
        sx={{ minHeight: { lg: '350px' } }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell>Staff</StyledTableCell>
            <StyledTableCell>Contact Info</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                minHeight: { lg: '350px' },
              }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.contactInfo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
