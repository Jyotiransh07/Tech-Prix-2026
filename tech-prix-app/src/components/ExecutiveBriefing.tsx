/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';

export default function ExecutiveBriefing() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // 9th sept 2026 09:00:00
    const targetDate = new Date('2026-09-09T09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="content-section about-section-new" style={{ scrollMarginTop: '0px', paddingTop: '40px' }}>
      <div className="f1-container max-w-1200">

        {/* Sponsor Logos */}
        <div className="sponsors-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
          <span className="f1-timer-header" style={{ marginBottom: '16px' }}>SPONSORSHIPS</span>
          <style>{`
            @keyframes scrollLogos {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .sponsors-marquee-wrapper {
              overflow: hidden;
              width: 100%;
              position: relative;
              padding: 10px 0;
              /* Optional: fade edges */
              -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
              mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            }
            .sponsors-marquee-track {
              display: flex;
              width: max-content;
              animation: scrollLogos 50s linear infinite;
            }
            @media (hover: hover) {
              .sponsors-marquee-track:hover {
                animation-play-state: paused;
              }
            }
            .sponsors-marquee-content {
              display: flex;
              align-items: center;
              gap: 50px;
              padding-right: 50px;
            }
            .sponsor-logo-img {
              width: 90px;
              object-fit: contain;
              border-radius: 6px;
              opacity: 0.85;
            }
            @media (min-width: 1024px) {
              .sponsors-marquee-track {
                animation-duration: 35s;
              }
              .sponsors-marquee-content {
                gap: 120px;
                padding-right: 120px;
              }
              .sponsor-logo-img {
                width: 120px;
              }
            }
          `}</style>
          <div className="sponsors-marquee-wrapper">
            <div className="sponsors-marquee-track">
              {/* First Half */}
              <div className="sponsors-marquee-content">
                {[...Array(4)].map((_, i) => (
                  <div key={`g1-${i}`} style={{ display: 'contents' }}>
                    <img src="/logos/BINA.jpeg" alt="BINA" className="sponsor-logo-img" />
                    <img src="/logos/MumbaiTech.jpeg" alt="Mumbai Tech Community" className="sponsor-logo-img" />
                    <img src="/logos/PrePark.jpeg" alt="PrePark" className="sponsor-logo-img" />
                  </div>
                ))}
              </div>
              {/* Second Half (Duplicate for seamless loop) */}
              <div className="sponsors-marquee-content" aria-hidden="true">
                {[...Array(4)].map((_, i) => (
                  <div key={`g2-${i}`} style={{ display: 'contents' }}>
                    <img src="/logos/BINA.jpeg" alt="BINA" className="sponsor-logo-img" />
                    <img src="/logos/MumbaiTech.jpeg" alt="Mumbai Tech Community" className="sponsor-logo-img" />
                    <img src="/logos/PrePark.jpeg" alt="PrePark" className="sponsor-logo-img" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Stats Bar */}
        <div className="about-stats-bar">
          <div className="stat-item">2-4 Team Members</div>
          <div className="stat-item">8 Hours Sprint</div>
          <div className="stat-item">Students Only</div>
          <div className="stat-item highlight-stat">Registration Open</div>
        </div>

        {/* Title */}
        <h2 className="section-title-large text-glitch reward-heading-glitch text-center" data-text="TECH PRIX 2026" style={{ marginBottom: "2rem" }}>TECH PRIX 2026</h2>

        {/* Content Split */}
        <div className="about-content-split">
          <div className="about-image-col">
            {/* The user provided Mercedes F1 car image */}
            <img
              src="/mercedes-f1.png"
              alt="Tech Prix Mercedes F1"
              className="about-f1-img mercedes-glow"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="about-text-col">
            <p>
              Welcome to the inaugural edition of <strong>Tech Prix 2026</strong> — a high-octane hardware and software integration hackathon.
            </p>
            <p>
              Bringing together student innovators, engineers, and problem-solvers, the hackathon invites you to tackle real-world challenges inspired by rapid prototyping, telemetry systems, and autonomous robotics.
            </p>
            <p>
              More than just a competition, Tech Prix is an opportunity to innovate under pressure. Collaborate with brilliant minds, build impactful solutions, and push your engineering skills to the redline in this intense 8-hour sprint.
            </p>

            {/* Countdown */}
            {/* Countdown */}
            <div className="f1-timer-wrapper">
              <h3 className="f1-timer-header">Registrations Closing In</h3>
              <div className="f1-timer-row">

                {/* Days */}
                <div className="f1-timer-box">
                  <span className="f1-timer-num">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="f1-timer-label">DAY(S)</span>
                </div>

                {/* Separator */}
                <div className="f1-timer-colon-box">
                  <div className="f1-timer-dot"></div>
                  <div className="f1-timer-dot"></div>
                </div>

                {/* Hours */}
                <div className="f1-timer-box">
                  <span className="f1-timer-num">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="f1-timer-label">HOUR(S)</span>
                </div>

                {/* Separator */}
                <div className="f1-timer-colon-box">
                  <div className="f1-timer-dot"></div>
                  <div className="f1-timer-dot"></div>
                </div>

                {/* Minutes */}
                <div className="f1-timer-box">
                  <span className="f1-timer-num cyan">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="f1-timer-label cyan timer-label-desktop">MINUTE(S)</span>
                  <span className="f1-timer-label cyan timer-label-mobile">MIN(S)</span>
                </div>

                {/* Separator */}
                <div className="f1-timer-colon-box cyan">
                  <div className="f1-timer-dot cyan"></div>
                  <div className="f1-timer-dot cyan"></div>
                </div>

                {/* Seconds */}
                <div className="f1-timer-box">
                  <span className="f1-timer-num cyan">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="f1-timer-label cyan timer-label-desktop">SECOND(S)</span>
                  <span className="f1-timer-label cyan timer-label-mobile">SEC(S)</span>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}