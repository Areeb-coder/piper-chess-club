import React from 'react';
import styles from './ScrollScene.module.css';

interface ScrollSceneProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'scale-in';
}

export const ScrollScene = ({ children, animation = 'slide-up' }: ScrollSceneProps) => {
  return (
    <div className={`${styles.scrollScene} ${styles[animation]}`}>
      {children}
    </div>
  );
};
