import { getEventBySlug, getLatestEdition, getGroupsForEdition, getBracketsForEdition } from '@/lib/cms/api';
import { notFound } from 'next/navigation';
import { HeroScene } from '@/components/cinematic/HeroScene';
import { ScrollScene } from '@/components/cinematic/ScrollScene';
import { EventMetaBar } from '@/components/events/EventMetaBar';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { EventTabs } from '@/components/events/EventTabs';

export default function EventPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  if (!event) return notFound();

  const latestEdition = getLatestEdition(event.slug);
  const groups = latestEdition ? getGroupsForEdition(latestEdition.slug) : [];
  const brackets = latestEdition ? getBracketsForEdition(latestEdition.slug) : [];

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
            location={latestEdition?.location} 
            status={latestEdition?.status} 
          />

          <EventTabs overviewHtml={event.overview_richtext} groups={groups} brackets={brackets} />
        </section>
      </ScrollScene>

      {latestEdition && (
        <ScrollScene>
          <section className="section-padding max-w-5xl mx-auto">
            <h2 className="section-title">Latest Edition: {latestEdition.title}</h2>
            <div className="glass-panel p-8 text-center">
              <div dangerouslySetInnerHTML={{ __html: latestEdition.edition_intro }} className="mb-4" />
              <div className="mt-4 text-muted font-bold">
                {latestEdition.start_date} &ndash; {latestEdition.end_date} <br/> {latestEdition.location}
              </div>
            </div>
          </section>
        </ScrollScene>
      )}
    </div>
  );
}
