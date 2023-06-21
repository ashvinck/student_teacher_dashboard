import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Dialog, DialogContent, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { useDeleteExaminationMutation } from '../teachersApiSlice';
import { setSearchTerm } from '../../Search/Searchslice';
import { UpdateExamination } from './UpdateExamination';
import { CustomNoRowsOverlay } from '../../../Components/NoRowsOverlay';

export const ViewExaminations = ({ data }) => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  // mutation hook for deleting examination
  const [deleteExamination] = useDeleteExaminationMutation();

  // Get the search term from Redux Store
  // Importing value od Search from AppBar Search
  const { searchTerm } = useSelector(setSearchTerm);

  // State for edit dialog visibility
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Getting Id for update and delete
  const [selectedItemId, setSelectedItemId] = useState(null);

  // For selecting staff list in edit dialog
  const { staff } = data || {};

  // To populate Edit Form
  const [editedItem, setEditedItem] = useState({
    id: '',
    examtype: '',
    subject: '',
    description: '',
  });

  // Edit Function
  const handleEdit = (id) => {
    const selectedItem = data?.examinations?.find((item) => item.id === id);
    setSelectedItemId(id);
    setEditedItem(selectedItem);
    setEditDialogOpen(true);
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
    //  If yes , Call the deleteExam mutation with the classId and id
    if (confirmDelete) {
      deleteExamination({ classId: classId, id })
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

  // Column for Data-Grid
  const columns = [
    { field: 'examType', headerName: 'Examination Name', width: 200 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    {
      field: 'description',
      headerName: 'Description',
      width: 900,
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
      setFilteredData(data?.examinations || []);
    } else {
      // Filter data based on search term
      const filteredExaminations = data?.examinations?.filter(
        (examination) =>
          examination.examType?.toLowerCase().includes(term) ||
          examination.subject?.toLowerCase().includes(term) ||
          examination.description?.toLowerCase().includes(term)
      );
      setFilteredData(filteredExaminations || []);
    }
  }, [searchTerm, data?.examinations]);

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
          <UpdateExamination
            data={editedItem}
            staffData={staff}
            id={selectedItemId}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
