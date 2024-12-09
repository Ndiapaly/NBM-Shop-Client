import React from 'react';
import { motion } from 'framer-motion';

const ResponsiveLayout = ({ children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full overflow-x-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        {children}
      </div>
    </motion.div>
  );
};

export default ResponsiveLayout;
