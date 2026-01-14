import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // adjust path

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // AuthContext provides `user`

  if (loading) return null; // or a loading indicator

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  // Use role-based check to match backend's authorization
  const allowedRoles = ['admin', 'superadmin'];
  if (!allowedRoles.includes(user.role)) {
    // Logged in but not admin
    return <Navigate to="/" />;
  }

  return children; // Logged in as admin
};

export default AdminRoute;
