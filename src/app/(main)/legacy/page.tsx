import { getLegacyEntries } from '@/lib/cms/api';
import { ScrollScene } from '@/components/cinematic/ScrollScene';
import { GlassCard } from '@/components/ui/GlassCard';

export default function LegacyPage() {
  const entries = getLegacyEntries();

  return (
    <div className="section-padding max-w-3xl mx-auto">
      <h1 className="section-title">Piper Legacy</h1>
      
      <div className="flex flex-col gap-4">
        {entries.map(entry => (
          <ScrollScene key={entry.id}>
            <GlassCard>
              <div className="flex justify-between items-center mb-2" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 className="text-xl font-bold">{entry.title}</h3>
                <span className="text-accent-gold font-display font-bold text-lg">{entry.year}</span>
              </div>
              <p className="text-muted">{entry.description}</p>
            </GlassCard>
          </ScrollScene>
        ))}
      </div>
    </div>
  );
}
