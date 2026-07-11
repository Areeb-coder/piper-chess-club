'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroScene.module.css';

interface HeroSceneProps {
  headline: string;
  subheadline: string;
  theme?: 'default' | 'olympiad' | 'womens' | 'freestyle';
  children?: React.ReactNode;
}

export const HeroScene = ({ headline, subheadline, theme = 'default', children }: HeroSceneProps) => {
  return (
    <section className={`${styles.hero} ${styles[theme]}`}>
      <div className={styles.content}>
        <motion.h1 
          className={styles.headline}
          initial={{ opacity: 1, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {headline.split('\n').map((line, lineIndex, lineArr) => (
            <React.Fragment key={lineIndex}>
              {line.split('.').map((word, index, arr) => (
                <React.Fragment key={index}>
                  <span>{word}{index !== arr.length - 1 && '.'}</span>
                  {index !== arr.length - 1 && <br className={styles.mobileBreak} />}
                </React.Fragment>
              ))}
              {lineIndex !== lineArr.length - 1 && <br className={styles.forceMobileBreak} />}
            </React.Fragment>
          ))}
        </motion.h1>
        
        <motion.p 
          className={styles.subheadline}
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          {subheadline}
        </motion.p>
        
        <motion.div 
          className={styles.actions}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {children}
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
        <div className={styles.scrollLine}></div>
      </motion.div>
    </section>
  );
};
