import React from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import styles from './AdminLayout.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Control Center - Piper Chess Club',
  description: 'Secure Admin Dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
