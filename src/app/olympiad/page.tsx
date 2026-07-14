'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';
import styles from './Olympiad.module.css';

export default function OlympiadPage() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scaleVideo = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isPlaying, setIsPlaying] = useState(true); // Autoplays on this page
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

  useEffect(() => {
    // Attempt to force autoplay on mount (browsers might block this if not muted)
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Autoplay blocked by browser policy. User interaction required.", error);
          setIsPlaying(false);
        });
      }
    }
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Subtle enhancements to the background specifically for this page */}
      <motion.div style={{ y: yBg }} className={styles.floatingGeometry1}></motion.div>
      <motion.div style={{ y: yBg }} className={styles.floatingGeometry2}></motion.div>

      <section className={styles.heroSection}>
        <motion.div style={{ opacity: opacityHero }} className={styles.heroContent}>
          <ScrollReveal>
            <h1 className={styles.heroTitle}>Chess Olympiad</h1>
            <p className={styles.heroSubtitle}>The Championship Returns</p>
          </ScrollReveal>
        </motion.div>

        <motion.div style={{ scale: scaleVideo }} className={styles.videoWrapper}>
          <div className={styles.premiumFrame} onClick={togglePlay}>
            <video 
              ref={videoRef}
              src="/videos/olympiad-teaser.mp4?v=3"
              type="video/mp4"
              className={styles.teaserVideo}
              autoPlay
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
            <div className={styles.frameGlow}></div>
            <div className={styles.glassBorder}></div>
            {!isPlaying && (
              <button className={styles.playButton} aria-label="Play Teaser">
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.playIcon}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      </section>

      <section className={styles.contentSection}>
        <ScrollReveal>
          <div className={styles.descriptionContainer}>
            <h2 className={styles.sectionTitle}>Preparation has begun.</h2>
            <p className={styles.descriptionText}>
              Every board remembers the battles fought, the sacrifices made, and the quiet tension before the final move. 
              The Chess Olympiad is not merely an event—it is the culmination of discipline, strategy, and instinct. 
              Only the strongest will return. 
              <br/><br/>
              <strong>Format:</strong> Teams of three (must include at least one female player).
              <br/><br/>
              The arena is being prepared. The pieces are falling into place. 
              This is the moment where preparation meets legacy. 
              A championship is never announced twice. The next move belongs to those who are ready.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className={styles.countdownContainer}>
            <div className={styles.countdownUnit}>
              <span className={styles.countValue}>{String(timeLeft.days).padStart(2, '0')}</span>
              <span className={styles.countLabel}>Days</span>
            </div>
            <span className={styles.countDivider}>:</span>
            <div className={styles.countdownUnit}>
              <span className={styles.countValue}>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className={styles.countLabel}>Hours</span>
            </div>
            <span className={styles.countDivider}>:</span>
            <div className={styles.countdownUnit}>
              <span className={styles.countValue}>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className={styles.countLabel}>Minutes</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className={styles.ctaContainer}>
            <a href="https://forms.gle/7dRAondHC2ekvvTv7" target="_blank" rel="noopener noreferrer" className={`btn-primary ${styles.ctaButton}`}>
              Enter the Arena
            </a>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
