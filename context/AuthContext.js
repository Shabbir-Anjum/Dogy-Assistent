import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase/config';
import { useDispatch } from 'react-redux';
import { setUser, clearUser, setUserdata } from '@/store/ChatSlice';
import Loader from '@/components/Loader';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        if (user) {
          dispatch(setUser(user.email));
          dispatch(setUserdata(user));
        } else {
          dispatch(clearUser());
        }
        setLoading(false);
      },
      (error) => {
        console.error('Auth state change error:', error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [dispatch]);

  const contextValue = useMemo(() => ({ error }), [error]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);