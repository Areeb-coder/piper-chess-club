'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import styles from './EventGallery.module.css';

interface EventGalleryProps {
  urls: string[];
}

export const EventGallery: React.FC<EventGalleryProps> = ({ urls }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const previewUrls = urls.slice(0, 3); // Use up to 3 for the stack

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % urls.length);
  }, [urls.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? urls.length - 1 : prev - 1));
  }, [urls.length]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleNext, handlePrev]);

  if (!urls || urls.length === 0) return null;

  return (
    <>
      <GlassCard className={styles.galleryCard}>
        <div 
          className={styles.stackWrapper}
          onClick={() => {
            setCurrentIndex(0);
            setIsOpen(true);
          }}
        >
          {previewUrls.map((url, i) => {
            // Apply slight rotation and translation to create a stack effect
            const rotation = i === 0 ? 0 : i === 1 ? 4 : -3;
            const yOffset = i === 0 ? 0 : i === 1 ? 10 : 20;
            const zIndex = 10 - i;
            
            return (
              <motion.div 
                key={url + i}
                className={styles.stackedPhoto}
                style={{ 
                  rotate: rotation,
                  y: yOffset,
                  zIndex
                }}
                whileHover={i === 0 ? { y: -5, scale: 1.02 } : {}}
              >
                <Image 
                  src={url} 
                  alt={`Gallery Preview ${i + 1}`} 
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {i === 0 && (
                  <div className={styles.overlay}>
                    <span className={styles.viewText}>
                      View Gallery ({urls.length})
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Fullscreen Viewer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>

            {urls.length > 1 && (
              <>
                <button 
                  className={`${styles.navBtn} ${styles.prevBtn}`} 
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                >
                  ←
                </button>
                <button 
                  className={`${styles.navBtn} ${styles.nextBtn}`} 
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                >
                  →
                </button>
              </>
            )}

            <div className={styles.counter}>
              {currentIndex + 1} / {urls.length}
            </div>

            <motion.div 
              className={styles.lightboxContent}
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.lightboxImageWrapper}>
                <Image 
                  src={urls[currentIndex]}
                  alt={`Gallery Image ${currentIndex + 1}`}
                  fill
                  className={styles.lightboxImage}
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
