import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, Box, Dialog, DialogContent } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

import { useDeleteUserMutation, useGetUsersQuery } from './adminApiSlice';
import { setSearchTerm } from '../Search/Searchslice';
import { CustomNoRowsOverlay } from '../../Components/NoRowsOverlay';
import Loading from '../../Components/Loading';
import Error from '../../Components/Error';
import { UpdateUserAccess } from './UpdateUserAcess';
import { CardWrapper } from '../../Components/CardWrapper';

export const UsersData = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  // Importing value od Search from AppBar Search
  const { searchTerm } = useSelector(setSearchTerm);

  // Edit Dialogue
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // To populate Edit Form
  const [editedItem, setEditedItem] = useState('');

  // Edit Function
  const handleEdit = (email) => {
    const selectedItem = data?.find((item) => item.email === email);
    setEditedItem(selectedItem);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    setEditDialogOpen(false);
  };
  // Getting Id for update and delete

  // Delete Function
  const handleDelete = (email) => {
    console.log(email);
    const confirmDelete = window.confirm(
      'Do you really want to delete this item?'
    );
    if (confirmDelete) {
      deleteUser({ email })
        .unwrap()
        .then((response) => toast.success(response.message))
        .catch((error) => {
          const errorMessage =
            error?.error?.message ||
            error?.data?.error?.message ||
            'An error occurred.';
          toast.error(errorMessage);
        });
    } else return;
  };

  // Column for Data-Grid
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      renderCell: (params) => (
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'classAssigned',
      headerName: 'Class Access',
      width: 200,
      valueGetter: (params) => params.row?.access?.classAssigned?.join(', '),
      renderCell: (params) => (
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'role',
      headerName: 'User Role',
      width: 80,
      valueGetter: (params) => params.row?.access?.role,
    },
    {
      field: 'dashboardAccess',
      headerName: 'Dashboard Access',
      width: 150,
      type: 'boolean',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton
            color='primary'
            onClick={() => handleEdit(params?.row?.email)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color='error'
            onClick={() => handleDelete(params?.row?.email)}
          >
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  // Filtered array based on search term
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const term = searchTerm?.toLowerCase() || '';

    if (term.trim() === '') {
      // No search term, display all data
      setFilteredData(
        data?.map((item, index) => ({
          id: index + 1,
          ...item,
        })) || []
      );
    } else {
      // Filter data based on search term
      const filteredExaminations = data
        ?.filter((user) => {
          const classAssigned = user?.access?.classAssigned;
          const lowerCaseClassAssigned =
            Array.isArray(classAssigned) && classAssigned.length > 0
              ? classAssigned
                  .map((item) => String(item))
                  .join(', ')
                  .toLowerCase()
              : String(classAssigned).toLowerCase();

          return (
            user?.email?.toLowerCase().includes(term) ||
            user?.access?.role?.toLowerCase().includes(term) ||
            lowerCaseClassAssigned?.includes(term)
          );
        })
        ?.map((item, index) => ({
          id: index + 1,
          ...item,
        }));
      setFilteredData(filteredExaminations || []);
    }
  }, [searchTerm, data]);

  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />;
  } else if (isSuccess) {
    content = (
      <CardWrapper title='User Access Control'>
        <Box sx={{ height: '100%', width: '100%', marginTop: '20px' }}>
          <ToastContainer />
          <DataGrid
            style={{ padding: '20px' }}
            rows={filteredData}
            columns={columns}
            rowsPerPageOptions={[5, 10, 20]}
            autoHeight
            disableSelectionOnClick
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
          />
          <Dialog open={editDialogOpen} onClose={handleSaveEdit}>
            <DialogContent>
              <UpdateUserAccess data={editedItem} />
            </DialogContent>
          </Dialog>
        </Box>
      </CardWrapper>
    );
  } else if (isError) {
    content = <Error error={error} />;
  }
  return content;
};
