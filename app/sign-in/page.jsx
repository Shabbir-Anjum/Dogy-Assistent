'use client';

import { setUser, setUserdata } from '@/store/ChatSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/public/logo.svg';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const googleButtonRef1 = useRef(null);
  const googleButtonRef2 = useRef(null);

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = initializeGoogleSignIn;

      return () => {
        document.body.removeChild(script);
      };
    };

    loadGoogleScript();

    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(setUser(userData.email));
      dispatch(setUserdata(userData));
      router.push('/');
    }
  }, [dispatch, router]);

  const initializeGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: `${process.env.NEXT_PUBLIC_GOOGLE}`,
        callback: handleCredentialResponse,
      });

      [googleButtonRef1, googleButtonRef2].forEach(ref => {
        window.google.accounts.id.renderButton(
          ref.current,
          { theme: 'filled_black', size: 'large', width: '100%', type: 'standard' }
        );
      });
    }
  };

  const handleCredentialResponse = (response) => {
    // Decode the JWT token
    const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));

    // Extract user information
    const { name, email, picture } = decodedToken;
    
    console.log(name, email, picture);

    // Store user information in localStorage
    const userData = { name, email, picture };
    localStorage.setItem('user', JSON.stringify(userData));

    // Update Redux state
    dispatch(setUser(email));
    dispatch(setUserdata(userData));
    console.log(userData)

    // Redirect to home page
    router.push('/');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {/* Header with Logo on the left and Google Login button on the right */}
      <header className="w-full flex justify-between items-center flex-col md:flex-row shadow-md p-4">
        <div className='flex items-center gap-2'>
          <div className="w-14 md:w-20 md:max-w-20">
            <Image
              src={logo}
              alt="dogy logo"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          <h6 className="text-foreground-col font-medium md:text-md">
            Dogy is here to serve you
          </h6>
        </div>
        <div ref={googleButtonRef1} className="w-[240px]"></div>
      </header>

      {/* Main Content with Welcome message and Login card */}
      <div className="flex flex-col items-center justify-center gap-6 h-full">
        <h1 className="text-3xl font-bold mb-4">Ask Dogy Anything</h1>
        <div className="p-6 bg-[#FCFCFA] border-[#E7DECD] border-2 rounded-lg shadow-lg w-80 text-center">
          <div ref={googleButtonRef2} className="w-full"></div>
        </div>
        <div className="text-left">
          <ul className="list-disc ml-4">
            <li>Training Tips</li>
            <li>Test your food</li>
            <li>Find product recommendation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignIn;