"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CONFIG } from "../config";

gsap.registerPlugin(ScrollTrigger);

export default function HeroCanvas({ onOpenModal }: { onOpenModal: (mode: string) => void }) {
  const TOTAL_FRAMES = 215;
  const FOLDER_PATH = "/ferrari-frames/";

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef({ frame: 1 });
  const speedRef = useRef<HTMLSpanElement>(null);
  const throttleRef = useRef<HTMLDivElement>(null);
  const gearRef = useRef<HTMLSpanElement>(null);
  const sec1Ref = useRef<HTMLDivElement>(null);
  const sec2Ref = useRef<HTMLDivElement>(null);
  const sec3Ref = useRef<HTMLDivElement>(null);
  const frameCounterRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload images sequentially to prevent scrolling into unloaded frames (which causes it to get "stuck")
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FOLDER_PATH}frame_${String(i).padStart(4, "0")}.png`;

      const checkDone = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onload = checkDone;
      img.onerror = checkDone;
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, [TOTAL_FRAMES]);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const images = imagesRef.current;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const renderFrame = (frameNum: number) => {
      const frameIdx = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameNum))) - 1;
      const img = images[frameIdx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const screenAspect = w / h;

      let drawW, drawH;
      if (screenAspect > imgAspect) {
        drawH = h;
        drawW = h * imgAspect;
      } else {
        drawW = w;
        drawH = w / imgAspect;
      }

      const scaleFactor = 1.18;
      drawW *= scaleFactor;
      drawH *= scaleFactor;

      const posX = (w - drawW) / 2;
      const posY = (h - drawH) / 2;

      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, posX, posY, drawW, drawH);
    };

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      (ctx as any).imageSmoothingQuality = 'high';
      renderFrame(frameRef.current.frame);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Buttery smooth GSAP Scroll scrub without React state overhead
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5, // Increased for smoother scroll easing
      onUpdate: (self) => {
        const p = self.progress;

        // Update direct DOM refs to avoid 60fps React re-renders
        if (speedRef.current) speedRef.current.innerText = String(Math.floor(p * 308)).padStart(3, '0');
        if (throttleRef.current) throttleRef.current.style.width = `${p * 100}%`;
        if (gearRef.current) {
          if (p < 0.05) gearRef.current.innerText = "N";
          else gearRef.current.innerText = String(Math.ceil(p * 8));
        }
        if (sec1Ref.current) sec1Ref.current.className = `sec-flag ${p >= 0 ? 'active' : ''}`;
        if (sec2Ref.current) sec2Ref.current.className = `sec-flag ${p > 0.33 ? 'active' : ''}`;
        if (sec3Ref.current) sec3Ref.current.className = `sec-flag ${p > 0.66 ? 'active' : ''}`;

        // Update Canvas only if the frame changes (fixes extreme lag)
        const targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(p * (TOTAL_FRAMES - 1)) + 1));

        if (frameRef.current.frame !== targetFrame) {
          frameRef.current.frame = targetFrame;
          if (frameCounterRef.current) {
            frameCounterRef.current.innerText = `FRAME ${String(targetFrame).padStart(3, '0')}/${TOTAL_FRAMES}`;
          }
          renderFrame(targetFrame);
        }

        // Slide transitions (React state is fine here since it bails out if value is same)
        if (p < 0.33) setActiveSlide(0);
        else if (p < 0.66) setActiveSlide(1);
        else setActiveSlide(2);
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      st.kill();
    };
  }, [isLoaded]);

  return (
    <section id="hero" ref={containerRef} className="hero-canvas-track">
      <div className="canvas-viewport-sticky">
        <canvas id="f1-canvas" ref={canvasRef} style={{ opacity: 0.85 }}></canvas>

        <div className="telemetry-hud-overlay">
          <div className="hud-center-stage">
            <div className={`story-slide ${activeSlide === 0 ? "active" : ""}`}>
              <span className="classification-tag">{CONFIG.ORGANIZERS} PRESENT</span>
              <h1 className="hero-headline text-glitch" data-text="TECH PRIX 2026">
                TECH PRIX 2026
              </h1>
              <div className="event-timing-badge">
                <span className="timing-dot"></span> EVENT DATE: 9th SEPT - 09:00 AM to 05:00 PM
              </div>
              <p className="hero-description mt-4">
                An engineering hackathon focused on building innovative hardware prototypes and integrating them with smart software solutions.
              </p>
              <div className="hero-action-bar">
                <button className="cta-glory" onClick={() => onOpenModal("register")}>
                  REGISTER NOW
                </button>
              </div>
            </div>

            <div className={`story-slide ${activeSlide === 1 ? "active" : ""}`}>
              <span className="classification-tag">HACKATHON TRACKS</span>
              <h2 className="hero-headline">
                HARDWARE CORE<br />× SOFTWARE LOGIC
              </h2>
              <p className="hero-description">
                Whether you're designing custom circuits, programming microcontrollers, or building software to control physical devices — choose your track.
              </p>
            </div>

            <div className={`story-slide ${activeSlide === 2 ? "active" : ""}`}>
              <span className="classification-tag">REGISTRATION</span>
              <h2 className="hero-headline">
                {CONFIG.EVENT_DATE}<br />LOCK IN YOUR PASS
              </h2>
              <p className="hero-description">
                Team Entry: {CONFIG.TEAM_ENTRY_FEE} ({CONFIG.TEAM_SIZE}). Includes beverages & refreshments + e-certificates for all participants.
              </p>
              <div className="hero-action-bar">
                <button className="cta-glory" onClick={() => onOpenModal("register")}>
                  REGISTER NOW
                </button>
              </div>
            </div>
          </div>

          <div className="hud-row-bottom">
            {/* Left Column: Gear + Throttle & Speed Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Gear Box */}
              <div className="instrument-gear-box" style={{ background: 'transparent', border: 'none', boxShadow: 'none', backdropFilter: 'none', width: 'auto', height: 'auto', alignItems: 'flex-start' }}>
                <span className="gear-sub">GEAR</span>
                <span ref={gearRef} className="gear-digit">N</span>
              </div>

              {/* Throttle & Speed Bar */}
              <div className="instrument-card instrument-throttle" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
                <div className="instrument-meta">
                  <span className="meta-name">SPEED TELEMETRY</span>
                  <span className="meta-data"><span ref={speedRef}>000</span> <small>KM/H</small></span>
                </div>
                <div className="tachometer-track">
                  <div ref={throttleRef} className="tachometer-fill"></div>
                </div>
              </div>
            </div>

            {/* Empty Center */}
            <div></div>

            {/* Sector & Frame Counter */}
            <div className="instrument-card instrument-sectors" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
              <div className="sector-flags">
                <div ref={sec1Ref} className="sec-flag active"><span>S1</span><i className="sec-dot"></i></div>
                <div ref={sec2Ref} className="sec-flag"><span>S2</span><i className="sec-dot"></i></div>
                <div ref={sec3Ref} className="sec-flag"><span>S3</span><i className="sec-dot"></i></div>
              </div>
              <div ref={frameCounterRef} className="frame-index-counter">FRAME 001/{TOTAL_FRAMES}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
