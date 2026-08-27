"use client";

import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const TOTAL_FRAMES = 150;
  const FOLDER_PATH = "/ferrari-frames/";
  const [percent, setPercent] = useState(0);
  const [lights, setLights] = useState(0); // 0 to 5
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    
    // In React, we preload images into the browser cache
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameIndex = `frame_${String(i).padStart(4, "0")}.png`;
      img.src = `${FOLDER_PATH}${frameIndex}`;
      
      const onImageLoad = () => {
        loadedCount++;
        const p = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
        setPercent(p);
        
        const l = Math.floor((p / 100) * 5);
        setLights(l);
        
        if (loadedCount === TOTAL_FRAMES) {
          setTimeout(() => {
            setLights(0);
            setTimeout(() => {
              setFadeOut(true);
              setTimeout(onComplete, 700);
            }, 350);
          }, 450);
        }
      };
      
      img.onload = onImageLoad;
      img.onerror = onImageLoad; // Continue even if error
    }
  }, [onComplete]);

  return (
    <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
      <div className="preloader-inner">
        <div className="fia-badge">
          <span className="fia-dot"></span>
          <span className="fia-text">OFFICIAL TELEMETRY INITIALIZATION</span>
        </div>

        <div className="f1-gantry">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className={`gantry-column ${idx <= lights ? "lit" : ""}`}>
              <span className="bulb"></span>
            </div>
          ))}
        </div>

        <div className="preloader-telemetry">
          <div className="loading-bar-track">
            <div className="loading-bar-fill" style={{ width: `${percent}%` }}></div>
          </div>
          <div className="loading-meta">
            <span className="meta-label">CALIBRATING CHASSIS & AERODYNAMICS</span>
            <span className="meta-val">{percent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
