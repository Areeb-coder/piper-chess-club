import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import styles from './LeaderboardCard.module.css';
import { EventResult } from '@/lib/cms/types';

interface LeaderboardCardProps {
  results: EventResult[];
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <GlassCard className={styles.leaderboard}>
      <h3 className={styles.title}>Final Standings</h3>
      <div className={styles.list}>
        {results.map((result, idx) => (
          <div key={idx} className={styles.row}>
            <div className={styles.rankCol}>{result.rank}</div>
            <div className={styles.namesCol}>
              {result.names.map((name, i) => (
                <span key={i} className={styles.nameItem}>
                  {name}
                  {i < result.names.length - 1 && <span className={styles.separator}> • </span>}
                </span>
              ))}
            </div>
            {result.department && (
              <div className={styles.deptCol}>{result.department}</div>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
