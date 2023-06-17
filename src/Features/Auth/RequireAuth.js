import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentRole, selectCurrentToken } from './AuthSlice';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }) => {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);

  return role === allowedRoles ? (
    <Outlet />
  ) : token ? (
    <Navigate to='/404' />
  ) : (
    <Navigate to='/auth/login' />
  );
};

export default RequireAuth;
