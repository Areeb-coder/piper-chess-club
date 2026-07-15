'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Team.module.css';
import { ITeamMember } from '@/lib/db/models/TeamMember';

export default function AdminTeamMembers() {
  const [members, setMembers] = useState<ITeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/admin/team-members');
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch (err) {
      console.error('Failed to fetch team members', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    try {
      const res = await fetch(`/api/admin/team-members/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMembers(members.filter(m => m._id !== id));
      } else {
        alert('Failed to delete member');
      }
    } catch (err) {
      alert('Error deleting member');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Team Members</h1>
          <p className={styles.subtitle}>Manage internal Piper Chess Club team members and leadership.</p>
        </div>
        <Link href="/admin/team/new" className={styles.addBtn}>
          + ADD MEMBER
        </Link>
      </header>

      {loading ? (
        <div className={styles.loader}>Loading members...</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, i) => (
                <motion.tr 
                  key={member._id as string}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className={styles.photoCell}>
                    {member.photoUrl ? (
                      <img src={member.photoUrl} alt={member.name} className={styles.avatar} />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className={styles.nameCell}>
                    {member.name}
                  </td>
                  <td className={styles.catCell}>{member.role || '-'}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${member.isActive ? styles.active : styles.draft}`}>
                      {member.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{new Date(member.createdAt).toLocaleDateString()}</td>
                  <td className={styles.actionsCell}>
                    <Link href={`/admin/team/edit/${member._id}`} className={styles.editBtn}>Edit</Link>
                    <button onClick={() => deleteMember(member._id as string)} className={styles.deleteBtn}>Delete</button>
                  </td>
                </motion.tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>No team members found. Add your first member.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
