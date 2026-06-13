import React from 'react';
import { GlassCard } from './GlassCard';
import styles from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: string | number;
}

export const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <GlassCard className={styles.statCard}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </GlassCard>
  );
};
