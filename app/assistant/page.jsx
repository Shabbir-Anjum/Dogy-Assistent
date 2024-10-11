'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Send, LogOut, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserdata } from '@/store/ChatSlice';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AssistantPage() {
  const [inputMessage, setInputMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const storedUserData = localStorage.getItem('user');
  const userData = storedUserData ? JSON.parse(storedUserData) : null;
  const dropdownRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
 console.log(userData)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setChats([...chats, { id: chats.length + 1, type: 'user', content: inputMessage }]);
      setInputMessage('');
    }
  };

  const handleQuestionClick = (question) => {
    setInputMessage(question);
    setChats([...chats, { id: chats.length + 1, type: 'user', content: question }]);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(setUser(null));
    dispatch(setUserdata(null));
    router.push('/sign-in');
  };

  const questions = [
    'Find cheapest deal',
    'Give training advice',
    'Check your food',
    'Propose an activity to do'
  ];

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-[#FDFAF3] flex flex-col">
      {/* Header */}
      <header className="shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>{/* Empty left side */}</div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-4 border px-2 py-1 rounded-xl border-[#E7DECD] hover:bg-[#E7DECD] transition-colors duration-200"
            >
              <img
                src={userData?.picture || "/default-avatar.png"}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-medium pr-10">{userData?.name || "User"}</span>
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 z-50 bg-gray-800 rounded-md shadow-lg py-1 "
                >
                  <button
                    onClick={() => {/* Handle settings */}}
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                  >
                    <Settings className="inline-block mr-2" size={16} />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                  >
                    <LogOut className="inline-block mr-2" size={16} />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-grow flex flex-col max-w-3xl mx-auto w-full p-4">
        {/* Dogy Logo Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 bg-[#FDFAF3] z-10 pb-4"
        >
          <header className="flex items-center justify-center gap-3 mb-8">
            <motion.div whileHover={{ scale: 1.1 }} className="w-14 md:w-20 relative">
              <Image
                src="/logo.svg"
                alt="dogy logo"
                width={80}
                height={80}
                layout="responsive"
              />
            </motion.div>
            <h6 className="text-foreground-col font-medium md:text-lg">
              Dogy is here to serve you
            </h6>
          </header>
        </motion.div>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto space-y-4 mb-4">
          {chats.map((chat) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  chat.type === 'user'
                    ? 'bg-gray-100'
                    : 'bg-[#FDFAF3] text-gray-800'
                }`}
              >
                {chat.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Questions Section */}
        {chats.length === 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-4 px-2">
            {questions.map((question, index) => (
              <motion.button
                key={index}
                onClick={() => handleQuestionClick(question)}
                whileHover={{ scale: 1.05 }}
                className="bg-[#E7DECD] text-gray-800 py-2 px-4 rounded-md text-sm md:text-base focus:outline-none"
              >
                {question}
              </motion.button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-gray-200 rounded-full"
            type="button"
          >
            <Camera size={24} />
          </motion.button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-[#E7DECD] focus:border-transparent"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-[#A4BA60] text-white rounded-full"
            type="submit"
          >
            <Send size={20} />
          </motion.button>
        </form>
      </main>
    </div>
    </ProtectedRoute>
  );
}