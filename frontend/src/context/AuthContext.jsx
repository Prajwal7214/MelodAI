import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('melodai_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem('melodai_guest') === 'true';
  });

  const login = (userData) => {
    setUser(userData);
    setIsGuest(false);
    localStorage.setItem('melodai_user', JSON.stringify(userData));
    localStorage.removeItem('melodai_guest');
  };

  const signup = (userData) => {
    // Store account so "already exists" check works on next signup attempt
    const accounts = JSON.parse(localStorage.getItem('melodai_accounts') || '[]');
    accounts.push({ email: userData.email, password: userData._password });
    localStorage.setItem('melodai_accounts', JSON.stringify(accounts));

    setUser(userData);
    setIsGuest(false);
    localStorage.setItem('melodai_user', JSON.stringify(userData));
    localStorage.removeItem('melodai_guest');
  };

  const tryForFree = () => {
    setIsGuest(true);
    setUser(null);
    localStorage.setItem('melodai_guest', 'true');
    localStorage.removeItem('melodai_user');
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('melodai_user');
    localStorage.removeItem('melodai_guest');
  };

  const isLoggedIn = !!user;

  // Access control: which pages are open to whom
  const hasAccess = (page) => {
    if (page === 'home' || page === 'studio') return true;  // Public + Guest
    return isLoggedIn;                                       // All others: must login
  };

  // Helper to check if email already registered (localStorage accounts list)
  const emailExists = (email) => {
    const accounts = JSON.parse(localStorage.getItem('melodai_accounts') || '[]');
    return accounts.some(a => a.email.toLowerCase() === email.toLowerCase());
  };

  return (
    <AuthContext.Provider value={{
      user,
      isGuest,
      isLoggedIn,
      login,
      signup,
      logout,
      tryForFree,
      hasAccess,
      emailExists,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
