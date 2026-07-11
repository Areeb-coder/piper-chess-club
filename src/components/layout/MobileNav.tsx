'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MobileNav.module.css';

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={styles.hamburgerBtn}
        aria-label="Toggle Menu"
      >
        <span className={styles.line} style={{ transform: isOpen ? 'rotate(45deg) translateY(6px) translateX(5px)' : 'none' }}></span>
        <span className={styles.line} style={{ opacity: isOpen ? 0 : 1 }}></span>
        <span className={styles.line} style={{ transform: isOpen ? 'rotate(-45deg) translateY(-6px) translateX(5px)' : 'none' }}></span>
      </button>

      <AnimatePresence>
        {isOpen && mounted && createPortal(
          <>
            <motion.div 
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
            />
            
            <motion.div 
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x > 100 || velocity.x > 500) {
                  closeMenu();
                }
              }}
            >
              <div className={styles.navLinks}>
                <Link href="/" onClick={closeMenu} className={styles.navLink}>Home</Link>
                <Link href="/events" onClick={closeMenu} className={styles.navLink}>Events</Link>
                <Link href="/legacy" onClick={closeMenu} className={styles.navLink}>Legacy</Link>
                <Link href="/team" onClick={closeMenu} className={styles.navLink}>Team</Link>
                <div className={styles.joinBtn}>
                  <Link href="/community" onClick={closeMenu} className="btn-primary" style={{ display: 'block', width: '100%' }}>Join</Link>
                </div>
              </div>
            </motion.div>
          </>,
          document.body
        )}
      </AnimatePresence>
    </>
  );
};
