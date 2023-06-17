import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setSearchTerm } from '../../Search/Searchslice';
import { useDeleteAssignmentMutation } from '../teachersApiSlice';
import { Box, Dialog, DialogContent, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UpdateAssignment } from './UpdateAssignment';
import { CustomNoRowsOverlay } from '../../../Components/NoRowsOverlay';

export const ViewAssignments = ({ data }) => {
  // Getting clsId
  const { classId } = useParams();

  // Delete Assignment API Call
  const [deleteAssignment] = useDeleteAssignmentMutation();

  //  Importing values of Search from AppBar Search
  const { searchTerm } = useSelector(setSearchTerm);
  // Edit Dialogue
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  // Getting Id for update and delete
  const [selectedItemId, setSelectedItemId] = useState(null);
  // To Populate Edit Form
  const [editedItem, setEditedItem] = useState({
    id: '',
    subject: '',
    description: '',
    lastDate: '',
    assignedBy: '',
  });

  // Edit Function
  const handleEdit = (id) => {
    const selectedItem = data?.assignments?.find((item) => item.id === id);
    setSelectedItemId(id);
    setEditedItem(selectedItem);
    setEditDialogOpen(true);
  };
  const handleSaveEdit = async () => {
    setEditDialogOpen(false);
  };

  // Delete Function
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Do you really want to delete this item?'
    );
    if (confirmDelete) {
      deleteAssignment({ classId: classId, id })
        .unwrap()
        .then((response) => toast.success(response.message))
        .catch((error) => toast.error(error.error || error.data.error.message));
    } else return;
  };

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

  // Columns for Data Grid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'subject', headerName: 'Subject', width: 150 },
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
    { field: 'lds', headerName: 'Last Date of Submission', width: 200 },
    { field: 'assignedBy', headerName: 'Assigned By', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton color='primary' onClick={() => handleEdit(params.row.id)}>
            <Edit />
          </IconButton>
          <IconButton color='error' onClick={() => handleDelete(params.row.id)}>
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    // Data-Grid
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
          <UpdateAssignment data={editedItem} id={selectedItemId} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
