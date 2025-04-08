import { createContext, useContext, useState, useEffect } from 'react';
import { getUser as getStoredUser, saveUser as storeUser, logout as clearUser } from '../utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);
  }, []);

  const login = (userData) => {
    storeUser(userData);
    setUser(userData);
  };

  const logout = () => {
    clearUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
