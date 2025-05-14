import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, getCurrentUser } from './supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session on initial load
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser || null);
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } = { data: {} } } = supabase?.auth?.onAuthStateChange?.(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    ) || {};

    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  // Mock login/logout functions for demo purposes
  const login = async (userData) => {
    // In a real app, this would call supabase.auth.signIn
    setUser({
      id: 'mock-user-id',
      email: userData.email,
      user_metadata: {
        name: userData.name || 'Demo User'
      }
    });
    return { user: true, error: null };
  };

  const register = async (userData) => {
    // In a real app, this would call supabase.auth.signUp
    setUser({
      id: 'mock-user-id',
      email: userData.email,
      user_metadata: {
        name: userData.name || 'Demo User'
      }
    });
    return { user: true, error: null };
  };

  const logout = async () => {
    // In a real app, this would call supabase.auth.signOut
    setUser(null);
    return { error: null };
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
} 