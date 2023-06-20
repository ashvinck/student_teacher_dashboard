import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { ArrowDropDown, KeyboardArrowRight } from '@mui/icons-material';
import {
  Box,
  Divider,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Popover,
  Select,
} from '@mui/material';

import {
  selectCurrentClassAssigned,
  selectCurrentClassId,
  selectCurrentRole,
  setClass,
} from '../../Features/Auth/AuthSlice';
import { PageTitle } from '../PageTitle';

export const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const assignedClasses = useSelector(selectCurrentClassAssigned);
  const role = useSelector(selectCurrentRole);
  const currentClassId = useSelector(selectCurrentClassId);

  const [classId, setClassId] = useState(currentClassId);
  const title = classId === 0 ? 'Select a class' : `Class ${classId}`;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'select-class' : undefined;

  // Selecting class
  const handleSubmit = () => {
    dispatch(setClass(classId));
    navigate(`${role}/${classId}`);
    handleClose();
  };

  return (
    <>
      {/* ----------- Left Side --------- */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <PageTitle title={title} />
          {/* --------- Select class arrow ------------ */}
          <IconButton color='info' onClick={handleClick}>
            <ArrowDropDown />
          </IconButton>

          {/* ------------ Popover ------------ */}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {/* ------------ Popover Content -------------- */}
            <Paper
              sx={{
                backgroundColor:
                  theme.palette.mode === 'light' ? '#fff' : '#1a2027',
                p: 2,
              }}
            >
              <Box sx={{ minWidth: '100px' }}>
                {/* --------- select class ------------- */}
                <FormControl variant='filled' fullWidth>
                  <InputLabel id='examType'>Class</InputLabel>
                  <Select
                    labelId='examType'
                    id='examType'
                    name='examType'
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                    label='Select your Class'
                  >
                    {assignedClasses.map((cls) => (
                      <MenuItem key={cls} value={cls}>
                        {cls}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {/* ------- Submit Button  ---------- */}
              <Box textAlign='center'>
                <Fab
                  sx={{ m: 1 }}
                  color='primary'
                  size='small'
                  onClick={handleSubmit}
                >
                  <KeyboardArrowRight />
                </Fab>
              </Box>
            </Paper>
          </Popover>
        </Box>

        {/* ------- Right Side -------- */}
        <Box>
          <PageTitle title='Welcome' />
        </Box>
      </Box>
      <Divider />
    </>
  );
};
