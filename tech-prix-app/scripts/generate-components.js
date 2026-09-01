const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'tech-prix-app/src/components');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const ExecutiveBriefing = `
import { Calendar, Trophy, Coffee, Award } from 'lucide-react';
export default function ExecutiveBriefing() {
  return (
    <section id="about" className="content-section paddock-briefing">
      <div className="f1-container">
        <div className="section-header-block">
          <div className="spec-kicker">
            <span className="kicker-line"></span>
            <span>EXECUTIVE RACE BRIEFING</span>
          </div>
          <h2 className="section-title-large">ENGINEERED FOR THE RELENTLESS</h2>
          <p className="section-summary">
            Tech Prix 2026 is an intense 24-hour sprint that blends the rigor of Formula 1 automotive engineering with cutting-edge software and hardware problem statements.
          </p>
        </div>
        <div className="metrics-grid">
          <div className="metric-card spotlight-card">
            <div className="metric-header"><div className="metric-icon-wrap"><Calendar size={20}/></div><span className="metric-code">DATE // 01</span></div>
            <div className="metric-number">10 SEPT</div>
            <div className="metric-title">RACE DAY 2026</div>
            <p className="metric-detail">High-octane national hackathon hosted across elite computing and fabrication labs.</p>
          </div>
          <div className="metric-card spotlight-card">
            <div className="metric-header"><div className="metric-icon-wrap gold-icon"><Trophy size={20}/></div><span className="metric-code text-gold">PURSE // 02</span></div>
            <div className="metric-number text-gold">₹45,000+</div>
            <div className="metric-title">TOTAL PRIZE POOL</div>
            <p className="metric-detail">Direct cash allocations, custom machined trophies, hardware bounties & investor access.</p>
          </div>
          <div className="metric-card spotlight-card">
            <div className="metric-header"><div className="metric-icon-wrap cyan-icon"><Coffee size={20}/></div><span className="metric-code text-cyan">AMENITIES // 03</span></div>
            <div className="metric-number text-cyan">INCLUDED</div>
            <div className="metric-title">BEVERAGES & FUEL</div>
            <p className="metric-detail">Complimentary midnight energy beverages, coffee, and pit refreshments for all participants.</p>
          </div>
          <div className="metric-card spotlight-card">
            <div className="metric-header"><div className="metric-icon-wrap green-icon"><Award size={20}/></div><span className="metric-code text-green">CREDENTIAL // 04</span></div>
            <div className="metric-number text-green">100%</div>
            <div className="metric-title">E-CERTIFICATES</div>
            <p className="metric-detail">Cryptographically verified digital certificates of merit and participation for every driver.</p>
          </div>
        </div>
      </div>
    </section>
  );
}`;
fs.writeFileSync(path.join(dir, 'ExecutiveBriefing.tsx'), ExecutiveBriefing);

const Podium = `
import { Check, Zap, Cpu, ShieldCheck } from 'lucide-react';
export default function Podium() {
  return (
    <section id="podium" className="content-section podium-showcase">
      <div className="f1-container">
        <div className="section-header-block text-center">
          <div className="spec-kicker justify-center"><span className="kicker-line"></span><span>PARC FERMÉ ALLOCATIONS</span><span className="kicker-line"></span></div>
          <h2 className="section-title-large">CHAMPIONSHIP PODIUM PURSE</h2>
        </div>
        <div className="podium-monument-grid">
          {/* P2 */}
          <div className="podium-pillar p2-pillar spotlight-card">
            <div className="pillar-card-content">
              <div className="pillar-rank-chip">P2 // 1ST RUNNER UP</div>
              <div className="pillar-cash-val">₹15,000</div>
              <div className="pillar-title">SILVER PISTON AWARD</div>
            </div>
            <div className="podium-base-block base-p2"><span className="base-number">2</span></div>
          </div>
          {/* P1 */}
          <div className="podium-pillar p1-pillar spotlight-card champion-spotlight">
            <div className="pillar-card-content">
              <div className="pillar-rank-chip champ-chip">P1 // WORLD CHAMPION</div>
              <div className="pillar-cash-val champ-cash">₹25,000</div>
              <div className="pillar-title champ-title">WORLD CONSTRUCTOR CUP</div>
            </div>
            <div className="podium-base-block base-p1"><span className="base-number">1</span></div>
          </div>
          {/* P3 */}
          <div className="podium-pillar p3-pillar spotlight-card">
            <div className="pillar-card-content">
              <div className="pillar-rank-chip">P3 // 2ND RUNNER UP</div>
              <div className="pillar-cash-val">₹5,000</div>
              <div className="pillar-title">BRONZE PODIUM AWARD</div>
            </div>
            <div className="podium-base-block base-p3"><span className="base-number">3</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}`;
fs.writeFileSync(path.join(dir, 'Podium.tsx'), Podium);

