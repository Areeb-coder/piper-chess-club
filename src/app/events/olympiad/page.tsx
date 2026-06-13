import { HeroScene } from '@/components/cinematic/HeroScene';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import Link from 'next/link';

export default function OlympiadPage() {
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <HeroScene 
        headline="THE OLYMPIAD" 
        subheadline="THE WORLD CUP OF PIPER CHESS CLUB"
        theme="olympiad"
      >
        <Link href="#standings" className="btn-primary">View Standings</Link>
        <Link href="/hall-of-fame" className="btn-secondary">Past Champions</Link>
      </HeroScene>

      <section className="section-padding max-w-5xl mx-auto">
        <ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>
                Forge Your Legacy.
              </h2>
              <p className="text-muted leading-relaxed text-lg">
                The Chess Olympiad is our grandest stage. Weeks of grueling matches, unexpected sacrifices, 
                and brilliant brilliancies culminate here. Only the most prepared minds survive the gauntlet.
              </p>
            </div>
            
            <GlassCard>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>Current Status</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                  <span className="text-muted">Phase</span>
                  <span className="font-bold">Quarter-Finals</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                  <span className="text-muted">Remaining Players</span>
                  <span className="font-bold">8</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Prize Pool</span>
                  <span className="font-bold text-accent-gold">$2,000 + Trophy</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>
      </section>

      <section id="standings" className="section-padding max-w-5xl mx-auto text-center">
        <ScrollReveal delay={0.2}>
          <h2 className="section-title">The Elite 8</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <GlassCard key={num} className="text-center">
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--surface-raised)', margin: '0 auto 1rem', border: '1px solid var(--accent-gold-glow)' }} />
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>Player {num}</h4>
                <p className="text-muted text-sm uppercase tracking-widest">Contender</p>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
