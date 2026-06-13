import React from 'react';
import Link from 'next/link';
import { MobileNav } from './MobileNav';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={`${styles.header} glass-panel`}>
      <div className={styles.logo}>
        <Link href="/">Piper Chess</Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/events">Events</Link>
        <Link href="/legacy">Legacy</Link>
        <Link href="/team" className="hidden md:inline-block">Team</Link>
        <div className="hidden md:block">
          <Link href="/community" className="btn-primary text-sm px-4 py-2">Join</Link>
        </div>
      </nav>
      <MobileNav />
    </header>
  );
};
