import React from 'react';
import { Box, Button, Divider, Drawer, Hidden } from '@mui/material';
import { SideNavLinks } from './SideNavLinks';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styled from '@emotion/styled';
import Logo from '../Assets/Images/logo512.png';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.main,
  width: '2.5rem',
  height: '2.5rem',
  margin: '0.5rem',
  textAlign: 'center',
  borderRadius: '12rem',
}));
export const Sidebar = ({
  open,
  drawerWidth,
  openWide,
  DrawerWide,
  handleWideDrawer,
  DrawerHeader,
}) => {
  return (
    <>
      {/* Side Drawer for mob screens */}
      <Hidden smUp>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              boxShadow: 3,
              borderRight: 'none',
            },
          }}
          variant='persistent'
          anchor='left'
          open={open}
        >
          <DrawerHeader>
            <div>
              <img src={Logo} alt='logo' height='32' width='32' />
            </div>
          </DrawerHeader>

          <Divider variant='middle' />

          {/* --- Nav Links--- */}
          <SideNavLinks />
        </Drawer>
      </Hidden>
      {/* Side drawer for tab and desktop screens */}
      <Hidden smDown>
        <DrawerWide
          variant='permanent'
          openWide={openWide}
          PaperProps={{
            sx: {
              borderRight: 'none',
            },
          }}
        >
          <DrawerHeader>
            <div>
              <img src={Logo} alt='logo' height='32' width='32' />
            </div>
          </DrawerHeader>

          <Divider variant='middle' />

          {/* --- Nav Links--- */}
          <SideNavLinks openWide={openWide} />

          {/* ----- Side bar Toggle Arrow Button -----  */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StyledButton onClick={handleWideDrawer}>
              {openWide ? (
                <ChevronLeft fontSize='large' />
              ) : (
                <ChevronRight fontSize='large' />
              )}
            </StyledButton>
          </Box>
        </DrawerWide>
      </Hidden>
    </>
  );
};