const Disciplines = `
import { Terminal, Cpu, Activity, Wrench } from 'lucide-react';
export default function Disciplines() {
  return (
    <section id="tracks" className="content-section tracks-showcase">
      <div className="f1-container">
        <div className="section-header-block">
          <div className="spec-kicker"><span className="kicker-line"></span><span>SELECT YOUR RACING CLASS</span></div>
          <h2 className="section-title-large">PIT GARAGE DISCIPLINES</h2>
        </div>
        <div className="disciplines-grid">
          <div className="discipline-box software-livery spotlight-card">
            <div className="discipline-header-strip strip-red"><span className="strip-icon"><Terminal size={18}/></span><span className="strip-text">DISCIPLINE 01 // SOFTWARE & AI MATRIX</span></div>
            <div className="discipline-body">
              <h3 className="discipline-title">TELEMETRY, AI & HIGH-FREQUENCY CODE</h3>
              <div className="tech-stack-pills">
                <span className="tech-pill">Generative AI</span><span className="tech-pill">Web3</span><span className="tech-pill">Cloud APIs</span>
              </div>
            </div>
          </div>
          <div className="discipline-box hardware-livery spotlight-card">
            <div className="discipline-header-strip strip-green"><span className="strip-icon"><Cpu size={18}/></span><span className="strip-text">DISCIPLINE 02 // HARDWARE & ROBOTICS FORGE</span></div>
            <div className="discipline-body">
              <h3 className="discipline-title">EMBEDDED SYSTEMS & AERODYNAMICS</h3>
              <div className="tech-stack-pills">
                <span className="tech-pill">IoT Sensors</span><span className="tech-pill">Robotics</span><span className="tech-pill">Embedded</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`;
fs.writeFileSync(path.join(dir, 'Disciplines.tsx'), Disciplines);

const CircuitTimeline = `
export default function CircuitTimeline() {
  return (
    <section id="circuit" className="content-section circuit-schedule">
      <div className="f1-container">
        <div className="section-header-block">
          <div className="spec-kicker"><span className="kicker-line"></span><span>GRAND PRIX SCHEDULE</span></div>
          <h2 className="section-title-large">CIRCUIT RACE TIMELINE</h2>
        </div>
        <div className="race-timeline-track">
          <div className="track-line"></div>
          <div className="timeline-checkpoint highlight-checkpoint">
            <div className="checkpoint-node pulse-node"><span className="node-core"></span></div>
            <div className="checkpoint-card spotlight-card active-card">
              <div className="checkpoint-session text-red">SESSION 03 // LIGHTS OUT</div>
              <h4 className="checkpoint-title text-white">RACE DAY: TECH PRIX HACKATHON</h4>
              <p className="checkpoint-body">10th September 2026. 24-hour sprint.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`;
fs.writeFileSync(path.join(dir, 'CircuitTimeline.tsx'), CircuitTimeline);

const PaddockPasses = `
export default function PaddockPasses({ onOpenModal }: { onOpenModal: (mode: string) => void }) {
  return (
    <section id="passes" className="content-section pricing-passes">
      <div className="f1-container">
        <div className="section-header-block text-center">
          <h2 className="section-title-large">CLAIM YOUR PADDOCK PASS</h2>
        </div>
        <div className="passes-grid">
          <div className="pass-box spotlight-card">
            <div className="pass-tier-header">
              <span className="tier-code">PASS TIER // DUO</span>
              <div className="tier-cost">₹250</div>
            </div>
            <button className="cta-secondary" onClick={() => onOpenModal('duo')}>SELECT DUO PASS</button>
          </div>
          <div className="pass-box featured-pass-box spotlight-card">
            <div className="pass-tier-header">
              <span className="tier-code text-red">PASS TIER // CONSTRUCTOR SQUAD</span>
              <div className="tier-cost text-white">₹500</div>
            </div>
            <button className="cta-glory" onClick={() => onOpenModal('squad')}>SELECT SQUAD PASS</button>
          </div>
        </div>
      </div>
    </section>
  );
}`;
fs.writeFileSync(path.join(dir, 'PaddockPasses.tsx'), PaddockPasses);

const FAQ = `
'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
export default function FAQ() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="content-section pit-wall-faq">
      <div className="f1-container max-w-850">
        <h2 className="section-title-large text-center">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="faq-list mt-4">
          {[
            {q: 'What skill level is expected?', a: 'All levels welcome.'},
            {q: 'Are refreshments provided?', a: 'Yes, beverages included.'}
          ].map((item, i) => (
            <div key={i} className={\`faq-block spotlight-card \${active===i?'active':''}\`}>
              <button className="faq-trigger" onClick={() => setActive(active===i ? null : i)}>
                <span>{item.q}</span><ChevronDown className="faq-arrow" size={18}/>
              </button>
              <div className="faq-drawer"><p>{item.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
fs.writeFileSync(path.join(dir, 'FAQ.tsx'), FAQ);

const Footer = `
export default function Footer() {
  return (
    <footer className="paddock-footer">
      <div className="f1-container">
        <div className="footer-bottom-bar">
          <p>© 2026 Tech Prix. Co-hosted by Space & Orbyte Technical Clubs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}`;
fs.writeFileSync(path.join(dir, 'Footer.tsx'), Footer);

const RegistrationModal = `
export default function RegistrationModal({ mode, onClose }: { mode: 'squad' | 'duo', onClose: () => void }) {
  return (
    <div className="modal-backdrop-wrap active">
      <div className="modal-card-dialog spotlight-card">
        <button className="dialog-close-btn" onClick={onClose}>&times;</button>
        <div className="dialog-header">
          <div className="dialog-badge">FIA OFFICIAL GRID ENTRY</div>
          <h3 className="dialog-title">RESERVE YOUR STARTING POSITION</h3>
        </div>
        <form className="dialog-form" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <button type="submit" className="cta-glory">CONFIRM ENTRY</button>
        </form>
      </div>
    </div>
  );
}`;
fs.writeFileSync(path.join(dir, 'RegistrationModal.tsx'), RegistrationModal);

console.log('Components generated successfully.');
