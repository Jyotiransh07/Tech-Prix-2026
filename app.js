// TECH PRIX 2026 — ENTERPRISE JAVASCRIPT & HIGH-DPI CANVAS ENGINE

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // --- 1. CONFIGURATION & CONSTANTS ---
  const TOTAL_FRAMES = 215;
  const FOLDER_PATH = './ferrari-frames/';
  
  // Format frame number to 4 digits (e.g. 1 -> 0001)
  const formatFrameIndex = (index) => {
    return `frame_${String(index).padStart(4, '0')}.png`;
  };

  const canvas = document.getElementById('f1-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });

  const preloader = document.getElementById('preloader');
  const loaderProgress = document.getElementById('loader-progress');
  const loadPercent = document.getElementById('load-percent');
  const gantryLights = [
    document.getElementById('g-col-1'),
    document.getElementById('g-col-2'),
    document.getElementById('g-col-3'),
    document.getElementById('g-col-4'),
    document.getElementById('g-col-5')
  ];

  // Telemetry HUD Elements
  const speedValEl = document.getElementById('speed-val');
  const throttleBarEl = document.getElementById('throttle-bar');
  const gearValEl = document.getElementById('gear-val');
  const frameCounterEl = document.getElementById('frame-counter');
  const sec1 = document.getElementById('sec-1');
  const sec2 = document.getElementById('sec-2');
  const sec3 = document.getElementById('sec-3');

  // Story Slides
  const slides = [
    document.getElementById('slide-1'),
    document.getElementById('slide-2'),
    document.getElementById('slide-3'),
    document.getElementById('slide-4')
  ];

  const heroSection = document.getElementById('hero');

  // Image Cache
  const images = [];
  let loadedCount = 0;
  let currentRenderFrame = 1;
  let targetFrame = 1;
  let isLoaded = false;
  let dpr = 1;

  // --- 2. HIGH-DPI RAZOR SHARP CANVAS RESIZING ---
  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2); // 2x Retina scaling for high-end sharpness
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (images[Math.round(currentRenderFrame) - 1]) {
      renderFrame(Math.round(currentRenderFrame));
    }
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // --- 3. ASSET PRELOADER & STARTING LIGHTS GANTRY ---
  function preloadImages() {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FOLDER_PATH}${formatFrameIndex(i)}`;
      img.onload = () => {
        loadedCount++;
        const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
        if (loaderProgress) loaderProgress.style.width = `${percent}%`;
        if (loadPercent) loadPercent.textContent = `${percent}%`;

        // Sequentially illuminate 5 gantry lights
        const lightIndex = Math.floor((percent / 100) * 5);
        for (let j = 0; j < 5; j++) {
          if (j <= lightIndex && gantryLights[j]) {
            gantryLights[j].classList.add('lit');
          }
        }

        if (loadedCount === TOTAL_FRAMES) {
          onAllImagesLoaded();
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          onAllImagesLoaded();
        }
      };
      images.push(img);
    }
  }

  function onAllImagesLoaded() {
    isLoaded = true;
    renderFrame(1);

    // "LIGHTS OUT AND AWAY WE GO!" launch animation
    setTimeout(() => {
      gantryLights.forEach(light => {
        if (light) light.classList.remove('lit');
      });

      if (soundEnabled) playEngineRev(1.2);

      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('fade-out');
          setTimeout(() => preloader.style.display = 'none', 700);
        }
      }, 350);
    }, 450);
  }

  preloadImages();

  // --- 4. HIGH-PRECISION CANVAS RENDERING ---
  function renderFrame(frameNumber) {
    const frameIdx = Math.max(1, Math.min(TOTAL_FRAMES, frameNumber)) - 1;
    const img = images[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Reset frame buffer with pure pitch black (#000000)
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);

    // Calculate aspect ratio containment
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const screenAspect = w / h;

    let drawW, drawH;

    // Preserve natural car dimensions with crisp scaling
    if (screenAspect > imgAspect) {
      drawH = h;
      drawW = h * imgAspect;
    } else {
      drawW = w;
      drawH = w / imgAspect;
    }

    // Scale up slightly for immersive presence and to crop out any potential edge watermarks
    const scaleFactor = 1.18;
    drawW *= scaleFactor;
    drawH *= scaleFactor;

    const posX = (w - drawW) / 2;
    const posY = (h - drawH) / 2;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, posX, posY, drawW, drawH);
  }

  // --- 5. SCROLL INTERPOLATION (60 FPS LERP PHYSICS) ---
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;

  window.addEventListener('scroll', () => {
    if (!isLoaded) return;
    
    const heroRect = heroSection.getBoundingClientRect();
    const heroTop = -heroRect.top;
    const heroHeight = heroRect.height - window.innerHeight;

    let progress = heroTop / heroHeight;
    progress = Math.max(0, Math.min(1, progress));

    targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1));

    const currentScrollY = window.scrollY;
    scrollVelocity = Math.abs(currentScrollY - lastScrollY);
    lastScrollY = currentScrollY;

    if (soundEnabled && scrollVelocity > 4) {
      modulateEngineSound(scrollVelocity);
    }
  }, { passive: true });

  // Physics animation loop for smooth inertia
  function updateAnimationLoop() {
    const prevFrame = Math.round(currentRenderFrame);
    currentRenderFrame += (targetFrame - currentRenderFrame) * 0.18;
    const newFrame = Math.round(currentRenderFrame);

    if (isLoaded && prevFrame !== newFrame) {
      renderFrame(newFrame);
      updateTelemetry(newFrame);
    }

    requestAnimationFrame(updateAnimationLoop);
  }
  requestAnimationFrame(updateAnimationLoop);

  // --- 6. TELEMETRY & HUD INSTRUMENTATION ---
  function updateTelemetry(frame) {
    const progress = (frame - 1) / (TOTAL_FRAMES - 1);

    // Frame counter
    if (frameCounterEl) {
      frameCounterEl.textContent = `FRAME ${String(frame).padStart(3, '0')}/${TOTAL_FRAMES}`;
    }

    // Speedometer simulation (0 -> 348 KM/H)
    const speed = Math.floor(progress * 348);
    if (speedValEl) speedValEl.textContent = String(speed).padStart(3, '0');

    // Throttle bar
    if (throttleBarEl) {
      throttleBarEl.style.width = `${Math.floor(progress * 100)}%`;
    }

    // Gear indicator
    if (gearValEl) {
      if (progress < 0.05) gearValEl.textContent = 'N';
      else if (progress < 0.16) gearValEl.textContent = '1';
      else if (progress < 0.32) gearValEl.textContent = '2';
      else if (progress < 0.48) gearValEl.textContent = '3';
      else if (progress < 0.62) gearValEl.textContent = '4';
      else if (progress < 0.76) gearValEl.textContent = '5';
      else if (progress < 0.88) gearValEl.textContent = '6';
      else if (progress < 0.96) gearValEl.textContent = '7';
      else gearValEl.textContent = '8';
    }

    // Sector lights
    if (sec1 && sec2 && sec3) {
      sec1.classList.toggle('active', progress >= 0.0);
      sec2.classList.toggle('active', progress >= 0.33);
      sec3.classList.toggle('active', progress >= 0.66);
    }

    // Story slides transition
    let activeSlideIdx = 0;
    if (progress < 0.25) activeSlideIdx = 0;
    else if (progress < 0.55) activeSlideIdx = 1;
    else if (progress < 0.80) activeSlideIdx = 2;
    else activeSlideIdx = 3;

    slides.forEach((slide, idx) => {
      if (slide) {
        slide.classList.toggle('active', idx === activeSlideIdx);
      }
    });
  }

  // --- 7. SPOTLIGHT CURSOR CARD HOVER EFFECT ---
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(255,255,255,0.06), rgba(14, 18, 27, 0.85))`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  // --- 8. F1 TURBO ENGINE AUDIO SYNTHESIZER (WEB AUDIO API) ---
  let audioCtx = null;
  let oscillator = null;
  let subOsc = null;
  let gainNode = null;
  let soundEnabled = false;

  const soundToggleBtn = document.getElementById('sound-toggle');
  const audioIcon = document.getElementById('audio-icon');

  function initAudio() {
    if (audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gainNode.connect(audioCtx.destination);

    // Primary V6 High RPM Sawtooth
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(95, audioCtx.currentTime);

    // Sub Bass Exhaust Rumble
    subOsc = audioCtx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(45, audioCtx.currentTime);

    oscillator.connect(gainNode);
    subOsc.connect(gainNode);

    oscillator.start();
    subOsc.start();
  }

  function modulateEngineSound(velocity) {
    if (!audioCtx || !soundEnabled) return;
    const baseFreq = 95 + Math.min(velocity * 15, 480);
    oscillator.frequency.setTargetAtTime(baseFreq, audioCtx.currentTime, 0.05);
    subOsc.frequency.setTargetAtTime(baseFreq * 0.5, audioCtx.currentTime, 0.05);
  }

  function playEngineRev(multiplier = 1) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    oscillator.frequency.setValueAtTime(100 * multiplier, now);
    oscillator.frequency.exponentialRampToValueAtTime(360 * multiplier, now + 0.3);
    oscillator.frequency.exponentialRampToValueAtTime(120 * multiplier, now + 0.8);
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        initAudio();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        soundToggleBtn.classList.add('playing');
        if (audioIcon) audioIcon.setAttribute('data-lucide', 'volume-2');
        playEngineRev(1.5);
      } else {
        if (audioCtx) audioCtx.suspend();
        soundToggleBtn.classList.remove('playing');
        if (audioIcon) audioIcon.setAttribute('data-lucide', 'volume-x');
      }
      if (window.lucide) lucide.createIcons();
    });
  }

  // --- 9. COUNTDOWN LAP TIMER ---
  const timerEl = document.getElementById('f1-lap-timer');
  const targetDate = new Date('September 10, 2026 09:00:00 GMT+0530').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (timerEl) timerEl.textContent = 'LIGHTS OUT // RACE IN PROGRESS';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (timerEl) {
      timerEl.textContent = `${days}D ${hours}H ${minutes}M ${seconds}S`;
    }
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // --- 10. REGISTRATION MODAL & BOARDING PASS GENERATOR ---
  const modal = document.getElementById('register-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openRegBtns = document.querySelectorAll('.open-register-btn');
  const regForm = document.getElementById('reg-form');
  const optionSquad = document.getElementById('option-squad');
  const optionDuo = document.getElementById('option-duo');
  const squadDriversWrap = document.getElementById('squad-drivers-wrap');
  const summaryPrice = document.getElementById('summary-price');
  const passSuccessView = document.getElementById('pass-success-view');
  const closeSuccessBtn = document.getElementById('close-success-btn');

  // Ticket Preview Elements
  const tTeamName = document.getElementById('t-team-name');
  const tTrackName = document.getElementById('t-track-name');
  const tPassId = document.getElementById('t-pass-id');

  function openModal(mode = 'squad') {
    modal.classList.add('active');
    setTeamTier(mode);
  }

  function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
      if (passSuccessView) passSuccessView.classList.add('hidden');
      if (regForm) {
        regForm.classList.remove('hidden');
        regForm.reset();
      }
    }, 300);
  }

  function setTeamTier(tier) {
    if (tier === 'duo') {
      optionDuo.classList.add('active');
      optionSquad.classList.remove('active');
      optionDuo.querySelector('input').checked = true;
      squadDriversWrap.classList.add('hidden');
      summaryPrice.textContent = '₹250';
    } else {
      optionSquad.classList.add('active');
      optionDuo.classList.remove('active');
      optionSquad.querySelector('input').checked = true;
      squadDriversWrap.classList.remove('hidden');
      summaryPrice.textContent = '₹500';
    }
  }

  openRegBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode') || 'squad';
      openModal(mode);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (optionSquad) {
    optionSquad.addEventListener('click', () => setTeamTier('squad'));
  }
  if (optionDuo) {
    optionDuo.addEventListener('click', () => setTeamTier('duo'));
  }

  // Handle Form Submission
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const teamName = document.getElementById('reg-team-name').value;
      const trackVal = document.getElementById('reg-track').value;
      let displayTrack = 'SOFTWARE & AI MATRIX';
      if (trackVal === 'hardware') displayTrack = 'HARDWARE & ROBOTICS FORGE';
      if (trackVal === 'hybrid') displayTrack = 'HYBRID TELEMETRY DOMAIN';

      const randomSlot = 'GRID-' + Math.floor(1000 + Math.random() * 9000);

      if (tTeamName) tTeamName.textContent = teamName.toUpperCase();
      if (tTrackName) tTrackName.textContent = displayTrack;
      if (tPassId) tPassId.textContent = randomSlot;

      if (soundEnabled) playEngineRev(2.2);

      regForm.classList.add('hidden');
      passSuccessView.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    });
  }

  // --- 11. PIT WALL FAQ ACCORDION ---
  const faqBlocks = document.querySelectorAll('.faq-block');
  faqBlocks.forEach(block => {
    const trigger = block.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = block.classList.contains('active');
      faqBlocks.forEach(b => b.classList.remove('active'));
      if (!isActive) {
        block.classList.add('active');
      }
    });
  });
});
