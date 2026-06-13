import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Piper Chess Club. Think. Calculate. Dominate.</p>
    </footer>
  );
};
