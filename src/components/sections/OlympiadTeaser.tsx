'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../cinematic/ScrollReveal';
import styles from './OlympiadTeaser.module.css';

export const OlympiadTeaser = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const targetDate = new Date('2026-10-24T00:00:00Z').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error playing video:", error);
            alert("Oops! The video format might not be supported by your browser. Error: " + error.message);
          });
        }
      }
    }
  };

  return (
    <div className={styles.teaserWrapper}>
      <ScrollReveal>
        <div className={styles.teaserContent}>
          <div className={styles.visualColumn}>
            <div className={styles.thumbnailFrame} onClick={togglePlay}>
              <video 
                ref={videoRef}
                src="/videos/olympiad-teaser.mp4?v=3"
                type="video/mp4"
                className={styles.thumbnailVideo}
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
              <div className={styles.frameGlow}></div>
              {!isPlaying && (
                <button className={styles.playButton} aria-label="Play Teaser">
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.playIcon}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div className={styles.textColumn}>
            <h3 className={styles.eyebrow}>Upcoming Championship</h3>
            <h2 className={styles.title}>Chess Olympiad</h2>
            
            <p className={styles.description}>
              Preparation has begun. Every board remembers, and a championship is never announced twice. 
              The strongest will return to claim their legacy. The next move belongs to those prepared.
            </p>
            
            <div className={styles.countdown}>
              <div className={styles.timeUnit}>
                <span className={styles.timeValue}>{String(timeLeft.days).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>Days</span>
              </div>
              <span className={styles.timeDivider}>:</span>
              <div className={styles.timeUnit}>
                <span className={styles.timeValue}>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>Hours</span>
              </div>
              <span className={styles.timeDivider}>:</span>
              <div className={styles.timeUnit}>
                <span className={styles.timeValue}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>Mins</span>
              </div>
            </div>
            
            <Link href="/olympiad" className={`btn-primary ${styles.ctaBtn}`}>
              Watch the Teaser
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
