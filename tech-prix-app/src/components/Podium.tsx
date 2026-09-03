import { Trophy, Lightbulb, Flag } from 'lucide-react';

const CustomTrophy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" className="theme-icon">
    <defs>
      <path id="leaf" d="M 0 0 C -5 -5 0 -14 0 -14 C 5 -5 0 0 0 0 Z" fill="#E10600" />
    </defs>

    {/* Left Laurel */}
    <path d="M 25 90 C 5 80 5 40 15 20" fill="none" stroke="#E10600" strokeWidth="3" strokeLinecap="round" />
    <use href="#leaf" x="15" y="75" transform="rotate(-60 15 75)" />
    <use href="#leaf" x="10" y="55" transform="rotate(-45 10 55)" />
    <use href="#leaf" x="11" y="35" transform="rotate(-30 11 35)" />
    <use href="#leaf" x="14" y="20" transform="rotate(-15 14 20)" />

    <use href="#leaf" x="15" y="75" transform="rotate(30 15 75)" />
    <use href="#leaf" x="10" y="55" transform="rotate(45 10 55)" />
    <use href="#leaf" x="11" y="35" transform="rotate(60 11 35)" />

    {/* Right Laurel */}
    <path d="M 75 90 C 95 80 95 40 85 20" fill="none" stroke="#E10600" strokeWidth="3" strokeLinecap="round" />
    <use href="#leaf" x="85" y="75" transform="rotate(60 85 75)" />
    <use href="#leaf" x="90" y="55" transform="rotate(45 90 55)" />
    <use href="#leaf" x="89" y="35" transform="rotate(30 89 35)" />
    <use href="#leaf" x="86" y="20" transform="rotate(15 86 20)" />

    <use href="#leaf" x="85" y="75" transform="rotate(-30 85 75)" />
    <use href="#leaf" x="90" y="55" transform="rotate(-45 90 55)" />
    <use href="#leaf" x="89" y="35" transform="rotate(-60 89 35)" />

    {/* Handles (Behind Bowl) */}
    <path d="M 30 32 C 10 32 10 62 40 60" fill="none" stroke="#E10600" strokeWidth="6" strokeLinecap="round" />
    <path d="M 70 32 C 90 32 90 62 60 60" fill="none" stroke="#E10600" strokeWidth="6" strokeLinecap="round" />

    {/* Trophy Base */}
    <path d="M 38 90 L 62 90 L 62 84 L 38 84 Z" fill="#E10600" />
    <path d="M 43 84 L 57 84 L 55 72 L 45 72 Z" fill="#E10600" />
    
    {/* Bowl */}
    <path d="M 28 25 L 72 25 C 72 65 60 72 50 72 C 40 72 28 65 28 25 Z" fill="#E10600" />
    
    {/* Top Rim */}
    <rect x="24" y="20" width="52" height="5" fill="#E10600" rx="2" />

    {/* Star */}
    <polygon points="50,32 53,39 61,38 55,45 57,54 50,49 43,54 45,45 39,38 47,39" fill="#FBBF24" />
  </svg>
);
export default function Podium() {
  return (
    <section id="podium" className="content-section podium-showcase-new" style={{ paddingTop: '80px', paddingBottom: '0px', scrollMarginTop: '0px' }}>
      <div className="f1-container">
        
        <div className="rewards-hero-layout new-rewards-layout">
          
          {/* LEFT CARD - INNOVATE */}
          <div className="reward-side-card theme-card-new">
            <div className="card-inner theme-card-inner">
              <div className="theme-icon-wrap">
                <Lightbulb className="theme-icon text-red" size={64} strokeWidth={1.5} />
              </div>
              <h3 className="theme-title text-white">INNOVATE</h3>
              <p className="theme-subtitle text-white">TURN IDEAS<br/>INTO IMPACT</p>
              <div className="theme-divider"></div>
              <div className="rc-footer-graphic">
                <img src="/checkered-flag-cross.png" alt="Checkered Flags" className="rc-f1-img" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>

          {/* CENTER CARD - PRIZE POOL */}
          <div className="reward-center-focus theme-center-card">
            <div className="center-img-wrapper" style={{ marginBottom: '-60px' }}>
              <img 
                src="/max-fix.png" 
                alt="Tech Prix Champion" 
                className="champ-hero-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="reward-side-card theme-card-new center-plaque">
              <div className="card-inner theme-card-inner">
                <div className="theme-icon-wrap">
                  <CustomTrophy />
                </div>
                <h3 className="theme-title-large text-white">₹6,000+</h3>
                <p className="theme-subtitle text-red" style={{ color: '#E10600', fontWeight: 'bold' }}>TOTAL PRIZE POOL</p>
                <div className="theme-divider"></div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD - COMPETE */}
          <div className="reward-side-card theme-card-new">
            <div className="card-inner theme-card-inner">
              <div className="theme-icon-wrap">
                <Flag className="theme-icon text-red" size={64} strokeWidth={1.5} />
              </div>
              <h3 className="theme-title text-white">COMPETE</h3>
              <p className="theme-subtitle text-white">RACE • BUILD • CONQUER</p>
              <div className="theme-divider"></div>
              <div className="rc-footer-graphic">
                <img src="/checkered-flag-cross.png" alt="Checkered Flags" className="rc-f1-img" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}