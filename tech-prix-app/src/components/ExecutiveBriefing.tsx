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
    // 8th sept 2026 15:00:00
    const targetDate = new Date('2026-09-08T15:00:00').getTime();

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
    <section id="about" className="content-section about-section-new" style={{ scrollMarginTop: '0px', paddingTop: '120px' }}>
      <div className="f1-container max-w-1200">
        
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
            <div className="about-countdown">
              <div className="countdown-label">Registration closing</div>
              <div className="countdown-unit"><span>{timeLeft.days}</span> Days</div>
              <div className="countdown-unit"><span>{timeLeft.hours}</span> Hrs</div>
              <div className="countdown-unit"><span>{timeLeft.minutes}</span> Mins</div>
              <div className="countdown-unit"><span>{timeLeft.seconds}</span> Secs</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}