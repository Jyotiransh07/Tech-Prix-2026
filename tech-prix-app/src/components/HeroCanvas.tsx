"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import NextImage from "next/image";
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
  const slide0Ref = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);
  const currentSlideRef = useRef(0);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Progressive preload: first batch (frames 1-30) loads immediately for fast first paint,
  // then the rest loads in the background without blocking.
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = imgs;
    const FIRST_BATCH = 30; // Show hero fast

    const loadFrame = (i: number) => {
      const img = new Image();
      img.src = `${FOLDER_PATH}frame_${String(i).padStart(4, "0")}.png`;
      imgs[i - 1] = img;

      const checkDone = () => {
        if (isCancelled) return;
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
        // Mark as loaded after first batch so canvas can render
        if (loadedCount === FIRST_BATCH) {
          setIsLoaded(true);
        }
      };

      img.onload = checkDone;
      img.onerror = checkDone;
    };

    // Load first batch synchronously
    for (let i = 1; i <= FIRST_BATCH; i++) {
      loadFrame(i);
    }

    // Load the rest after a small delay (non-blocking)
    const timer = setTimeout(() => {
      if (isCancelled) return;
      for (let i = FIRST_BATCH + 1; i <= TOTAL_FRAMES; i++) {
        loadFrame(i);
      }
    }, 200);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [TOTAL_FRAMES]);


  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const images = imagesRef.current;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let currentRenderedFrame = -1;
    let targetFrame = 1;
    let animationFrameId: number;
    
    const renderFrame = (frameNum: number) => {
      const frameIdx = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameNum))) - 1;
      const img = images[frameIdx];
      if (!img || !img.complete || img.naturalWidth === 0) return false;

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

      const scaleFactor = w < 768 ? 1.25 : 1.18;
      drawW *= scaleFactor;
      drawH *= scaleFactor;

      const posX = (w - drawW) / 2;
      const posY = (h - drawH) / 2;

      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, posX, posY, drawW, drawH);
      return true;
    };

    const renderLoop = () => {
      if (currentRenderedFrame !== targetFrame) {
        const success = renderFrame(targetFrame);
        if (success) {
          currentRenderedFrame = targetFrame;
          if (frameCounterRef.current) {
            frameCounterRef.current.innerText = `FRAME ${String(targetFrame).padStart(3, '0')}/${TOTAL_FRAMES}`;
          }
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

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
      currentRenderedFrame = -1; // Force redraw on resize
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
        
        // Update target frame for the render loop
        targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(p * (TOTAL_FRAMES - 1)) + 1));

        // Slide transitions directly via DOM
        let newSlide = 0;
        if (p < 0.25) newSlide = 0;
        else if (p < 0.55) newSlide = 1;
        else if (p < 0.80) newSlide = 2;
        else newSlide = 3;
        
        if (currentSlideRef.current !== newSlide) {
          currentSlideRef.current = newSlide;
          if (slide0Ref.current) slide0Ref.current.className = `story-slide ${newSlide === 0 ? 'active' : ''}`;
          if (slide1Ref.current) slide1Ref.current.className = `story-slide ${newSlide === 1 ? 'active' : ''}`;
          if (slide2Ref.current) slide2Ref.current.className = `story-slide ${newSlide === 2 ? 'active' : ''}`;
          if (slide3Ref.current) slide3Ref.current.className = `story-slide ${newSlide === 3 ? 'active' : ''}`;
        }
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      st.kill();
    };
  }, [isLoaded]);

  return (
    <section id="hero" ref={containerRef} className="hero-canvas-track">
      <div className="canvas-viewport-sticky">
        <canvas id="f1-canvas" ref={canvasRef} style={{ opacity: 0.85 }}></canvas>

        <div className="telemetry-hud-overlay">
          <div className="hud-center-stage">
            <div ref={slide0Ref} className="story-slide active">
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

              {/* Mobile-only sponsor logos (desktop uses HUD bottom-right) */}
              <div className="mobile-sponsors">
                <NextImage
                  src="/logos/BINA.jpeg"
                  alt="BINA"
                  width={120}
                  height={60}
                  style={{ objectFit: "contain", borderRadius: "6px", opacity: 0.85 }}
                />
                <NextImage
                  src="/logos/PrePark.jpeg"
                  alt="PrePark"
                  width={120}
                  height={60}
                  style={{ objectFit: "contain", borderRadius: "6px", opacity: 0.85 }}
                />
              </div>
            </div>


            <div ref={slide1Ref} className="story-slide">
              <span className="classification-tag">HACKATHON TRACKS</span>
              <h2 className="hero-headline">
                HARDWARE CORE<br/>× SOFTWARE LOGIC
              </h2>
              <p className="hero-description">
                Whether you're designing custom circuits, programming microcontrollers, or building software to control physical devices — choose your track.
              </p>
            </div>

            <div ref={slide2Ref} className="story-slide">
              <span className="classification-tag">PRIZE POOL</span>
              <h2 className="hero-headline">
                {CONFIG.TOTAL_PRIZE}+<br/>CASH PRIZE POOL
              </h2>
            </div>

            <div ref={slide3Ref} className="story-slide">
              <span className="classification-tag">REGISTRATION</span>
              <h2 className="hero-headline">
                {CONFIG.EVENT_DATE}<br/>LOCK IN YOUR PASS
              </h2>
              <p className="hero-description">
                Team Entry: {CONFIG.TEAM_ENTRY_FEE} ({CONFIG.TEAM_SIZE}). Includes certificates for all participants.
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

            {/* Sector & Frame Counter + Sponsors */}
            <div className="instrument-card instrument-sectors" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
              <div className="sector-flags-row">
                {/* Sponsor logos inline left of sector flags */}
                <div className="hud-sponsors-logos">
                  <NextImage
                    src="/logos/BINA.jpeg"
                    alt="BINA"
                    width={150}
                    height={75}
                    style={{ objectFit: "contain", borderRadius: "4px", opacity: 0.85 }}
                  />
                  <NextImage
                    src="/logos/PrePark.jpeg"
                    alt="PrePark"
                    width={150}
                    height={75}
                    style={{ objectFit: "contain", borderRadius: "4px", opacity: 0.85 }}
                  />
                </div>
                <div className="sector-flags">
                  <div ref={sec1Ref} className="sec-flag active"><span>S1</span><i className="sec-dot"></i></div>
                  <div ref={sec2Ref} className="sec-flag"><span>S2</span><i className="sec-dot"></i></div>
                  <div ref={sec3Ref} className="sec-flag"><span>S3</span><i className="sec-dot"></i></div>
                </div>
              </div>
              <div ref={frameCounterRef} className="frame-index-counter">FRAME 001/{TOTAL_FRAMES}</div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
