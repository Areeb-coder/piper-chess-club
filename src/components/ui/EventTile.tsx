import React from 'react';
import Link from 'next/link';
import { Event } from '@/lib/cms/types';
import { GlassCard } from './GlassCard';
import styles from './EventTile.module.css';

export const EventTile = ({ event }: { event: Event }) => {
  return (
    <Link href={`/events/${event.slug}`} className={styles.link}>
      <GlassCard interactive className={styles.tile}>
        <div className={styles.colorAccent} style={{ backgroundColor: event.primary_color }}></div>
        <h3 className={styles.title}>{event.name}</h3>
        <p className={styles.tagline}>{event.short_tagline}</p>
      </GlassCard>
    </Link>
  );
};
