import React, { useState } from 'react';
import { Popover, IconButton } from '@mui/material';

export const PopoverContainer = ({ buttonIcon, popoverContent }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'custom-popover' : undefined;

  return (
    <>
      <IconButton size='large' color='primary' onClick={handleOpen}>
        {buttonIcon}
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {popoverContent}
      </Popover>
    </>
  );
};
