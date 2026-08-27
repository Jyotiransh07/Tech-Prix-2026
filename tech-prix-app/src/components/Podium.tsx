
import { Check, Zap, Cpu, ShieldCheck } from 'lucide-react';
export default function Podium() {
  return (
    <section id="podium" className="content-section podium-showcase-new" style={{ paddingTop: '120px', scrollMarginTop: '0px' }}>
      <div className="f1-container">
        <div className="section-header-block text-center" style={{ marginBottom: '10px' }}>
          <h2 className="section-title-large text-glitch reward-heading-glitch" data-text="PRIZE POOL">PRIZE POOL</h2>
        </div>
        
        <div className="rewards-hero-layout">
          
          {/* P2 - Runner Up */}
          <div className="reward-side-card">
            <div className="card-inner p2-inner">
              <h3 className="rc-rank">P2</h3>
              <p className="rc-title">RUNNER-UP</p>
              <div className="rc-laurel">
                <div className="rc-prize-val">₹2,000</div>
              </div>
              <p className="rc-cert">+ Certificate</p>
              <div className="rc-footer-graphic">
                <img src="/checkered-flag-cross.png" alt="Checkered Flags" className="rc-f1-img" />
              </div>
            </div>
          </div>

          {/* P1 - Champion (Center) */}
          <div className="reward-center-focus">
            <div className="center-img-wrapper">
              <img 
                src="/max-fix.png" 
                alt="Tech Prix Champion" 
                className="champ-hero-img"
              />
            </div>
            <div className="reward-plaque p1-plaque">
              <h3 className="plaque-rank text-gold">P1</h3>
              <p className="plaque-title text-red">CHAMPION</p>
              <div className="plaque-stars">★ ★ ★</div>
              <div className="plaque-prize-val text-gold">₹3,000</div>
              <p className="plaque-cert text-white">+ Certificate</p>
            </div>
          </div>

          {/* P3 - 2nd Runner Up */}
          <div className="reward-side-card">
            <div className="card-inner p3-inner">
              <h3 className="rc-rank">P3</h3>
              <p className="rc-title">2ND RUNNER-UP</p>
              <div className="rc-laurel">
                <div className="rc-prize-val">₹1,000</div>
              </div>
              <p className="rc-cert">+ Certificate</p>
              <div className="rc-footer-graphic">
                <img src="/checkered-flag-cross.png" alt="Checkered Flags" className="rc-f1-img" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}