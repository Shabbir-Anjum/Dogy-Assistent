'use client';

import { useRouter } from 'next/navigation'; 
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const user = useSelector((state) => state.chat.user);

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  if (!user) {
    return <Loader/>
  }

  return children;
};

export default ProtectedRoute;
