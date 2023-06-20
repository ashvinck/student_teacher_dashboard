import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Dialog, DialogContent, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { setSearchTerm } from '../../Search/Searchslice';
import { CustomNoRowsOverlay } from '../../../Components/NoRowsOverlay';
import { UpdateStudent } from './UpdateStudent';
import { useDeleteStudentMutation } from '../teachersApiSlice';

export const ViewStudents = ({ data }) => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters

  // mutation hook for deleting student info
  const [deleteStudent, { isLoading }] = useDeleteStudentMutation();

  // Getting Search parameters from Redux Store
  // Importing value od Search from AppBar Search
  const { searchTerm } = useSelector(setSearchTerm);

  // State for edit dialog visibility
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Getting Id for update and delete
  const [selectedItemId, setSelectedItemId] = useState(null);

  // To populate Edit Form
  const [editedItem, setEditedItem] = useState({
    id: '',
    fullname: '',
    gender: '',
    guardianDetails: '',
    contactInfo: '',
  });

  // Function to handle edit studentnInfo
  const handleEdit = (id) => {
    const selectedItem = data?.find((item) => item.id === id);
    setSelectedItemId(id);
    setEditedItem(selectedItem);
    setEditDialogOpen(true);
  };
  // Dialog close
  const handleSaveEdit = async () => {
    setEditDialogOpen(false);
  };

  // Delete Function
  const handleDelete = (id) => {
    // Alert to confirm delete
    const confirmDelete = window.confirm(
      'Do you really want to delete this item?'
    );
    //  If yes , Call the deleteAssignment mutation with the classId and id
    if (confirmDelete) {
      deleteStudent({ classId: classId, id })
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

  const columns = [
    { field: 'id', headerName: 'Roll No.', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'guardianName', headerName: 'Guardian', width: 150 },
    { field: 'contactInfo', type: 'number', headerName: 'Contact', width: 150 },
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
      setFilteredData(data || []);
    } else {
      // Filter data based on search term
      const filteredExaminations = data?.filter(
        (stdnt) =>
          stdnt.id?.includes(term) ||
          stdnt.name?.toLowerCase().includes(term) ||
          stdnt.gender?.toLowerCase().includes(term) ||
          stdnt.guardianName?.toLowerCase().includes(term) ||
          stdnt.contactInfo?.toLowerCase().includes(term)
      );
      setFilteredData(filteredExaminations || []);
    }
  }, [searchTerm, data]);

  return (
    <Box sx={{ height: 760, width: '100%', marginTop: '20px' }}>
      <DataGrid
        style={{ padding: '20px' }}
        rows={filteredData}
        columns={columns}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        localeText={{
          toolbarDensity: 'Size',
          toolbarDensityLabel: 'Size',
          toolbarDensityCompact: 'Small',
          toolbarDensityStandard: 'Medium',
          toolbarDensityComfortable: 'Large',
        }}
        components={{
          Toolbar: GridToolbar,
        }}
        // To style the toolbar of MUI
        componentsProps={{
          panel: {
            sx: {
              '& .MuiDataGrid-filterForm': {
                position: 'absolute',
                top: '-100px',
                backgroundColor: '#F8F8F8',
              },
            },
          },
        }}
        autoHeight
        disableSelectionOnClick
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
      />
      {/* ------------ Form for Updating ---------- */}
      <Dialog open={editDialogOpen} onClose={handleSaveEdit}>
        <DialogContent>
          <UpdateStudent data={editedItem} id={selectedItemId} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
