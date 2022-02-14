import React from 'react';
// import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
export const ProtectedRoute = ({ children, redirectTo }) => {
  const location = useLocation();
  // const { isAuthenticated } = useSelector(state => state.auth);
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to={redirectTo} state={{ from: location }} />;
};
