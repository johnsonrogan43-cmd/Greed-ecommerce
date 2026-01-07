import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // adjust path

const adminEmail = "admin@example.com"; // replace with your admin email

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // assuming your AuthContext provides `user`

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (user.email !== adminEmail) {
    // Logged in but not admin
    return <Navigate to="/" />;
  }

  return children; // Logged in as admin
};

export default AdminRoute;
