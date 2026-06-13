import { getEvents } from '@/lib/cms/api';
import { EventTile } from '@/components/ui/EventTile';
import { ScrollScene } from '@/components/cinematic/ScrollScene';

export default function EventsHub() {
  const events = getEvents();

  return (
    <div className="section-padding max-w-5xl mx-auto">
      <h1 className="section-title">The Event Grid</h1>
      <p className="text-muted text-center max-w-2xl mx-auto mb-8">
        Piper Chess Club runs multiple formats year-round. From the prestigious Olympiad to the chaotic Freestyle matches, this is where games happen.
      </p>

      <ScrollScene animation="fade">
        <div className="event-bento">
          {events.map(event => (
            <EventTile key={event.slug} event={event} />
          ))}
        </div>
      </ScrollScene>
    </div>
  );
}
