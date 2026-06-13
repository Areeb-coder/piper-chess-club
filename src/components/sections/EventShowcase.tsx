'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GlassCard } from '../ui/GlassCard';
import styles from './EventShowcase.module.css';

const events = [
  {
    id: 'olympiad',
    title: 'Chess Olympiad',
    description: 'The flagship world-cup style tournament of Piper Chess Club.',
    accent: '#D4AF37', // Gold
    link: '/events/olympiad'
  },
  {
    id: 'freestyle',
    title: 'Freestyle Chess',
    description: 'Innovative, unpredictable, and grid-breaking formats.',
    accent: '#E74C3C', // Red
    link: '/events/freestyle'
  },
  {
    id: 'candidates',
    title: 'Candidates',
    description: 'Elite and exclusive. Only the strongest survive.',
    accent: '#FAFAFA', // White/Silver
    link: '/events/candidates'
  },
  {
    id: 'womens',
    title: "Women's Olympiad",
    description: 'A dedicated premium championship experience.',
    accent: '#9B59B6', // Purple
    link: '/events/womens'
  }
];

export const EventShowcase = () => {
  return (
    <div className={styles.grid}>
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href={event.link} className={styles.linkWrapper}>
            <GlassCard className={styles.eventCard}>
              <div 
                className={styles.glow} 
                style={{ background: `radial-gradient(circle at top right, ${event.accent}33, transparent 70%)` }}
              />
              <h3 className={styles.title} style={{ color: event.accent }}>{event.title}</h3>
              <p className={styles.desc}>{event.description}</p>
              <div className={styles.exploreLine}>
                <span className={styles.exploreText}>EXPLORE</span>
                <div className={styles.line} style={{ background: `linear-gradient(to right, ${event.accent}, transparent)` }}></div>
              </div>
            </GlassCard>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
