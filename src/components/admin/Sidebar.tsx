'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Sidebar.module.css';

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Events', href: '/admin/events' },
  { label: 'Team', href: '/admin/team' },
  { label: 'Leaderboards', href: '/admin/leaderboards' },
  { label: 'Legacy', href: '/admin/legacy' },
  { label: 'Media Library', href: '/admin/media' },
  { label: 'Settings', href: '/admin/settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isAuthPage = pathname.includes('/login') || pathname.includes('/verify');

  React.useEffect(() => {
    if (isAuthPage) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let throttleTimeout: ReturnType<typeof setTimeout> | null = null;

    const logout = async () => {
      try {
        await fetch('/api/admin/logout', { method: 'POST' });
        window.location.href = '/admin/login';
      } catch (error) {
        console.error('Auto-logout failed:', error);
      }
    };

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(logout, 15 * 60 * 1000); // 15 minutes
    };

    const handleActivity = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          throttleTimeout = null;
          resetTimer();
        }, 1000); // Throttle resets to once per second
      }
    };

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach(e => document.addEventListener(e, handleActivity));
    
    resetTimer(); // Initialize on mount

    return () => {
      clearTimeout(timeoutId);
      if (throttleTimeout) clearTimeout(throttleTimeout);
      events.forEach(e => document.removeEventListener(e, handleActivity));
    };
  }, [isAuthPage]);

  if (isAuthPage) return null;

  return (
    <>
      {/* Mobile Toggle */}
      <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Menu'}
      </button>

      {/* Sidebar */}
      <motion.aside
        className={styles.sidebar}
        initial={false}
        animate={{ x: isOpen ? 0 : (isMobile ? -280 : 0) }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className={styles.logoContainer}>
          <h2 className={styles.brandTitle}>
            PIPER<br/>
            <span className={styles.brandSubtitle}>CONTROL CENTER</span>
          </h2>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className={`${styles.navLink} ${isActive ? styles.active : ''}`}>
                <span className={styles.navLabel}>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className={styles.activeIndicator}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <button className={styles.logoutBtn} onClick={async () => {
            await fetch('/api/admin/logout', { method: 'POST' });
            window.location.href = '/admin/login';
          }}>
            LOGOUT
          </button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
