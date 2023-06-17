import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import {
  AppBar as MuiAppBar,
  Box,
  Divider,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  AccountCircleOutlined,
  ChatOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Menu,
  NotificationsOutlined,
} from '@mui/icons-material';

import {
  selectMobView,
  toggleLgView,
  toggleMobView,
} from '../../Features/ToggleSideBar/ToggleSidebarSlice';
import { selectTheme, toggleTheme } from '../../Features/Theme/themeSlice';
import { Searchbar } from '../Searchbar';
import { drawerWidth, fullDrawerWidth } from './DrawerWidth';
import { PopoverContainer } from './PopoverContainer';
import { UserProfile } from './UserProfile';
import { Notifications } from './Notifications';
import { Messages } from './Messages';
import { selectCurrentUser } from '../../Features/Auth/AuthSlice';

const MenuIcon = ({ onClick }) => (
  <Hidden smUp>
    <IconButton
      size='large'
      edge='start'
      color='primary'
      aria-label='open drawer'
      sx={{ mr: 2 }}
      onClick={onClick}
    >
      <Menu />
    </IconButton>
  </Hidden>
);

const ThemeToggle = ({ darkMode, onToggle }) => (
  <IconButton size='large' edge='start' color='primary' onClick={onToggle}>
    {darkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
  </IconButton>
);

// For Toggling Drawer left and right
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

export const NavBar = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectMobView);
  const darkMode = useSelector(selectTheme);
  const user = useSelector(selectCurrentUser);

  const handleDrawer = useCallback(() => {
    dispatch(toggleMobView());
    dispatch(toggleLgView());
  }, [dispatch]);

  const handleThemeToggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <AppBar position='fixed' color='inherit' elevation={0} open={open}>
      <Toolbar>
        <MenuIcon onClick={handleDrawer} />
        <Box sx={{ flexGrow: 1 }} />

        <Hidden smDown>
          <Searchbar />
        </Hidden>

        <Box sx={{ flexGrow: 1 }} />

        <ThemeToggle darkMode={darkMode} onToggle={handleThemeToggle} />

        <PopoverContainer
          buttonIcon={<ChatOutlined />}
          popoverContent={<Messages />}
        />

        <PopoverContainer
          buttonIcon={<NotificationsOutlined />}
          popoverContent={<Notifications />}
        />

        <Divider orientation='vertical' variant='middle' flexItem />

        <Hidden lgDown>
          <Typography
            sx={{ color: 'primary', marginLeft: '20px', lineHeight: '21px' }}
          >
            {user}
          </Typography>
        </Hidden>

        <PopoverContainer
          buttonIcon={
            <AccountCircleOutlined
              sx={{
                width: 32,
                height: 32,
                color: 'inherit',
                backgroundColor: 'inherit',
              }}
            />
          }
          popoverContent={<UserProfile />}
        />
      </Toolbar>
    </AppBar>
  );
};
