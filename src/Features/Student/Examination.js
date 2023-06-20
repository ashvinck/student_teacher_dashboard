import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

import { useGetStudentDataQuery } from './studentApiSlice';
import { setSearchTerm } from '../Search/Searchslice';
import { CardWrapper } from '../../Components/CardWrapper';
import Loading from '../../Components/Loading';
import Error from '../../Components/Error';
import { CustomNoRowsOverlay } from '../../Components/NoRowsOverlay';

export const Examination = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters
  // Query hook for fetching studentData
  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentDataQuery(classId);

  //  Retrieving from Redux Store
  //  Importing values of Search from AppBar Search
  const { searchTerm } = useSelector(setSearchTerm);

  // Column for Data-Grid
  const columns = [
    { field: 'examType', headerName: 'Examination Name', width: 200 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    {
      field: 'description',
      headerName: 'Description',
      width: 600,
      renderCell: (params) => (
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {params.value}
        </div>
      ),
    },
  ];

  // For Searching through Data
  const filteredData = data?.examinations?.filter((item) => {
    const term = searchTerm ?? '';
    if (term.trim() === '') return true;
    return (
      item.examType?.toLowerCase().includes(term) ||
      item.subject?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term)
    );
  });

  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />; // Show loading state while fetching data
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <CardWrapper title='Examinations'>
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
  // Show error message if there's an error fetching data
  else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
