import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinedDate: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: { name: string; email: string; phone: string; password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    if (email && password) {
      const mockUser: User = {
        id: 'user-1',
        name: 'John Doe',
        email: email,
        phone: '+91 9876543210',
        joinedDate: '2024-01-15'
      };
      
      setState({
        user: mockUser,
        isAuthenticated: true
      });
      return true;
    }
    return false;
  };

  const signup = async (userData: { name: string; email: string; phone: string; password: string }): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    setState({
      user: newUser,
      isAuthenticated: true
    });
    return true;
  };

  const logout = () => {
    setState({
      user: null,
      isAuthenticated: false
    });
  };

  const updateProfile = (userData: Partial<User>) => {
    if (state.user) {
      setState(prev => ({
        ...prev,
        user: { ...prev.user!, ...userData }
      }));
    }
  };

  return (
    <AuthContext.Provider value={{
      state,
      login,
      signup,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};