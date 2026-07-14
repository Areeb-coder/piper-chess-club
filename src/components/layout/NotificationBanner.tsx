'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './NotificationBanner.module.css';

export const NotificationBanner = () => {
  return (
    <motion.div 
      className={styles.bannerContainer}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
    >
      <Link href="/olympiad" className={styles.bannerLink}>
        <span className={styles.label}>Upcoming Championship</span>
        <span className={styles.divider}></span>
        <span className={styles.message}>The official Chess Olympiad teaser is now available.</span>
      </Link>
    </motion.div>
  );
};
