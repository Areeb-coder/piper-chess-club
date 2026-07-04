'use client';

import React from 'react';
import { EventEdition } from '@/lib/cms/types';
import { ScrollReveal } from '../cinematic/ScrollReveal';
import { WinnerCard } from './WinnerCard';
import { LeaderboardCard } from './LeaderboardCard';
import { EventPoster } from './EventPoster';
import { EventGallery } from './EventGallery';
import styles from './EventTimeline.module.css';

interface EventTimelineProps {
  editions: EventEdition[];
}

export const EventTimeline: React.FC<EventTimelineProps> = ({ editions }) => {
  if (!editions || editions.length === 0) return null;

  return (
    <div className={styles.timeline}>
      {editions.map((edition, index) => {
        // Extract the winner (first result) for the spotlight
        const hasResults = edition.results && edition.results.length > 0;
        const winnerResult = hasResults ? edition.results![0] : null;
        const otherResults = hasResults && edition.results!.length > 1 ? edition.results!.slice(1) : null;

        return (
          <ScrollReveal key={edition.slug} delay={index * 0.1}>
            <section className={styles.yearSection}>
              <div className={styles.yearMarkerWrapper}>
                <div className={styles.yearLine} />
                <h2 className={styles.yearMarker}>{edition.year}</h2>
              </div>

              <div className={styles.contentGrid}>
                {/* Left Column: Story */}
                <div className={styles.storyColumn}>
                  {edition.heroIntro && (
                    <p className={styles.heroIntro}>{edition.heroIntro}</p>
                  )}
                  {edition.overview && (
                    <p className={styles.overview}>{edition.overview}</p>
                  )}

                  {edition.highlights && edition.highlights.length > 0 && (
                    <div className={styles.highlights}>
                      <h4 className={styles.highlightsTitle}>Key Highlights</h4>
                      <ul className={styles.highlightsList}>
                        {edition.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className={styles.metaData}>
                    <span className={styles.metaLabel}>Date:</span> {edition.start_date}
                    {edition.end_date && edition.end_date !== edition.start_date ? ` – ${edition.end_date}` : ''}
                  </div>
                </div>

                {/* Right Column: Results */}
                <div className={styles.resultsColumn}>
                  {winnerResult && (
                    <div className={styles.winnerWrapper}>
                      <WinnerCard
                        rank={winnerResult.rank}
                        names={winnerResult.names}
                        department={winnerResult.department}
                        isOverallWinner={true}
                      />
                    </div>
                  )}

                  {otherResults && (
                    <div className={styles.leaderboardWrapper}>
                      <LeaderboardCard results={otherResults} />
                    </div>
                  )}

                  {/* Media (Poster and Gallery Widgets) */}
                  <div className={styles.mediaContainer}>
                    <div className={styles.widgetWrapper}>
                      <h4 className={styles.widgetLabel}>EVENT GALLERY</h4>
                      {edition.galleryUrls && edition.galleryUrls.length > 0 ? (
                        <EventGallery urls={edition.galleryUrls} />
                      ) : (
                        <div className={styles.placeholderCard}>
                          <span className={styles.placeholderIcon}>📷</span>
                          <span className={styles.placeholderTitle}>Event Gallery</span>
                          <span className={styles.placeholderText}>Event photographs will appear here once they are added.</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={styles.widgetWrapper}>
                      <h4 className={styles.widgetLabel}>EVENT POSTER</h4>
                      {edition.posterUrl ? (
                        <EventPoster url={edition.posterUrl} />
                      ) : (
                        <div className={styles.placeholderCard}>
                          <span className={styles.placeholderIcon}>🖼️</span>
                          <span className={styles.placeholderTitle}>Event Poster</span>
                          <span className={styles.placeholderText}>The official event poster will appear here.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
        );
      })}
    </div>
  );
};
