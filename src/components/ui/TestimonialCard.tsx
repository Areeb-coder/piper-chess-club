import React from 'react';
import { GlassCard } from '../ui/GlassCard';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
}

export const TestimonialCard = ({ quote, name, role }: TestimonialProps) => {
  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute top-2 left-4 text-6xl text-white/5 font-display">"</div>
      <blockquote className="relative z-10 p-4">
        <p className="text-lg italic leading-relaxed mb-6">"{quote}"</p>
        <footer className="mt-4 border-t border-white/10 pt-4">
          <cite className="not-italic font-bold block">{name}</cite>
          <span className="text-sm text-accent-gold uppercase tracking-wider">{role}</span>
        </footer>
      </blockquote>
    </GlassCard>
  );
};
