import { HeroScene } from '@/components/cinematic/HeroScene';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { EventShowcase } from '@/components/sections/EventShowcase';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* 1. Hero */}
      <HeroScene 
        headline="EVERY MOVE MATTERS" 
        subheadline="WHERE STRATEGY BECOMES LEGACY."
      >
        <Link href="/events" className="btn-primary">Explore Events</Link>
        <Link href="/community" className="btn-secondary">Join the Club</Link>
      </HeroScene>

      {/* 2. About Piper & 3. Achievements */}
      <section className="section-padding max-w-5xl mx-auto">
        <ScrollReveal>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                We don't play games.<br/>We play positions.
              </h2>
              <p className="text-muted leading-relaxed text-lg">
                Piper Chess Club is an arena where preparation meets instinct. 
                This is not a casual meetup. We host the toughest tournaments, 
                broadcasted and fought for fiercely. Every decision here shapes your legacy.
              </p>
            </div>
            
            <div className={styles.statsGrid}>
              <GlassCard>
                <div className={styles.statNumber}>24</div>
                <div className={styles.statLabel}>Events Hosted</div>
              </GlassCard>
              <GlassCard>
                <div className={styles.statNumber}>300+</div>
                <div className={styles.statLabel}>Active Members</div>
              </GlassCard>
              <GlassCard>
                <div className={styles.statNumber}>4</div>
                <div className={styles.statLabel}>Champions</div>
              </GlassCard>
              <GlassCard>
                <div className={styles.statNumber}>∞</div>
                <div className={styles.statLabel}>Possibilities</div>
              </GlassCard>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. Events & Olympiad Showcase */}
      <section className="section-padding max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="section-title">The Event Grid</h2>
          <EventShowcase />
        </ScrollReveal>
      </section>

      {/* 5. Hall of Fame / Legacy / Join */}
      <section className="section-padding text-center">
        <ScrollReveal>
          <h2 className="section-title" style={{ fontSize: '4rem' }}>Leave Your Legacy</h2>
          <p className="text-muted max-w-2xl mx-auto mt-4 mb-8 text-xl">
            Your name could be etched in the Hall of Fame. Or you could just watch.
          </p>
          <div className="flex-center gap-4">
            <Link href="/hall-of-fame" className="btn-secondary" style={{ padding: '1rem 2rem' }}>Enter the Hall of Fame</Link>
            <Link href="/community" className="btn-primary" style={{ padding: '1rem 2rem' }}>Claim Your Seat</Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
