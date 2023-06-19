import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetStudentDataQuery } from './studentApiSlice';
import { useSelector } from 'react-redux';
import { setSearchTerm } from '../Search/Searchslice';
import Loading from '../../Components/Loading';
import { CardWrapper } from '../../Components/CardWrapper';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CustomNoRowsOverlay } from '../../Components/NoRowsOverlay';
import Error from '../../Components/Error';

export const Results = () => {
  const { classId } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentDataQuery(classId);

  //  Importing values of Search from AppBar Search
  const { searchTerm } = useSelector(setSearchTerm);

  // Column for Data-Grid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'examType', headerName: 'Examination Name', width: 200 },
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
  const filteredData = data?.results?.filter((item) => {
    const term = searchTerm ?? '';
    if (term.trim() === '') return true;
    return (
      item.id?.toLowerCase().includes(term) ||
      item.examType?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term)
    );
  });

  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />;
  } else if (isSuccess) {
    content = (
      <CardWrapper title='Results'>
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
