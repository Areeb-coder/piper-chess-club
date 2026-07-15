'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Legacy.module.css';
import { ILegacyEntry } from '@/lib/db/models/LegacyEntry';

export default function AdminLegacy() {
  const [entries, setEntries] = useState<ILegacyEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/admin/legacy');
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (err) {
      console.error('Failed to fetch legacy entries', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this legacy entry?')) return;
    try {
      const res = await fetch(`/api/admin/legacy/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEntries(entries.filter(e => String(e._id) !== id));
      } else {
        alert('Failed to delete legacy entry');
      }
    } catch (err) {
      alert('Error deleting legacy entry');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Legacy Management</h1>
          <p className={styles.subtitle}>Manage milestones, past office bearers, and memorable events.</p>
        </div>
        <Link href="/admin/legacy/new" className={styles.addBtn}>
          + ADD LEGACY ENTRY
        </Link>
      </header>

      {loading ? (
        <div className={styles.loader}>Loading legacy entries...</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Year</th>
                <th>Title</th>
                <th>Type</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <motion.tr 
                  key={String(entry._id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className={styles.nameCell}>
                    {entry.year}
                  </td>
                  <td className={styles.catCell}>{entry.title}</td>
                  <td className={styles.catCell}>
                    <span className={`${styles.statusBadge} ${styles.active}`}>
                      {entry.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{new Date(entry.createdAt).toLocaleDateString()}</td>
                  <td className={styles.actionsCell}>
                    <Link href={`/admin/legacy/edit/${entry._id}`} className={styles.editBtn}>Edit</Link>
                    <button onClick={() => deleteEntry(String(entry._id))} className={styles.deleteBtn}>Delete</button>
                  </td>
                </motion.tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>No legacy entries found. Create your first entry.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
