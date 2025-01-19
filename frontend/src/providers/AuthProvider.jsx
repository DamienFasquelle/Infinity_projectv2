import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserInfo(decodedToken);
      const userRoles = decodedToken.roles || [];
      setIsAdmin(userRoles.includes('ROLE_ADMIN'));
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    setUserInfo(decodedToken);
    const userRoles = decodedToken.roles || [];
    setIsAdmin(userRoles.includes('ROLE_ADMIN'));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserInfo(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
