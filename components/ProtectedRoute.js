'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const user = useSelector((state) => state.chat.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser && !user) {
        router.push('/sign-in');
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user, router]);

  if (isLoading) {
    return <Loader />;
  }

  return children;
};

export default ProtectedRoute;