'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 z-50 relative"
        aria-label="Toggle Menu"
      >
        <span className={`block w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : 'mb-1.5'}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : 'mb-1.5'}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex flex-col justify-center items-center gap-8">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-accent-gold transition-colors">Home</Link>
          <Link href="/events" onClick={() => setIsOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-accent-gold transition-colors">Events</Link>
          <Link href="/legacy" onClick={() => setIsOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-accent-gold transition-colors">Legacy</Link>
          <Link href="/team" onClick={() => setIsOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-accent-gold transition-colors">Team</Link>
          <Link href="/community" onClick={() => setIsOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-accent-gold transition-colors">Join</Link>
        </div>
      )}
    </div>
  );
};
