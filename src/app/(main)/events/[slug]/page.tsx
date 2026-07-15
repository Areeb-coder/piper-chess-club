import { getEventBySlug, getLatestEdition, getEventEditions } from '@/lib/cms/api';
import { notFound } from 'next/navigation';
import { HeroScene } from '@/components/cinematic/HeroScene';
import { ScrollScene } from '@/components/cinematic/ScrollScene';
import { EventMetaBar } from '@/components/events/EventMetaBar';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { EventTimeline } from '@/components/events/EventTimeline';

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const event = getEventBySlug(resolvedParams.slug);
  if (!event) return notFound();

  const latestEdition = getLatestEdition(event.slug);
  const editions = getEventEditions(event.slug);

  return (
    <div>
      <HeroScene 
        headline={event.name} 
        subheadline={event.short_tagline} 
        theme={event.event_category === 'womens' ? 'womens' : event.event_category === 'freestyle' ? 'freestyle' : 'olympiad'}
      />

      <ScrollScene>
        <section className="section-padding max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: 'Events', href: '/events' }, { label: event.name }]} />
          
          <EventMetaBar 
            format={event.format_summary} 
            timeControl={event.typical_time_control} 
            status={latestEdition?.status} 
          />
          
          <div className="mt-12 mb-8">
            <h2 className="section-title text-center mb-8">Event Overview</h2>
            <div 
              className="text-muted leading-relaxed text-lg max-w-3xl mx-auto text-center"
              dangerouslySetInnerHTML={{ __html: event.overview_richtext }} 
            />
          </div>
          
          <div className="mt-20">
            <h2 className="section-title text-center mb-12">Championship History</h2>
            <EventTimeline editions={editions} />
          </div>
        </section>
      </ScrollScene>
    </div>
  );
}
