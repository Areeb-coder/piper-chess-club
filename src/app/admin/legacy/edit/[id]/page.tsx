'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../LegacyForm.module.css';

export default function EditLegacyEntry({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    title: '',
    description: '',
    type: 'milestone'
  });

  useEffect(() => {
    fetchEntry();
  }, [id]);

  const fetchEntry = async () => {
    try {
      const res = await fetch(`/api/admin/legacy/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          year: data.year || new Date().getFullYear(),
          title: data.title || '',
          description: data.description || '',
          type: data.type || 'milestone'
        });
      } else {
        alert('Failed to fetch legacy entry');
        router.push('/admin/legacy');
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching legacy entry');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'year' ? parseInt(value) || value : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/legacy/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/legacy');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update legacy entry');
      }
    } catch (err) {
      alert('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.container}><div className={styles.header}>Loading legacy entry...</div></div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <Link href="/admin/legacy" className={styles.backLink}>← Back to Legacy</Link>
          <h1 className={styles.title}>Edit Legacy Entry</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label>Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label>Entry Type</label>
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="milestone">Milestone</option>
              <option value="office_bearers">Office Bearers</option>
              <option value="memorable_event">Memorable Event</option>
            </select>
          </div>
        </div>

        <div className={styles.fullWidthGroup}>
          <label>Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows={6} 
            required
          />
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
