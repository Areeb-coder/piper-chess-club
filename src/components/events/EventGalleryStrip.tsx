import React from 'react';

export const EventGalleryStrip = () => {
  // Mock images for visual effect
  const images = [
    '/images/cinematic_chess_bg.png',
    '/images/cinematic_chess_bg.png',
    '/images/cinematic_chess_bg.png',
  ];

  return (
    <div className="my-12">
      <h3 className="text-center font-display text-xl mb-6">Tournament Gallery</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
        {images.map((img, i) => (
          <div key={i} className="min-w-[280px] md:min-w-[400px] h-64 relative rounded-xl overflow-hidden snap-center flex-shrink-0 border border-white/10">
            <div className="absolute inset-0 bg-black/40 hover:bg-transparent transition-colors z-10 cursor-pointer" />
            {/* Using standard img to avoid next/image config issues for local files if not properly set up */}
            <img src={img} alt={`Gallery image ${i}`} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
};
