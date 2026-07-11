import { HeroScene } from '@/components/cinematic/HeroScene';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';

export default function HallOfFamePage() {
  const champions = [
    { year: 2025, name: 'TBD', event: 'Chess Olympiad' },
    { year: 2024, name: 'Marcus Vance', event: 'Chess Olympiad' },
    { year: 2023, name: 'Elena Rostova', event: 'Candidates Tournament' },
    { year: 2022, name: 'Julian Thorne', event: 'Chess Olympiad' },
  ];

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <HeroScene 
        headline="HALL OF FAME" 
        subheadline="IMMORTALITY ACHIEVED"
      />

      <section className="section-padding max-w-3xl mx-auto">
        <ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {champions.map((champ, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: 'clamp(1rem, 5vw, 2rem)',
                borderBottom: '1px solid var(--glass-border)',
                transition: 'background 0.3s ease',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 5vw, 2rem)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--accent-gold)', fontWeight: 700 }}>{champ.year}</span>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>{champ.name}</h3>
                    <span className="text-muted" style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>{champ.event}</span>
                  </div>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--glass-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
                  ♕
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
