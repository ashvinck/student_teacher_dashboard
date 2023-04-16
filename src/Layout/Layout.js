import React from 'react';
import { useState } from 'react';
import { styled } from '@mui/system';
import { NavBar } from '../Components/Navbar';
import { Sidebar } from '../Components/Sidebar';
import { Paper, Typography, useTheme } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { alpha } from '@mui/material/styles';

// Mobile drawer width
const drawerWidth = 130;
// lg screen width
const fullDrawerWidth = 240;

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

// Custom AppBar styles when toggling
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'openWide',
})(({ theme, open, openWide }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('sm')]: {
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  backgroundColor: theme.palette.background.default,
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(openWide && {
    marginLeft: `${fullDrawerWidth}px !important`,
    width: `calc(100% - ${fullDrawerWidth}px) !important`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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

// Side Drawer Header
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));

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
  // backgroundColor: '#eef2f6',
  // backgroundColor: '#F6F2EE',
  backgroundColor: alpha(theme.palette.grey[400], 0.15),
  // borderRadius: '12px',
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

export const Layout = ({ mode, setMode }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openWide, setOpenWide] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleWideDrawer = () => {
    setOpenWide(!openWide);
  };
  return (
    <>
      <NavBar
        AppBar={AppBar}
        mode={mode}
        open={open}
        openWide={openWide}
        setMode={setMode}
        handleDrawer={handleDrawer}
        handleWideDrawer={handleWideDrawer}
      />
      <Sidebar
        open={open}
        theme={theme}
        drawerWidth={drawerWidth}
        fullDrawerWidth={fullDrawerWidth}
        openWide={openWide}
        DrawerWide={DrawerWide}
        handleWideDrawer={handleWideDrawer}
        DrawerHeader={DrawerHeader}
      />
      <Main open={open} openWide={openWide}>
        <Paper elevation={0} sx={{ p: 2 }}>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
        </Paper>
      </Main>
    </>
  );
};
