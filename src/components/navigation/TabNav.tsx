import React, { useState } from 'react';

interface TabNavProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNav = ({ tabs, activeTab, onTabChange }: TabNavProps) => {
  return (
    <div className="flex justify-center border-b border-white/10 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-3 font-display uppercase tracking-wider text-sm transition-all border-b-2 ${
            activeTab === tab
              ? 'border-accent-gold text-white'
              : 'border-transparent text-muted hover:text-white hover:border-white/30'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
