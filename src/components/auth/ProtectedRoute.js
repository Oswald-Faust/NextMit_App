import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LoginScreen } from '../../screens/auth/LoginScreen';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <LoginScreen />;
  }

  return children;
};

export default ProtectedRoute; 