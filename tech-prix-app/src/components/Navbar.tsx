"use client";

import { CONFIG } from "../config";
import { VolumeX, Volume2, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar({ 
  soundEnabled, 
  setSoundEnabled, 
  onOpenModal 
}: { 
  soundEnabled: boolean; 
  setSoundEnabled: (val: boolean) => void;
  onOpenModal: (mode: string) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (href: string) => {
    closeMenu();
    // Small delay to let menu close before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <>
      <header className={`paddock-header ${isScrolled ? "scrolled" : "at-top"}`} id="navbar">
        <div className="header-inner">
          <a href="#hero" className="brand-link" onClick={closeMenu}>
            <div className="brand-logo-mark">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 15L12 3L20 15H15L12 10.5L9 15H4Z" fill="#E10600"/>
                <path d="M2 21L6 15H18L22 21H2Z" fill="#FFFFFF" fillOpacity="0.85"/>
              </svg>
            </div>
            <div className="brand-typography">
              <span className="brand-title">TECH PRIX</span>
              <span className="brand-sub">{CONFIG.ORGANIZERS}</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="nav-menu desktop-nav">
            <a href="#about" className="nav-item"><span>// 01</span> ABOUT</a>
            <a href="#tracks" className="nav-item"><span>// 02</span> CHALLENGES</a>
            <a href="#podium" className="nav-item"><span>// 03</span> REWARD</a>
            <a href="#circuit" className="nav-item"><span>// 04</span> SCHEDULE</a>
            <a href="#faq" className="nav-item"><span>// 05</span> FAQS</a>
          </nav>

          <div className="header-controls">
            <button 
              id="sound-toggle" 
              className={`telemetry-btn audio-btn ${soundEnabled ? "playing" : ""}`} 
              title="Toggle V6 Turbo Sound Engine"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              <span className="btn-caption">AUDIO FX</span>
            </button>
            <button className="cta-glory open-register-btn" onClick={() => { closeMenu(); onOpenModal("squad"); }}>
              <span className="cta-text">REGISTER NOW</span>
              <span className="cta-shine"></span>
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="hamburger-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-nav-overlay ${menuOpen ? "open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <nav className={`mobile-nav-drawer ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation">
        <div className="mobile-nav-inner">
          <div className="mobile-nav-links">
            <a href="#about" className="mobile-nav-item" onClick={() => handleNavClick("#about")}>
              <span className="mobile-nav-num">01</span>
              <span className="mobile-nav-label">ABOUT</span>
            </a>
            <a href="#tracks" className="mobile-nav-item" onClick={() => handleNavClick("#tracks")}>
              <span className="mobile-nav-num">02</span>
              <span className="mobile-nav-label">CHALLENGES</span>
            </a>
            <a href="#podium" className="mobile-nav-item" onClick={() => handleNavClick("#podium")}>
              <span className="mobile-nav-num">03</span>
              <span className="mobile-nav-label">REWARD</span>
            </a>
            <a href="#circuit" className="mobile-nav-item" onClick={() => handleNavClick("#circuit")}>
              <span className="mobile-nav-num">04</span>
              <span className="mobile-nav-label">SCHEDULE</span>
            </a>
            <a href="#faq" className="mobile-nav-item" onClick={() => handleNavClick("#faq")}>
              <span className="mobile-nav-num">05</span>
              <span className="mobile-nav-label">FAQS</span>
            </a>
          </div>

          <div className="mobile-nav-footer">
            <button
              className="cta-glory w-full"
              style={{ width: "100%", padding: "16px 28px", fontSize: "1rem" }}
              onClick={() => { closeMenu(); onOpenModal("squad"); }}
            >
              REGISTER NOW
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
