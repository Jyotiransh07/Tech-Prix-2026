"use client";
import { useEffect, useRef } from 'react';

export default function CircuitTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.5, rootMargin: "-10% 0px -20% 0px" });

    const items = containerRef.current?.querySelectorAll('.f1-schedule-card');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="circuit" className="content-section circuit-schedule" style={{ position: 'relative', scrollMarginTop: '0px', paddingTop: '100px', paddingBottom: '40px' }}>
      <div ref={containerRef} className="f1-container max-w-850" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header-block text-center">
          <h2 className="section-title-large text-glitch reward-heading-glitch" data-text="SCHEDULE">SCHEDULE</h2>
        </div>
        
        <div className="race-timeline-track" style={{ position: 'relative' }}>
          <div className="track-line"></div>
          
          {/* PHASE 1 */}
          <div className="timeline-checkpoint highlight-checkpoint">
            <div className="checkpoint-node pulse-node" style={{ background: '#06b6d4', boxShadow: '0 0 10px #06b6d4' }}><span className="node-core"></span></div>
            <div className="checkpoint-card spotlight-card active-card f1-schedule-card sector-1">
              <div className="checkpoint-session text-cyan" style={{ marginBottom: '8px', fontSize: '0.875rem', fontWeight: 600 }}>SECTOR 1 // MORNING SESSION</div>
              <h4 className="checkpoint-title text-white" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>REGISTRATION & KICKOFF</h4>
              <p className="checkpoint-body text-silver" style={{ lineHeight: '1.6' }}>
                <strong style={{ color: '#fff' }}>08:30 AM:</strong> Teams Check-in & Workspace Setup.<br/>
                <strong style={{ color: '#fff' }}>09:00 AM:</strong> Opening Ceremony & Technical Briefing.<br/>
                <strong style={{ color: '#fff' }}>09:30 AM:</strong> <em style={{ color: '#06b6d4', fontStyle: 'normal' }}>START</em> — The hackathon officially begins.
              </p>
            </div>
          </div>

          {/* PHASE 2 */}
          <div className="timeline-checkpoint">
            <div className="checkpoint-node" style={{ background: '#E10600', boxShadow: '0 0 10px #E10600' }}><span className="node-core"></span></div>
            <div className="checkpoint-card spotlight-card f1-schedule-card sector-2">
              <div className="checkpoint-session text-red" style={{ marginBottom: '8px', fontSize: '0.875rem', fontWeight: 600 }}>SECTOR 2 // MID-DAY SPRINT</div>
              <h4 className="checkpoint-title text-white" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>DEVELOPMENT SPRINT</h4>
              <p className="checkpoint-body text-silver" style={{ lineHeight: '1.6' }}>
                <strong style={{ color: '#fff' }}>12:30 PM:</strong> Mentorship Check — Mid-point technical evaluation.<br/>
                <strong style={{ color: '#fff' }}>02:00 PM:</strong> Core Development — Hardware & Software integration.
              </p>
            </div>
          </div>

          {/* PHASE 3 */}
          <div className="timeline-checkpoint">
            <div className="checkpoint-node" style={{ background: '#FBBF24', boxShadow: '0 0 10px #FBBF24' }}><span className="node-core"></span></div>
            <div className="checkpoint-card spotlight-card f1-schedule-card sector-3">
              <div className="checkpoint-session" style={{ color: '#FBBF24', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 600 }}>SECTOR 3 // EVENING FINALE</div>
              <h4 className="checkpoint-title text-white" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>DEMOS & AWARDS</h4>
              <p className="checkpoint-body text-silver" style={{ lineHeight: '1.6' }}>
                <strong style={{ color: '#fff' }}>03:30 PM:</strong> Project Demos — Final evaluation and judging round begins.<br/>
                <strong style={{ color: '#fff' }}>04:30 PM:</strong> Awards Ceremony — Winner announcements.<br/>
                <strong style={{ color: '#fff' }}>05:00 PM:</strong> Finish Line — Event concludes.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}