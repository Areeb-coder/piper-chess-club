'use client';

import React, { useState } from 'react';
import { TabNav } from '../navigation/TabNav';
import { GroupStageGrid } from './GroupStageGrid';
import { BracketDiagram } from './BracketDiagram';
import { EventGalleryStrip } from './EventGalleryStrip';
import { EmptyState } from '../ui/FeedbackStates';

interface EventTabsProps {
  overviewHtml: string;
  groups: any[];
  brackets: any[];
}

export const EventTabs = ({ overviewHtml, groups, brackets }: EventTabsProps) => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="mt-12">
      <TabNav 
        tabs={['Overview', 'Results', 'Gallery']} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <div className="min-h-[400px]">
        {activeTab === 'Overview' && (
          <div className="text-center text-muted text-lg leading-relaxed max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: overviewHtml }} />
        )}

        {activeTab === 'Results' && (
          <div>
            {groups.length === 0 && brackets.length === 0 ? (
              <EmptyState message="No results available yet." />
            ) : (
              <>
                {groups.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-center font-display text-xl mb-4">Group Stage</h3>
                    <GroupStageGrid groups={groups} />
                  </div>
                )}
                {brackets.length > 0 && (
                  <div>
                    <h3 className="text-center font-display text-xl mb-4">Knockout Stage</h3>
                    {brackets.map((bracket: any) => (
                      <div key={bracket.id} className="mb-8">
                        <h4 className="text-muted text-sm uppercase text-center mb-4">{bracket.name}</h4>
                        <BracketDiagram bracket={bracket} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'Gallery' && (
          <EventGalleryStrip />
        )}
      </div>
    </div>
  );
};
