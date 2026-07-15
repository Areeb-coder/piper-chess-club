'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../TeamForm.module.css';

export default function NewTeamMember() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    photoUrl: '',
    bio: '',
    order: 0,
    isActive: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: parseInt(e.target.value) || 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/team-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/team');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create member');
      }
    } catch (err) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <Link href="/admin/team" className={styles.backLink}>← Back to Team Members</Link>
          <h1 className={styles.title}>Add Team Member</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label>Role / Position</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label>Photo URL (Optional)</label>
            <input type="url" name="photoUrl" value={formData.photoUrl} onChange={handleChange} placeholder="https://..." />
          </div>
          
          <div className={styles.inputGroup}>
            <label>Sort Order (Optional)</label>
            <input type="number" name="order" value={formData.order} onChange={handleNumberChange} />
          </div>
        </div>

        <div className={styles.fullWidthGroup}>
          <label>Bio / Description (Optional)</label>
          <textarea 
            name="bio" 
            value={formData.bio} 
            onChange={handleChange} 
            rows={4} 
          />
        </div>

        <div className={styles.checkboxGroup}>
          <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} />
          <label htmlFor="isActive">Active Member (shows on public site)</label>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'SAVING...' : 'SAVE MEMBER'}
          </button>
        </div>
      </form>
    </div>
  );
}
