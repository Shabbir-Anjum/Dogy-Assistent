'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Send } from 'lucide-react';


export default function AssistantPage() {
  const [inputMessage, setInputMessage] = useState('');
  const [chats, setChats] = useState([]);

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

  const questions = [
    'Find cheapest deal',
    'Give training advice',
    'Check your food',
    'Propose an activity to do'
  ];

  return (
    <div className="min-h-screen bg-[#FDFAF3] flex flex-col">
      {/* Header */}
      <header className="shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>{/* Empty right side */}</div>
          <div className="flex items-center space-x-4 border px-2 rounded-xl border-[#E7DECD]">
            <Image
              src="/logo.svg"
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-medium pr-10">John Doe</span>
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
  );
}