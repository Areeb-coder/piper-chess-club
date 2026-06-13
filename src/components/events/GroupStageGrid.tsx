import React from 'react';
import { GroupStage } from '@/lib/cms/types';
import { GlassCard } from '../ui/GlassCard';
import styles from './GroupStageGrid.module.css';

interface GroupStageGridProps {
  groups: GroupStage[];
}

export const GroupStageGrid = ({ groups }: GroupStageGridProps) => {
  if (!groups || groups.length === 0) return null;

  return (
    <div className={styles.grid}>
      {groups.map(group => (
        <GlassCard key={group.id} className={styles.groupCard}>
          <h3 className={styles.groupName}>{group.name}</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {group.standings.map((standing, i) => (
                <tr key={standing.teamId}>
                  <td className={styles.teamName}>
                    {standing.position}. {standing.teamId}
                  </td>
                  <td>{standing.played}</td>
                  <td>{standing.wins}</td>
                  <td>{standing.draws}</td>
                  <td>{standing.losses}</td>
                  <td className={styles.points}>{standing.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      ))}
    </div>
  );
};
