import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, Drawer, Hidden } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styled from '@emotion/styled';
import MuiDrawer from '@mui/material/Drawer';

import {
  selectLgView,
  selectMobView,
  toggleLgView,
  toggleMobView,
} from '../../Features/ToggleSideBar/ToggleSidebarSlice';
import Logo from '../../Assets/Images/logo512.png';
import { SideNavLinks } from './SideNavLinks';
import { drawerWidth, fullDrawerWidth } from './DrawerWidth';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.main,
  width: '2.5rem',
  height: '2.5rem',
  margin: '0.5rem',
  textAlign: 'center',
  borderRadius: '12rem',
}));

// For toggling the drawer sideways (visible above md screens)
const openedMixin = (theme) => ({
  width: fullDrawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// For toggling the drawer sideways (visible above md screens)
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: drawerWidth,
});
// Side Drawer Header
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));

// Sidebar Drawer above md screens
const DrawerWide = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'openWide',
})(({ theme, openWide }) => ({
  width: fullDrawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  border: 'none',
  ...(openWide && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!openWide && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const SidebarWrapper = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectMobView);
  const openWide = useSelector(selectLgView);

  const handleDrawer = () => {
    dispatch(toggleLgView());
    dispatch(toggleMobView());
  };

  return (
    <>
      {/* ---- Side Drawer for mob screens ---- */}
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

      {/* --- Side drawer for tab and desktop screens --- */}
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
          <SideNavLinks />

          {/* ----- Side bar Toggle Arrow Button -----  */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StyledButton onClick={handleDrawer}>
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
