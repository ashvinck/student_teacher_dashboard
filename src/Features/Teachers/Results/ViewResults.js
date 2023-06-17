import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Dialog, DialogContent, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

import { useDeleteResultMutation } from '../teachersApiSlice';
import { setSearchTerm } from '../../Search/Searchslice';
import { UpdateResults } from './UpdateResult';
import { CustomNoRowsOverlay } from '../../../Components/NoRowsOverlay';

export const ViewResults = ({ data }) => {
  // Getting ClsId
  const { classId } = useParams();

  // Delete Results API Call
  const [deleteResults] = useDeleteResultMutation();

  // Importing value od Search from AppBar Search
  const { searchTerm } = useSelector(setSearchTerm);

  // Edit Dialogue
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Getting Id for update and delete
  const [selectedItemId, setSelectedItemId] = useState(null);

  // To populate Edit Form
  const [editedItem, setEditedItem] = useState({
    id: '',
    examType: '',
    passPercentage: '',
    description: '',
  });

  // Edit Function
  const handleEdit = (id) => {
    const selectedItem = data?.results?.find((item) => item.id === id);
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
      deleteResults({ classId: classId, id })
        .unwrap()
        .then((response) => toast.success(response.message))
        .catch((error) => toast.error(error.error || error.data.error.message));
    } else return;
  };

  // Column for Data-Grid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'examType', headerName: 'Examination Name', width: 200 },
    { field: 'passPercentage', headerName: 'Pass Percentage', width: 100 },
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

  // Filtered array based on search term
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const term = searchTerm?.toLowerCase() || '';

    if (term.trim() === '') {
      // No search term, display all data
      setFilteredData(data?.results || []);
    } else {
      // Filter data based on search term
      const filteredExaminations = data?.results?.filter(
        (rslt) =>
          rslt.examType?.toLowerCase().includes(term) ||
          rslt.passPercentage?.toLowerCase().includes(term) ||
          rslt.description?.toLowerCase().includes(term)
      );
      setFilteredData(filteredExaminations || []);
    }
  }, [searchTerm, data?.results]);

  return (
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
          <UpdateResults data={editedItem} id={selectedItemId} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
