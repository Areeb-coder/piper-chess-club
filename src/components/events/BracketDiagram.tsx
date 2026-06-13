import React from 'react';
import { KnockoutBracket } from '@/lib/cms/types';
import styles from './BracketDiagram.module.css';

interface BracketDiagramProps {
  bracket: KnockoutBracket;
}

export const BracketDiagram = ({ bracket }: BracketDiagramProps) => {
  return (
    <div className={styles.bracketContainer}>
      {bracket.rounds.map((round) => (
        <div key={round.id} className={styles.round}>
          <h4 className={styles.roundName}>{round.name}</h4>
          <div className={styles.matches}>
            {round.matches.map((match) => (
              <div key={match.id} className={styles.match}>
                <div className={styles.team}>
                  <span>{match.home_team_id || 'TBD'}</span>
                  <span className={styles.score}>{match.score_home}</span>
                </div>
                <div className={styles.team}>
                  <span>{match.away_team_id || 'TBD'}</span>
                  <span className={styles.score}>{match.score_away}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
