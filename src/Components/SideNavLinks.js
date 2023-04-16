import React from 'react';
import { useState } from 'react';
import * as icons from '@mui/icons-material';
import NavbarLinks from '../Data/Sidebar.json';
import { useTheme } from '@emotion/react';
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  alpha,
} from '@mui/material';
import styled from '@emotion/styled';

export const SideNavLinks = ({ openWide }) => {
  // Hook for opening sub-menu
  const [openFolder, setOpenFolder] = useState('');

  // Custom List Item
  const StyledListItemButton = styled(ListItemButton)(() => ({
    flexDirection: openWide ? 'row' : 'column',
    justifyContent: openWide ? 'initial' : 'center',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.primary[50] : '#00386F',
    },
    '&:focus': {
      borderRight: `3px solid ${theme.palette.primary[500]}`,
      backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.primary[50] : '#00386F',
      color: theme.palette.primary.main,
    },
  }));
  // Custom List Icon
  const StyledListItemIcon = styled(ListItemIcon)(() => ({
    justifyContent: openWide ? 'initial' : 'center',
    color: theme.palette.primary[500],
  }));

  const theme = useTheme();

  // handle to toggle sub-menu
  const handleClick = (links) => {
    openFolder === links ? setOpenFolder('') : setOpenFolder(links);
  };

  return (
    <>
      {/* Mapping Division-wise */}
      {NavbarLinks.map((item) => (
        <div key={item.division}>
          {/* ------ Sidebar Main list------ */}
          <List
            key={item.division}
            component='nav'
            aria-labelledby='nested-list-subheader'
            // Subheading
            subheader={
              <ListSubheader
                component='div'
                id='nested-list-subheader'
                sx={{
                  backgroundColor: 'inherit',
                  color: theme.palette.text.disabled,
                }}
              >
                {item.division}
              </ListSubheader>
            }
          >
            {/* Function to generate list accordingly wrt to children available */}
            {/* Mapping Section-wise */}
            {item.section.map((links) => {
              const Icon = icons[links.icon];
              return links.options ? (
                <ListItem
                  key={links.title}
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <StyledListItemButton
                    onClick={() => {
                      handleClick(links);
                    }}
                  >
                    <StyledListItemIcon>
                      {<Icon sx={{ fontSize: '1.3rem' }}>{links.icon}</Icon>}
                    </StyledListItemIcon>
                    <ListItemText
                      primary={links.title}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                      }}
                      sx={{ my: 0 }}
                    />
                    {links === openFolder ? (
                      <icons.ExpandLess
                        sx={{ display: openWide ? 'block' : 'none' }}
                      />
                    ) : (
                      <icons.ExpandMore
                        sx={{ display: openWide ? 'block' : 'none' }}
                      />
                    )}
                  </StyledListItemButton>

                  {/* Mapping options-wise */}
                  {links.options.map((sublinks) => {
                    const Icons = icons[sublinks.icon];
                    return (
                      <Collapse
                        in={links === openFolder}
                        timeout='auto'
                        key={sublinks.title}
                        unmountOnExit
                      >
                        <List
                          component='div'
                          disablePadding
                          sx={{
                            backgroundColor: alpha(
                              theme.palette.grey[500],
                              0.15
                            ),
                          }}
                        >
                          <StyledListItemButton
                            variant='sidenav'
                            sx={{ px: 3 }}
                          >
                            <StyledListItemIcon>
                              {
                                <Icons sx={{ fontSize: '1.2rem' }}>
                                  {sublinks.icon}
                                </Icons>
                              }
                            </StyledListItemIcon>
                            <ListItemText
                              primary={sublinks.title}
                              primaryTypographyProps={{
                                fontSize: 12,
                                fontWeight: 'small',
                                lineHeight: '20px',
                              }}
                            />
                          </StyledListItemButton>
                        </List>
                      </Collapse>
                    );
                  })}
                </ListItem>
              ) : (
                <StyledListItemButton key={links.title} variant='sidenav'>
                  <StyledListItemIcon>
                    {<Icon sx={{ fontSize: '1.3rem' }}>{links.icon}</Icon>}
                  </StyledListItemIcon>
                  <ListItemText
                    primary={links.title}
                    primaryTypographyProps={{
                      fontSize: 13,
                      fontWeight: 'medium',
                      lineHeight: '20px',
                      mb: '2px',
                    }}
                  />
                </StyledListItemButton>
              );
            })}
          </List>
          <Divider variant='middle' />
        </div>
      ))}
    </>
  );
};
