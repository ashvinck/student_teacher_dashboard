import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Dialog, DialogContent, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

import { setSearchTerm } from '../../Search/Searchslice';
import { useDeleteStaffDataMutation } from '../adminApiSlice';
import Loading from '../../../Components/Loading';
import { CustomNoRowsOverlay } from '../../../Components/NoRowsOverlay';
import { UpdateStaff } from './UpdateStaff';

export const ViewStaffInfo = ({ data }) => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  const [deleteStaffData, { isLoading }] = useDeleteStaffDataMutation(); // mutation hook for deleting staff data

  // Get the search term from Redux store
  const { searchTerm } = useSelector(setSearchTerm);

  // State for edit dialog visibility
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Getting Id for update and delete
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Edited item for update
  const [editedItem, setEditedItem] = useState({
    id: '',
    subject: '',
    name: '',
    contactInfo: '',
  });

  // Function to handle edit staff data
  const handleEdit = (id) => {
    const selectedItem = data?.find((item) => item.id === id);
    if (selectedItem) {
      setSelectedItemId(id);
      setEditedItem(selectedItem);
      setEditDialogOpen(true);
    }
  };

  const handleSaveEdit = async () => {
    setEditDialogOpen(false);
  };

  // Delete Function
  const handleDelete = (id) => {
    // Alert to confirm delete
    const confirmDelete = window.confirm(
      'Do you really want to delete this item?'
    );
    //  If yes , Call the deleteStaffData mutation with the classId and id
    if (confirmDelete) {
      deleteStaffData({ classId: classId, id })
        .unwrap()
        .then((response) => toast.success(response.message)) // Show success message using toast
        .catch((error) => {
          const errorMessage =
            error?.error?.message ||
            error?.data?.error?.message ||
            'An error occurred.';
          toast.error(errorMessage); // Show error message using toast
        });
    } else return;
  };

  // For Searching through Data
  const filteredData = data?.filter((item) => {
    const term = searchTerm ?? '';
    if (term.trim() === '') return true;
    return (
      (item.id && item.id.toLowerCase().includes(term.toLowerCase() || '')) ||
      (item.subject &&
        item.subject.toLowerCase().includes(term.toLowerCase() || '')) ||
      (item.name &&
        item.name.toLowerCase().includes(term.toLowerCase() || '')) ||
      (item.contactInfo && item.contactInfo.includes(term || ''))
    );
  });

  // Column for Data-Grid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      renderCell: (params) => (
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'subject',
      headerName: 'Subject',
      width: 200,
      renderCell: (params) => (
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'contactInfo',
      headerName: 'Contact Info',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton
            color='primary'
            onClick={() => handleEdit(params?.row?.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color='error'
            onClick={() => handleDelete(params?.row?.id)}
          >
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    // Data-Grid
    <Box sx={{ height: '100%', width: '100%', marginTop: '20px' }}>
      <ToastContainer /> {/* Container for displaying toast messages */}
      {isLoading ? (
        <Loading open={isLoading} /> // Show loading state while fetching data
      ) : (
        <>
          <DataGrid
            style={{ padding: '20px' }}
            rows={filteredData || []}
            columns={columns}
            rowsPerPageOptions={[5, 10, 20]}
            autoHeight
            disableSelectionOnClick
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
          />
          {/* ------------ Form for Updating ---------- */}
          <Dialog open={editDialogOpen} onClose={handleSaveEdit}>
            <DialogContent>
              <UpdateStaff data={editedItem} id={selectedItemId} />
            </DialogContent>
          </Dialog>
        </>
      )}
    </Box>
  );
};
