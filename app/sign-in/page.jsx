'use client';

import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser, setUserdata } from '@/store/ChatSlice';
import { auth } from '@/services/firebase/config';
import Image from 'next/image';
import logo from '@/public/logo.svg';

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      if (res) {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        if (!credential) {
          throw new Error('No credential from result');
        }
        const name = res.user.displayName;
        const email = res.user.email;
        router.push('/');

        sessionStorage.setItem('user', 'true');
        
        dispatch(setUser(email));
        dispatch(setUserdata(res));
      }
    } catch (e) {
      console.error('Google sign-in error:', e);
    }
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
        <button
          onClick={handleGoogleSignIn}
          className="bg-[#021927F2] text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FcGoogle size={24} />
          Sign in with Google
        </button>
      </header>

      {/* Main Content with Welcome message and Login card */}
      <div className="flex flex-col items-center justify-center gap-6 h-full">
        <h1 className="text-3xl font-bold mb-4">Ask Dogy Anything</h1>
        <div className="p-6 bg-[#FCFCFA] border-[#E7DECD] border-2 rounded-lg shadow-lg w-80 text-center">
          <h2 className="text-2xl font-semibold mb-4">Login with Google</h2>
          <button
            onClick={handleGoogleSignIn}
            className="bg-[#021927F2] text-white w-full py-2 rounded-lg mb-6 flex items-center justify-center gap-2"
          >
            <FcGoogle size={24} />
            Sign in with Google
          </button>
        </div>
        <div className="text-left">
          <ul className="list-disc ml-4">
            <li>Training Tips</li>
            <li>Test your food</li>
            <li>Find product recommandation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignIn;