import React from 'react';
import styled from '@emotion/styled';
import { alpha, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateSearchTerm } from '../Features/Search/Searchslice';

// -------- Search Bar Customizations --------
const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[400], 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[400], 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

export const Searchbar = () => {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const term = event.target.value;
    console.log(term);
    dispatch(updateSearchTerm(term));
  };

  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <Search />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleInputChange}
      />
    </SearchWrapper>
  );
};
