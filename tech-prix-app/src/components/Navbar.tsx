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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`paddock-header ${isScrolled ? 'scrolled' : 'at-top'}`} id="navbar">
      <div className="header-inner">
        <a href="#hero" className="brand-link" onClick={handleNavClick}>
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

        <nav className={`nav-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}>
          <a href="#about" className="nav-item" onClick={handleNavClick}><span>// 01</span> ABOUT</a>
          <a href="#tracks" className="nav-item" onClick={handleNavClick}><span>// 02</span> CHALLENGES</a>
          <a href="#podium" className="nav-item" onClick={handleNavClick}><span>// 03</span> REWARD</a>
          <a href="#circuit" className="nav-item" onClick={handleNavClick}><span>// 04</span> SCHEDULE</a>
          <a href="#faq" className="nav-item" onClick={handleNavClick}><span>// 05</span> FAQS</a>
        </nav>

        <div className="header-controls">
          <button 
            id="sound-toggle" 
            className={`telemetry-btn audio-btn ${soundEnabled ? 'playing' : ''}`} 
            title="Toggle V6 Turbo Sound Engine"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            <span className="btn-caption">AUDIO FX</span>
          </button>
          <button className="cta-glory open-register-btn" onClick={() => { onOpenModal("squad"); handleNavClick(); }}>
            <span className="cta-text">REGISTER NOW</span>
            <span className="cta-shine"></span>
          </button>
          <button 
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
