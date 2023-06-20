import React from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

import { useGetStudentDataQuery } from './studentApiSlice';
import { setSearchTerm } from '../Search/Searchslice';
import { CardWrapper } from '../../Components/CardWrapper';
import Loading from '../../Components/Loading';
import Error from '../../Components/Error';
import { CustomNoRowsOverlay } from '../../Components/NoRowsOverlay';
import { useParams } from 'react-router-dom';

// Renders the Assignments of particular classes based in classId
export const Assignments = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters
  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentDataQuery(classId); // Fetch studentData based on the ClassId

  // Get the search term from Redux store
  //  Importing values of Search from AppBar Search
  const { searchTerm } = useSelector(setSearchTerm);

  // Columns for DataGrid MUI component
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'subject', headerName: 'Subject Name', width: 175 },
    {
      field: 'description',
      headerName: 'Description',
      width: 500,
      renderCell: (params) => (
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {params.value}
        </div>
      ),
    },
    { field: 'date', headerName: 'Last Date of Submission', width: 200 },
    { field: 'assignedBy', headerName: 'Assigned By', width: 150 },
  ];

  // For Searching through Data
  const filteredData = data?.assignments?.filter((item) => {
    const term = searchTerm ?? '';
    if (term.trim() === '') return true;
    return (
      (item.subject &&
        item.subject.toLowerCase().includes(term.toLowerCase() || '')) ||
      (item.description &&
        item.description.toLowerCase().includes(term.toLowerCase() || '')) ||
      (item.lastDate && item.lastDate.includes(term || '')) ||
      (item.assignedBy &&
        item.assignedBy.toLowerCase().includes(term.toLowerCase() || ''))
    );
  });
  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />; // Show loading state while fetching data
  }
  // Render content if Fetch is Success
  else if (isSuccess) {
    content = (
      <CardWrapper title='Assignments'>
        <Box sx={{ height: '100%', width: '100%', marginTop: '20px' }}>
          <DataGrid
            style={{ padding: '20px' }}
            rows={filteredData}
            columns={columns}
            autoHeight
            pageSizeOptions={[10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
          />
        </Box>
      </CardWrapper>
    );
  }
  // IF fetch returns error
  else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
