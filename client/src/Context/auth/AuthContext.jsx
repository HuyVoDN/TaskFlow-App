import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
    if (authError) {
      console.log('Auth Error Updated:', authError);
    }
  }, [authError]);

  const register = async (formData) => {
    try {
      const response = await Axios.post('http://localhost:3000/auth/register', {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      console.log(response);
      if (response.request.status === 201) {
        console.log('Successfully registered'); 
        setAuthError(null);
        console.log(authError); 
        return true;
      } else {
        setAuthError(response.data.message);
        console.log(authError);
        return false;
      }
    } catch (error) {
      setAuthError(error.response.data.message);
      console.log(error.response.data.message);
      console.log(authError);
      return false;
    }
    
  };

  const login = async (formData) => {
    try {
      const response = await Axios.post('http://localhost:3000/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        console.log('Successfully logged in');
        setUser(response.data.user);
        setToken(response.data.token);
        setIsAuthenticated(true);
        setAuthError(null);
        return true;
      } else {
        setAuthError(response.data.message);
        console.log(response);
        return false;
      }
    } catch (error) {
      setAuthError(error.response.data.message);
      console.log(error.status);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setAuthError(null);
  };

  const contextValue = {
    user,
    token,
    authError,
    isAuthenticated,
    register,
    login,
    logout,
    setAuthError // Export this if you need to clear errors manually
  };

  return (
    <AuthContext.Provider value={{ user, token, authError, isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;