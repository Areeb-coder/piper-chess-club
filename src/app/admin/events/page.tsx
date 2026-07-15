'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Events.module.css';

interface Event {
  _id: string;
  name: string;
  slug: string;
  event_category: string;
  is_active: boolean;
  createdAt: string;
}

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/admin/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Failed to fetch events', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEvents(events.filter(e => e._id !== id));
      } else {
        alert('Failed to delete event');
      }
    } catch (err) {
      alert('Error deleting event');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Event Management</h1>
          <p className={styles.subtitle}>Manage flagship, rivalry, and freestyle events.</p>
        </div>
        <Link href="/admin/events/new" className={styles.addBtn}>
          + ADD NEW EVENT
        </Link>
      </header>

      {loading ? (
        <div className={styles.loader}>Loading events...</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <motion.tr 
                  key={event._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className={styles.nameCell}>
                    {event.name}
                    <span className={styles.slug}>{event.slug}</span>
                  </td>
                  <td className={styles.catCell}>{event.event_category}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${event.is_active ? styles.active : styles.draft}`}>
                      {event.is_active ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{new Date(event.createdAt).toLocaleDateString()}</td>
                  <td className={styles.actionsCell}>
                    <Link href={`/admin/events/edit/${event._id}`} className={styles.editBtn}>Edit</Link>
                    <button onClick={() => deleteEvent(event._id)} className={styles.deleteBtn}>Delete</button>
                  </td>
                </motion.tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>No events found. Create your first event.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
