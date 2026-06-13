import { HeroScene } from '@/components/cinematic/HeroScene';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';

export default function TeamPage() {
  const team = [
    { name: 'Ayanokoji Kiyotaka', role: 'Grandmaster / Founder', quote: 'I have never thought of you as an ally.' },
    { name: 'Suzune Horikita', role: 'President', quote: 'I will reach Class A.' },
    { name: 'Kei Karuizawa', role: 'Community Lead', quote: 'Protect me, and I will be useful.' },
    { name: 'Kakeru Ryuen', role: 'Head of Tactics', quote: 'Fear is the best motivator.' },
  ];

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <HeroScene 
        headline="THE ROSTER" 
        subheadline="THE MINDS BEHIND THE BOARD"
      />

      <section className="section-padding max-w-5xl mx-auto">
        <ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {team.map((member, index) => (
              <GlassCard key={index} className="text-center" style={{ padding: '3rem 2rem' }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  background: 'var(--surface-raised)', 
                  margin: '0 auto 2rem', 
                  border: '1px solid var(--glass-border)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
                }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{member.name}</h3>
                <p className="text-accent-gold" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>{member.role}</p>
                <p className="text-muted" style={{ fontStyle: 'italic' }}>"{member.quote}"</p>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
