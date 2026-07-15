import React from 'react';
import Link from 'next/link';
import styles from './Dashboard.module.css';

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Control center for Piper Chess Club</p>
      </header>

      <section className={styles.statsGrid}>
        <StatCard title="Total Events" value="12" />
        <StatCard title="Upcoming Events" value="1" highlight />
        <StatCard title="Team Members" value="24" />
        <StatCard title="Legacy Records" value="5" />
        <StatCard title="Gallery Photos" value="142" />
        <StatCard title="Posters" value="8" />
        <StatCard title="Active Sessions" value="1" />
      </section>

      <section className={styles.actionsSection}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <ActionCard label="Add Event" href="/admin/events/new" icon="+" />
          <ActionCard label="Add Team Member" href="/admin/team/new" icon="+" />
          <ActionCard label="Upload Poster" href="/admin/media?tab=posters" icon="↑" />
          <ActionCard label="Upload Gallery" href="/admin/media?tab=gallery" icon="↑" />
          <ActionCard label="Edit Homepage" href="/admin/settings?tab=homepage" icon="✎" />
          <ActionCard label="Manage Upcoming" href="/admin/events?filter=upcoming" icon="⚡" />
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, highlight = false }: { title: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={`${styles.statCard} ${highlight ? styles.highlightCard : ''}`}>
      <h3 className={styles.statTitle}>{title}</h3>
      <p className={styles.statValue}>{value}</p>
    </div>
  );
}

function ActionCard({ label, href, icon }: { label: string; href: string; icon: string }) {
  return (
    <Link href={href} className={styles.actionCard}>
      <span className={styles.actionIcon}>{icon}</span>
      <span className={styles.actionLabel}>{label}</span>
    </Link>
  );
}
