import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import { alpha } from '@mui/material/styles';
import { Hidden } from '@mui/material';

import {
  selectLgView,
  selectMobView,
} from '../../Features/ToggleSideBar/ToggleSidebarSlice';
import { NavBar } from './Navbar';
import { SidebarWrapper } from './SidebarWrapper';
import { drawerWidth, fullDrawerWidth } from './DrawerWidth';
import DashboardRoutes from '../../Routes/DashboardRoutes';
import { selectCurrentRole } from '../../Features/Auth/AuthSlice';
import { LandingPage } from './LandingPage';

// Main Container
const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'openWide',
})(({ theme, open, openWide }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  marginTop: 60,
  backgroundColor: alpha(theme.palette.grey[400], 0.15),
  [theme.breakpoints.up('sm')]: {
    marginLeft: `${drawerWidth}px`,
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
  ...(openWide && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${fullDrawerWidth}px !important`,
  }),
}));

export const LayoutContainer = () => {
  const role = useSelector(selectCurrentRole);
  const open = useSelector(selectMobView);
  const openWide = useSelector(selectLgView);

  return (
    <>
      {role ? (
        <>
          <NavBar />
          <SidebarWrapper />
          <Hidden smUp>
            <Main open={open}>
              <LandingPage />
              <DashboardRoutes />
              <Outlet />
            </Main>
          </Hidden>
          <Hidden smDown>
            <Main openWide={openWide}>
              <LandingPage />
              <DashboardRoutes />
              <Outlet />
            </Main>
          </Hidden>
        </>
      ) : (
        <Navigate to='/auth/login' />
      )}
    </>
  );
};
