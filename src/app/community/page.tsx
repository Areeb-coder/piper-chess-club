import { ScrollScene } from '@/components/cinematic/ScrollScene';

export default function CommunityPage() {
  return (
    <div className="section-padding max-w-3xl mx-auto text-center">
      <h1 className="section-title">Join the Grid</h1>
      
      <ScrollScene>
        <div className="glass-panel p-8 mt-4">
          <p className="text-lg leading-relaxed mb-8">
            Piper Chess Club is an active community of competitors.
            We meet weekly for casual games, blitz spars, and tournament prep.
          </p>
          
          <div className="flex-center gap-4">
            <a href="#" className="btn-primary">Discord Server</a>
            <a href="#" className="btn-secondary">Instagram</a>
          </div>
        </div>
      </ScrollScene>
    </div>
  );
}
