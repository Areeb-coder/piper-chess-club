import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CinematicBackground } from '../cinematic/CinematicBackground';
import { NotificationBanner } from './NotificationBanner';
import styles from './PageShell.module.css';

export const PageShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.pageShell}>
      <CinematicBackground />
      <NotificationBanner />
      <Header />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
};
