'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './EventForm.module.css';

export default function NewEvent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    short_tagline: '',
    event_category: 'flagship',
    visibility_rank: 0,
    primary_color: '#D4AF37',
    overview_richtext: '',
    format_summary: '',
    typical_time_control: '',
    is_active: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => {
      const next = { ...prev, [name]: val };
      if (name === 'name' && !prev.slug) {
        next.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/events');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create event');
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
          <Link href="/admin/events" className={styles.backLink}>← Back to Events</Link>
          <h1 className={styles.title}>Create New Event</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label>Event Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label>Slug (URL)</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label>Category</label>
            <select name="event_category" value={formData.event_category} onChange={handleChange}>
              <option value="flagship">Flagship</option>
              <option value="womens">Women's</option>
              <option value="freestyle">Freestyle</option>
              <option value="rivalry">Rivalry</option>
              <option value="freshers">Freshers</option>
              <option value="department">Department</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Short Tagline</label>
            <input type="text" name="short_tagline" value={formData.short_tagline} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label>Primary Color (Hex)</label>
            <input type="text" name="primary_color" value={formData.primary_color} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label>Visibility Rank (0-100)</label>
            <input type="number" name="visibility_rank" value={formData.visibility_rank} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label>Time Control</label>
            <input type="text" name="typical_time_control" value={formData.typical_time_control} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label>Format Summary</label>
            <input type="text" name="format_summary" value={formData.format_summary} onChange={handleChange} required />
          </div>
        </div>

        <div className={styles.fullWidthGroup}>
          <label>Overview (Rich Text Markdown)</label>
          <textarea 
            name="overview_richtext" 
            value={formData.overview_richtext} 
            onChange={handleChange} 
            rows={10} 
            required 
            placeholder="Use Markdown for formatting (**bold**, # heading, etc.)"
          />
        </div>

        <div className={styles.checkboxGroup}>
          <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleChange} />
          <label htmlFor="is_active">Publish immediately (Uncheck to save as Draft)</label>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'SAVING...' : 'SAVE EVENT'}
          </button>
        </div>
      </form>
    </div>
  );
}
