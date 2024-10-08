import React from 'react';
import { motion } from 'framer-motion';
import { FaDog } from 'react-icons/fa';

export default function DogyLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#FDFAF3]  overflow-hidden">
      <div className="relative">
        {/* Pulsating circle */}
        <motion.div
          className="absolute inset-0 bg-black rounded-full opacity-20"
          style={{ width: '200px', height: '200px' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Rotating ring */}
        <motion.div
          className="border-4 border-white rounded-full"
          style={{ width: '200px', height: '200px' }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Dog icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-white"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaDog size={64} />
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.p
        className="mt-8  text-2xl font-semibold"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Dogy is thinking...
      </motion.p>
    </div>
  );
}