import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import styles from './WinnerCard.module.css';

interface WinnerCardProps {
  rank: string;
  names: string[];
  department?: string;
  isOverallWinner?: boolean;
}

export const WinnerCard: React.FC<WinnerCardProps> = ({ rank, names, department, isOverallWinner = false }) => {
  return (
    <GlassCard className={`${styles.card} ${isOverallWinner ? styles.overallWinner : ''}`}>
      <div className={styles.rankBadge}>{rank}</div>
      {department && <div className={styles.departmentBadge}>{department}</div>}
      <div className={styles.namesList}>
        {names.map((name, idx) => (
          <h3 key={idx} className={styles.winnerName}>{name}</h3>
        ))}
      </div>
      {isOverallWinner && <div className={styles.glowEffect} />}
    </GlassCard>
  );
};
