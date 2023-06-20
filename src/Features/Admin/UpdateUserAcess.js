import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import ClassInfo from '../../Data/Classes.json';
import { CardWrapper } from '../../Components/CardWrapper';
import { useUpdateUserMutation } from './adminApiSlice';
import Loading from '../../Components/Loading';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const accessArray = ['admin', 'teacher', 'student'];

// Define Form validation schema using yup
const ValidationSchema = yup.object({
  classAssigned: yup.array().required('Select Accessible classes'),
  role: yup.string().required('Please enter the role of the user'),
  dashboardAccess: yup.boolean().required('Select the status of the user'),
});

export const UpdateUserAccess = ({ data }) => {
  // Mutation hook for handling update of users
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // Function to handle update userAccess data
  const updateUserAccessData = (data) => {
    // Call the updateStaffData mutation with the classId and staff data
    updateUser(data)
      .unwrap()
      .then((response) => toast.success(response.message)) // Show success message using toast
      .catch((error) => {
        const errorMessage =
          error?.error?.message ||
          error?.data?.error?.message ||
          'An error occurred.';
        toast.error(errorMessage); // Show error message using toast
      });
  };
  // Formik form Handling
  const formik = useFormik({
    initialValues: {
      email: data?.email,
      classAssigned:
        data?.access?.classAssigned.map((classAssigned) =>
          parseInt(classAssigned, 10)
        ) || [],
      role: data?.access?.role,
      dashboardAccess: data?.dashboardAccess,
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      const data = {
        email: values.email,
        dashboardAccess: values.dashboardAccess,
        access: {
          role: values.role,
          classAssigned: values.classAssigned,
        },
      };
      updateUserAccessData(data); // Call updateAcessfunction to handle form submission
    },
  });

  return (
    <CardWrapper title='Update User Access'>
      <ToastContainer /> {/* Container for displaying toast messages */}
      {isLoading ? (
        <Loading open={isLoading} /> // Show loading indicator while submitting data
      ) : (
        <Box
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '30px',
          }}
          onSubmit={formik.handleSubmit}
        >
          {/* ---------- Dashboard Access ----------- */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <FormLabel component='legend'>Dashboard Access</FormLabel>
            <Switch
              id='dashboardAccess'
              name='dashboardAccess'
              checked={formik.values.dashboardAccess}
              onChange={formik.handleChange}
            />
          </Box>

          {/* ----------- Disabled Email ------------ */}
          <TextField
            id='email'
            value={formik.values.email}
            label='Email'
            disabled
            fullWidth
          />

          {/* -------- Multiple Select ClassAssigned -------  */}
          <FormControl fullWidth>
            <InputLabel id='demo-multiple-checkbox-label'>
              Classes Assigned
            </InputLabel>
            <Select
              labelId='demo-multiple-checkbox-label'
              id='demo-multiple-checkbox'
              multiple
              value={formik.values.classAssigned}
              onChange={(event) => {
                const { value } = event.target;
                formik.setFieldValue('classAssigned', value);
              }}
              onBlur={formik.handleBlur}
              input={<OutlinedInput label='Classes Assigned' />}
              error={
                formik.touched.classAssigned &&
                Boolean(formik.errors.classAssigned)
              }
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {ClassInfo.map((cls) => (
                <MenuItem key={cls.title} value={parseInt(cls.title, 10)}>
                  <Checkbox
                    checked={formik.values.classAssigned.includes(
                      parseInt(cls.title, 10)
                    )}
                  />
                  <ListItemText primary={cls.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            error={formik.touched.role && Boolean(formik.errors.role)}
          >
            <InputLabel id='role'>Role</InputLabel>
            <Select
              labelId='role'
              id='role'
              name='role'
              value={formik.values.role}
              onChange={formik.handleChange}
              label='Select Role'
            >
              {accessArray.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* ---------- Submit Button --------- */}
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </Box>
      )}
    </CardWrapper>
  );
};
