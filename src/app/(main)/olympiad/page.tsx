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
            <a href="https://forms.gle/5fEQuMDg48SBLfaRA" target="_blank" rel="noopener noreferrer" className={`btn-primary ${styles.ctaButton}`}>
              Register Now
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className={styles.rulesSection}>
            <h2 className={styles.rulesTitle}>Official Rules & Regulations</h2>
            
            <div className={styles.rulesGrid}>
              {/* Card 1 */}
              <div className={styles.ruleCard}>
                <h3 className={styles.ruleHeading}>Criteria of Team Formation</h3>
                <ul className={styles.ruleList}>
                  <li>Team of 3 players</li>
                  <li>Strongest Player shall play the Board (A)</li>
                  <li>One mandatory Women's Board- Board (W)</li>
                  <li>No team can have an aggregate of more than 7 Pts</li>
                  <li>Piper Chess Club has the right to modify the list of players and the categories whenever it feels required</li>
                  <li>Please find below the list of players and their respective categories</li>
                  <li>Board A is open to all players. However, Red and Orange players must play on Board A only.</li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className={styles.ruleCard}>
                <h3 className={styles.ruleHeading}>Men's List</h3>
                <div className={styles.listsGrid}>
                  <div className={styles.categoryGroup}>
                    <div className={`${styles.tableHeader} ${styles.redCategory}`}>Red List = 4pts</div>
                    <ul className={styles.tableBody}>
                      <li className={styles.rowItem}>Hamza</li>
                      <li className={styles.rowItem}>Hassan</li>
                      <li className={styles.rowItem}>Paras</li>
                      <li className={styles.rowItem}>Mayank</li>
                      <li className={styles.rowItem}>Arif Jameel</li>
                      <li className={styles.rowItem}>Sagnik</li>
                      <li className={styles.rowItem}>Mehtab</li>
                      <li className={styles.rowItem}>Aryan Ahmed</li>
                    </ul>
                  </div>
                  
                  <div className={styles.categoryGroup}>
                    <div className={`${styles.tableHeader} ${styles.orangeCategory}`}>Orange List = 3pts</div>
                    <ul className={styles.tableBody}>
                      <li className={styles.rowItem}>Saad Ansari</li>
                      <li className={styles.rowItem}>Yazdani</li>
                      <li className={styles.rowItem}>Ali Israr</li>
                      <li className={styles.rowItem}>Vishwajeet</li>
                      <li className={styles.rowItem}>Samad</li>
                    </ul>
                  </div>
                  
                  <div className={styles.categoryGroup}>
                    <div className={`${styles.tableHeader} ${styles.darkBlueCategory}`}>Dark Blue List = 2pts</div>
                    <ul className={styles.tableBody}>
                      <li className={styles.rowItem}>Abbas Zaheer</li>
                      <li className={styles.rowItem}>Anas Saifi</li>
                      <li className={styles.rowItem}>Razi</li>
                      <li className={styles.rowItem}>Ali Hasan</li>
                      <li className={styles.rowItem}>Samar Arquam</li>
                    </ul>
                  </div>
                  
                  <div className={styles.categoryGroup}>
                    <div className={`${styles.tableHeader} ${styles.blueCategory}`}>Blue List = 1pt</div>
                    <ul className={styles.tableBody}>
                      <li className={styles.rowItem}>All other eligible players who are not listed</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className={styles.ruleCard}>
                <h3 className={styles.ruleHeading}>Women's List</h3>
                <div className={styles.listsGrid}>
                  <div className={styles.categoryGroup}>
                    <div className={`${styles.tableHeader} ${styles.redCategory}`}>Red List = 3pts</div>
                    <ul className={styles.tableBody}>
                      <li className={styles.rowItem}>Fatma Al Madni</li>
                      <li className={styles.rowItem}>Sabeela</li>
                      <li className={styles.rowItem}>Aaliyah Batool</li>
                      <li className={styles.rowItem}>Iqra Akhtar</li>
                      <li className={styles.rowItem}>Aqsa Tanzim</li>
                    </ul>
                  </div>
                  
                  <div className={styles.categoryGroup}>
                    <div className={`${styles.tableHeader} ${styles.blueCategory}`}>Blue List = 2pts</div>
                    <ul className={styles.tableBody}>
                      <li className={styles.rowItem}>All other eligible players who are not listed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
