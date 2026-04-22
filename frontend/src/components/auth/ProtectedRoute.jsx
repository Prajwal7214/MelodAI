import React from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginRequired from './LoginRequired';

const ProtectedRoute = ({ children, pageName }) => {
  const { isLoggedIn } = useAuth();

  // Studio is open to everyone (logged in + guests)
  if (pageName === 'studio') return children;

  // All other pages require login
  if (!isLoggedIn) {
    return <LoginRequired pageName={pageName} />;
  }

  return children;
};

export default ProtectedRoute;
