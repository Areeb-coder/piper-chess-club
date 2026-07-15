'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../TeamForm.module.css';

export default function EditTeamMember({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    photoUrl: '',
    bio: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      const res = await fetch(`/api/admin/team-members/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          name: data.name || '',
          role: data.role || '',
          photoUrl: data.photoUrl || '',
          bio: data.bio || '',
          order: data.order || 0,
          isActive: data.isActive ?? true
        });
      } else {
        alert('Failed to fetch team member');
        router.push('/admin/team');
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching team member');
    } finally {
      setLoading(false);
    }
  };

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
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/team-members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/team');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update member');
      }
    } catch (err) {
      alert('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.container}><div className={styles.header}>Loading member...</div></div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <Link href="/admin/team" className={styles.backLink}>← Back to Team Members</Link>
          <h1 className={styles.title}>Edit Team Member</h1>
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
          <button type="submit" className={styles.submitBtn} disabled={saving}>
            {saving ? 'SAVING...' : 'SAVE CHANGES'}
          </button>
        </div>
      </form>
    </div>
  );
}
