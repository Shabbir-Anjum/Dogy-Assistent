'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function DogyHomePage() {
  const [formData, setFormData] = useState({
    dogName: '',
    dogAge: '',
    dogSize: '',
    dogWeight: '',
    dogBreed: '',
    isAllergic: false,
  });
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!formData.dogName || !formData.dogAge || !formData.dogSize || !formData.dogWeight || !formData.dogBreed) {
      toast.error("Please provide all information about your dog");
      return;
    }

    try {
      setPending(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dog-profile/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        router.push("/assistant");
      } else {
        throw new Error("Failed to submit dog details");
      }
    } catch (error) {
      toast.error("Error: failed to submit dog information");
    } finally {
      setPending(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto px-4 py-8 my-6 border-2 border-[#E7DECD] rounded-lg shadow-lg bg-white"
    >
      <header className="flex items-center gap-3 mb-8">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="w-14 md:w-20 relative"
        >
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

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="space-y-2"
        >
          <label htmlFor="dogName" className="block text-sm font-medium text-gray-700">What is your dog's name?</label>
          <input
            type="text"
            id="dogName"
            name="dogName"
            value={formData.dogName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#E7DECD] outline-none focus:border-transparent"
            required
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="space-y-2"
        >
          <label htmlFor="dogAge" className="block text-sm font-medium text-gray-700">How old is your dog? (in years)</label>
          <input
            type="number"
            id="dogAge"
            name="dogAge"
            value={formData.dogAge}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#E7DECD] outline-none focus:border-transparent"
            required
            min="0"
            step="0.1"
          />
        </motion.div>

        <motion.fieldset
          whileHover={{ scale: 1.02 }}
          className="space-y-2"
        >
          <legend className="text-sm font-medium text-gray-700">What size is your dog?</legend>
          <div className="flex items-center gap-5">
            {['small', 'medium', 'large'].map((size) => (
              <label key={size} className="inline-flex items-center">
                <input
                  type="radio"
                  name="dogSize"
                  value={size}
                  checked={formData.dogSize === size}
                  onChange={handleInputChange}
                  className="form-radio text-blue-600"
                  required
                />
                <span className="ml-2 capitalize">{size}</span>
              </label>
            ))}
          </div>
        </motion.fieldset>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="space-y-2"
        >
          <label htmlFor="dogWeight" className="block text-sm font-medium text-gray-700">What is your dog's weight? (in kg)</label>
          <input
            type="number"
            id="dogWeight"
            name="dogWeight"
            value={formData.dogWeight}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#E7DECD] outline-none focus:border-transparent"
            required
            min="0"
            step="0.1"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="space-y-2"
        >
          <label htmlFor="dogBreed" className="block text-sm font-medium text-gray-700">What breed is your dog?</label>
          <input
            type="text"
            id="dogBreed"
            name="dogBreed"
            value={formData.dogBreed}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#E7DECD] outline-none focus:border-transparent"
            required
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center"
        >
          <input
            type="checkbox"
            id="isAllergic"
            name="isAllergic"
            checked={formData.isAllergic}
            onChange={handleInputChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor="isAllergic" className="ml-2 block text-sm text-gray-700">
            Is your dog allergic?
          </label>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-6 bg-[#A4BA60]  font-medium text-lg rounded-xl p-3 transition duration-300 ease-in-out hover:bg-[#A4BA60] focus:outline-none focus:ring-2 focus:ring-[#A4BA60] focus:ring-opacity-50"
          type="submit"
          disabled={pending}
        >
          {pending ? (
            <span className="flex items-center justify-center">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block mr-2"
              >
                &#9696;
              </motion.span>
              Submitting...
            </span>
          ) : (
            "Create your dog profile"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}