"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CONFIG } from "../config";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo({ onOpenModal }: { onOpenModal: (mode: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !containerRef.current) return;

    // Wait for video metadata to load so we know duration
    const onLoadedMetadata = () => {
      const duration = video.duration || 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // Increased smoothing for buttery transition
          onUpdate: (self) => {
            const p = self.progress;
            if (progressRef.current) {
              progressRef.current.innerText = `${Math.round(p * 100)}% TRACK`;
            }
            
            // Slide transitions
            if (p < 0.25) setActiveSlide(0);
            else if (p < 0.55) setActiveSlide(1);
            else if (p < 0.80) setActiveSlide(2);
            else setActiveSlide(3);
          }
        }
      });

      // GSAP native property tweening handles the interpolation much more smoothly
      tl.fromTo(video, { currentTime: 0 }, { currentTime: duration, ease: "none" });

      return () => {
        tl.kill();
      };
    };

    if (video.readyState >= 1) {
      onLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', onLoadedMetadata);
    }

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, []);

  return (
    <section id="hero" ref={containerRef} className="hero-canvas-track">
      <div className="canvas-viewport-sticky">
        <video 
          id="hero-video" 
          ref={videoRef} 
          src="/hero_video.mp4" 
          preload="auto" 
          muted 
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        ></video>

        <div className="telemetry-hud-overlay">
          <div className="hud-center-stage">
            <div className={`story-slide ${activeSlide === 0 ? "active" : ""}`}>
              <div className="classification-tag">{CONFIG.ORGANIZERS} PRESENT</div>
              <h1 className="hero-headline">
                THE GRAND PRIX<br/>OF INNOVATION
              </h1>
              <p className="hero-description">
                The premier multidisciplinary engineering hackathon where software architectures and hardware systems battle at full throttle.
              </p>
              <div className="hero-action-bar">
                <button className="cta-glory" onClick={() => onOpenModal("register")}>
                  REGISTER NOW
                </button>
              </div>
            </div>

            <div className={`story-slide ${activeSlide === 1 ? "active" : ""}`}>
              <div className="classification-tag">POWERTRAIN CONFIGURATION</div>
              <h2 className="hero-headline">
                SOFTWARE MATRIX<br/>× HARDWARE FORGE
              </h2>
              <p className="hero-description">
                Whether deploying high-speed AI agents and smart contracts, or soldering telemetry microcontrollers and autonomous drones — choose your racing discipline.
              </p>
            </div>

            <div className={`story-slide ${activeSlide === 2 ? "active" : ""}`}>
              <div className="classification-tag">CHAMPIONSHIP PURSE</div>
              <h2 className="hero-headline">
                {CONFIG.TOTAL_PRIZE}+<br/>CASH PRIZE POOL
              </h2>
              <p className="hero-description">
                P1 Champion: {CONFIG.FIRST_PRIZE} • P2 Runner Up: {CONFIG.SECOND_PRIZE} • P3 Podium: {CONFIG.THIRD_PRIZE}
              </p>
            </div>

            <div className={`story-slide ${activeSlide === 3 ? "active" : ""}`}>
              <div className="classification-tag">THE STARTING GRID AWAITS</div>
              <h2 className="hero-headline">
                {CONFIG.EVENT_DATE}<br/>LOCK IN YOUR PASS
              </h2>
              <p className="hero-description">
                Grid Entry: {CONFIG.TEAM_ENTRY_FEE} ({CONFIG.TEAM_SIZE}). Includes unlimited beverages & refreshments + official e-certificates for all drivers.
              </p>
              <div className="hero-action-bar">
                <button className="cta-glory" onClick={() => onOpenModal("register")}>
                  REGISTER NOW
                </button>
              </div>
            </div>
          </div>

          <div className="hud-row-bottom">
            <div className="instrument-card">
              SCROLL TO EXPLORE
            </div>
            <div className="instrument-card">
              <div className="frame-index-counter" ref={progressRef}>
                0% TRACK
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
