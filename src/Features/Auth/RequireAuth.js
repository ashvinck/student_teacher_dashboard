import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentRole, selectCurrentToken } from './AuthSlice';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }) => {
  // Retrieving from Redux Store
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);

  return role === allowedRoles ? (
    //  If allowed roles exist, render the nested routes
    <Outlet />
  ) : // else if token exists  navigate to notfound page
  token ? (
    <Navigate to='/404' />
  ) : (
    // If token does not exist , navigate to login page
    <Navigate to='/auth/login' />
  );
};

export default RequireAuth;
