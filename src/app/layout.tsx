import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { PageShell } from '@/components/layout/PageShell';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Piper Chess Club',
  description: 'Think. Calculate. Dominate.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
