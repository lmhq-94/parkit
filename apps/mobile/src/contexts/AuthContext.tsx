import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@parkit/shared';

// GraphQL queries and mutations
const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        firstName
        lastName
        role
        companyId
        company {
          id
          name
        }
      }
    }
  }
`;

const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      role
      companyId
      company {
        id
        name
      }
    }
  }
`;

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [getMe] = useLazyQuery(ME_QUERY);

  useEffect(() => {
    // Check for existing token on app load
    const checkToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        if (savedToken) {
          setToken(savedToken);
          // Try to get user data
          const { data } = await getMe();
          if (data?.me) {
            setUser(data.me);
          } else {
            // Token is invalid, remove it
            await AsyncStorage.removeItem('token');
            setToken(null);
          }
        }
      } catch (error) {
        console.error('Error checking token:', error);
        await AsyncStorage.removeItem('token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [getMe]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await loginMutation({
        variables: {
          input: { email, password }
        }
      });

      if (data?.login) {
        const { token: newToken, user: userData } = data.login;
        
        // Save token to AsyncStorage
        await AsyncStorage.setItem('token', newToken);
        
        // Update state
        setToken(newToken);
        setUser(userData);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    // Remove token from AsyncStorage
    await AsyncStorage.removeItem('token');
    
    // Clear state
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 