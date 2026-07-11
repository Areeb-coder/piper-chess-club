'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './GlassCard.module.css';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  interactive?: boolean;
}

export const GlassCard = ({ children, className = '', style, interactive = false }: GlassCardProps) => {
  return (
    <motion.div 
      className={`${styles.glassCard} ${className}`}
      style={style}
      whileHover={interactive ? { y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: 'rgba(212, 175, 55, 0.3)' } : {}}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};
