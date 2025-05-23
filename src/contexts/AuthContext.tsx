
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, getStoredAuth, storeAuth, clearAuth, authenticate } from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'INITIALIZE'; payload: AuthState };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false };
    case 'INITIALIZE':
      return action.payload;
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, isAuthenticated: false });

  useEffect(() => {
    const stored = getStoredAuth();
    dispatch({ type: 'INITIALIZE', payload: stored });
  }, []);

  useEffect(() => {
    storeAuth(state);
  }, [state]);

  const login = (email: string, password: string): boolean => {
    const user = authenticate(email, password);
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      return true;
    }
    return false;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    clearAuth();
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
