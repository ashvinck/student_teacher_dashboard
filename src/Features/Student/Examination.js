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

export const Examination = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentDataQuery();

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
    content = <Loading open={isLoading} />;
  } else if (isSuccess) {
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
  } else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
