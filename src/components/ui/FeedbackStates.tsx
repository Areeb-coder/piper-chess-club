import React from 'react';
import { GlassCard } from '../ui/GlassCard';

export const EmptyState = ({ message = "No data available." }: { message?: string }) => {
  return (
    <div className="py-12 text-center">
      <GlassCard className="inline-block max-w-md mx-auto opacity-70">
        <p className="text-muted italic">{message}</p>
      </GlassCard>
    </div>
  );
};

export const SkeletonBlock = ({ height = '200px' }: { height?: string }) => {
  return (
    <div 
      className="bg-white/5 animate-pulse rounded-lg border border-white/10"
      style={{ height, width: '100%' }}
    />
  );
};
