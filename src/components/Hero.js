import React from 'react';
import { inView, motion } from 'framer-motion';
import { FiCode, FiLayers, FiZap, FiArrowRight, FiPlay } from 'react-icons/fi';
import { useNavigate, useState } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/interface'); // This will redirect to the interface page
  };

  const handleWatchDemoClick = () => {
    navigate('/aude'); // This will redirect to the aude page
  };
  return (
    <div className="min-h-[50vh] bg-gradient-to-b from-indigo-900 to-black text-white pt-0 pb-12 px-9 sm:px-6 flex items-center"> {/*to change the height btw header and hero*/}
      <div className="max-w-7xl mx-auto w-full">
        {/* Headline Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 bg-gray-900 rounded-full mb-4"
          >
            <FiZap className="text-yellow-400 mr-2" />
            <span className="text-sm font-medium">No-Code Revolution</span>
          </motion.div> 
          
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-normal mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{  duration: 0.5, }}
          >
            Develop faster and smarter with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              GenBuilder
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-6"
          >
            Our low-code platform helps you create professional applications 
            without writing a single line of code.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center"
              onClick={handleGetStartedClick} // Add this onClick handler
            >
              Start Building <FiArrowRight className="ml-2" />
            </motion.button>
            
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-3"></motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center"
              onClick={handleWatchDemoClick} // Add this onClick handler
            >
              <FiPlay className="mr-2" /> Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;