'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import styles from './EventPoster.module.css';

interface EventPosterProps {
  url: string;
}

export const EventPoster: React.FC<EventPosterProps> = ({ url }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    if (isLightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  return (
    <>
      <GlassCard className={styles.posterCard}>
        <div 
          className={styles.posterWrapper}
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image 
            src={url} 
            alt="Event Poster" 
            fill
            className={styles.posterImage}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className={styles.overlay}>
            <span className={styles.viewText}>View Poster</span>
          </div>
        </div>
      </GlassCard>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div 
              className={styles.lightboxContent}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setIsLightboxOpen(false)}>✕</button>
              <div className={styles.lightboxImageWrapper}>
                <Image 
                  src={url}
                  alt="Expanded Event Poster"
                  fill
                  className={styles.lightboxImage}
                  sizes="100vw"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
