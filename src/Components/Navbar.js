import React from 'react';
import {
  ChatOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Menu,
  NotificationsOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Divider,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import { Box } from '@mui/system';
import { Searchbar } from './Searchbar';
import { useTheme } from '@emotion/react';

// ----- Navbar Function -----
export const NavBar = ({
  mode,
  setMode,
  AppBar,
  open,
  openWide,
  handleDrawer,
}) => {
  return (
    <>
      <AppBar
        position='fixed'
        color='inherit'
        elevation={0}
        open={open}
        openWide={openWide}
      >
        <Toolbar>
          {/*------ Menu Icon------ */}
          <Hidden smUp>
            <Tooltip title='Menu'>
              <IconButton
                size='large'
                edge='start'
                color='primary'
                aria-label='open drawer'
                sx={{ mr: 2 }}
                onClick={handleDrawer}
              >
                <Menu />
              </IconButton>
            </Tooltip>
          </Hidden>
          <Box sx={{ flexGrow: 1 }} />
          {/*------- Search Input------- */}
          <Hidden smDown>
            <Searchbar />
          </Hidden>

          {/*--------- Nav Accessories ------- */}
          <Box sx={{ flexGrow: 1 }} />
          {/* ----Theme Icon ------ */}
          <Tooltip title='Theme'>
            <IconButton
              size='large'
              edge='start'
              color='primary'
              variant='navbtn'
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            >
              {mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
            </IconButton>
            {/* -----Chat Icon------- */}
          </Tooltip>
          <Tooltip title='Chat'>
            <IconButton size='large' color='primary'>
              <ChatOutlined />
            </IconButton>
          </Tooltip>
          {/* ----- Notification Icon------- */}
          <Tooltip title='Notifications'>
            <IconButton size='large' color='primary'>
              <NotificationsOutlined />
            </IconButton>
          </Tooltip>
          {/* ----- User Account------- */}
          <Divider orientation='vertical' variant='middle' flexItem />
          <Hidden lgDown>
            <Typography
              sx={{ color: 'primary', marginLeft: '20px', lineHeight: '21px' }}
            >
              John Doe
            </Typography>
          </Hidden>
          <Tooltip title='User Account'>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              color='primary'
            >
              <Avatar
                alt=''
                src=''
                sx={{
                  width: 32,
                  height: 32,
                  color: 'inherit',
                  backgroundColor: 'inherit',
                }}
              ></Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </>
  );
};
