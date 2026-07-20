import { HeroScene } from '@/components/cinematic/HeroScene';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';

export default function TeamPage() {
  const team = [
    { 
      name: 'Areeb Khalid', 
      role: 'President', 
      quote: 'I will take you into a deep dark forest where 2+2=5, and the path leading out is only wide enough for one', 
      instagram: 'https://www.instagram.com/areeb._xo/', 
      linkedin: 'https://www.linkedin.com/in/areeb-khalid-960262379/',
      image: '/media/team/Areeb.png' 
    },
    { 
      name: 'Hamza Akhtar', 
      role: 'Chess Governor', 
      quote: 'Piper Chess Champion', 
      instagram: 'https://www.instagram.com/_11amza_/',
      image: '/media/team/MD HAMZA AKHTAR.jpeg' 
    },
    { 
      name: 'Mohd hasan', 
      role: 'Vice Chess Governor', 
      quote: 'Play the board, not the opponent',
      image: '/media/team/Hasan.jpeg' 
    },
    { 
      name: 'Razi', 
      role: 'Event Organizer', 
      quote: 'Checkmate is just an Opinion', 
      instagram: 'https://www.instagram.com/avocadorable693?igsh=OGw2bmFkYXYyNnpq',
      image: '/media/team/Razi.png' 
    },
    { 
      name: 'Sohail', 
      role: 'PnV Head', 
      instagram: 'https://www.instagram.com/ig_sohail.s?igsh=MW96cGgxd3JiMzRhZA%3D%3D&utm_source=qr',
      image: '/media/team/Sohail.jpeg' 
    },
    { 
      name: 'Syed Abdullah', 
      role: 'SMM Head', 
      quote: 'The board is silent, but every move speaks.', 
      instagram: 'https://www.instagram.com/syed.abdullah386/',
      linkedin: 'https://www.linkedin.com/in/syed-abdullah-573718331/',
      image: '/media/team/Syed Abdullah.jpg' 
    },
    { 
      name: 'Saad Ansari', 
      role: 'Core Member', 
      quote: "By the time you see the trap, it's already over.", 
      instagram: 'https://www.instagram.com/saad_ansari_13/',
      image: '/media/team/Saad.jpg' 
    }
  ];

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <HeroScene 
        headline="THE ROSTER" 
        subheadline="THE MINDS BEHIND THE BOARD"
      />

      <section className="section-padding max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="stats-grid grid-cols-1 md-grid-cols-2 lg-grid-cols-4">
            {team.map((member, index) => (
              <GlassCard key={index} className="text-center" style={{ padding: '3rem 2rem' }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--surface-raised)',
                  backgroundImage: `url("${member.image}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  margin: '0 auto 2rem', 
                  border: '1px solid var(--glass-border)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
                }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>{member.name}</h3>
                <p className="text-accent-gold" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>{member.role}</p>
                {member.quote && <p className="text-muted" style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>"{member.quote}"</p>}
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: member.quote ? '0' : '1.5rem' }}>
                  {member.instagram && (
                    <a href={member.instagram} target="_blank" rel="noreferrer" className="text-accent-gold" style={{ fontSize: '0.875rem', textDecoration: 'none' }}>IG</a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-accent-gold" style={{ fontSize: '0.875rem', textDecoration: 'none' }}>IN</a>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
