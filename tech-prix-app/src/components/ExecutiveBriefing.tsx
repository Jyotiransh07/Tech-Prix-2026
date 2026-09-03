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
            {/* Countdown */}
            <div className="mt-10 p-4 sm:p-6 bg-black/10 rounded-xl backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center w-full max-w-xl mx-auto">
              {/* Transparent Header */}
              <div className="bg-transparent text-white w-full text-center">
                <h3 className="text-base sm:text-xl font-black tracking-[0.3em] uppercase m-0 drop-shadow-lg">Registrations Closing In</h3>
              </div>
              
              {/* Transparent Countdown Blocks with Colons */}
              <div className="flex items-center justify-center w-full mt-4 px-1 gap-2 sm:gap-3">
                {/* Days */}
                <div className="flex flex-col items-center justify-center bg-transparent py-3 sm:py-4 w-full max-w-[85px] sm:max-w-[100px]">
                  <span className="text-3xl sm:text-5xl font-bold text-white tracking-tighter">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-white/50 uppercase tracking-[0.2em] mt-2">Days</span>
                </div>
                
                {/* Separator */}
                <div className="flex flex-col space-y-1.5 opacity-60">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                </div>

                {/* Hours */}
                <div className="flex flex-col items-center justify-center bg-transparent py-3 sm:py-4 w-full max-w-[85px] sm:max-w-[100px]">
                  <span className="text-3xl sm:text-5xl font-bold text-white tracking-tighter">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-white/50 uppercase tracking-[0.2em] mt-2">Hours</span>
                </div>

                {/* Separator */}
                <div className="flex flex-col space-y-1.5 opacity-60">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                </div>

                {/* Minutes */}
                <div className="flex flex-col items-center justify-center bg-transparent py-3 sm:py-4 w-full max-w-[85px] sm:max-w-[100px]">
                  <span className="text-3xl sm:text-5xl font-bold text-[#00E5CC] tracking-tighter">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-[#00E5CC]/60 uppercase tracking-[0.2em] mt-2">Minutes</span>
                </div>

                {/* Separator */}
                <div className="flex flex-col space-y-1.5 opacity-60">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#00E5CC] rounded-full shadow-[0_0_10px_rgba(0,229,204,0.5)]"></div>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#00E5CC] rounded-full shadow-[0_0_10px_rgba(0,229,204,0.5)]"></div>
                </div>

                {/* Seconds */}
                <div className="flex flex-col items-center justify-center bg-transparent py-3 sm:py-4 w-full max-w-[85px] sm:max-w-[100px]">
                  <span className="text-3xl sm:text-5xl font-bold text-[#00E5CC] tracking-tighter">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-[#00E5CC]/60 uppercase tracking-[0.2em] mt-2">Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}