'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollSceneProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'scale-in';
}

export const ScrollScene = ({ children, animation = 'slide-up' }: ScrollSceneProps) => {
  const getVariants = () => {
    switch (animation) {
      case 'fade':
        return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
      case 'scale-in':
        return { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };
      case 'slide-up':
      default:
        return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <motion.div 
      className="scroll-scene-mobile-fix"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
};
