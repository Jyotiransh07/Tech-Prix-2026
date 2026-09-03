import { Terminal, Cpu, Activity, Wrench, Factory, Zap, Download } from 'lucide-react';

export default function Disciplines() {
  return (
    <section id="tracks" className="content-section tracks-showcase" style={{ position: 'relative', scrollMarginTop: '0px', paddingTop: '80px', paddingBottom: '80px' }}>
      
      {/* Full-width Subtle Background Image */}
      <div className="f1-bg-pattern" />

      <div className="f1-container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-header-block text-center">
          <h2 className="section-title-large text-glitch reward-heading-glitch" data-text="CHALLENGES">CHALLENGES</h2>
        </div>
        <div className="disciplines-grid">
          
          <div className="discipline-box software-livery spotlight-card">
            <div className="discipline-header-strip strip-red"><span className="strip-icon"><Cpu size={18}/></span><span className="strip-text">DOMAIN 01</span></div>
            <div className="discipline-body">
              <h3 className="discipline-title">EMBEDDED SYSTEMS & IOT</h3>
            </div>
          </div>

          <div className="discipline-box hardware-livery spotlight-card">
            <div className="discipline-header-strip strip-green"><span className="strip-icon"><Factory size={18}/></span><span className="strip-text">DOMAIN 02</span></div>
            <div className="discipline-body">
              <h3 className="discipline-title">INDUSTRIAL AUTOMATION & PLC</h3>
            </div>
          </div>

          <div className="discipline-box software-livery spotlight-card">
            <div className="discipline-header-strip strip-red"><span className="strip-icon"><Wrench size={18}/></span><span className="strip-text">DOMAIN 03</span></div>
            <div className="discipline-body">
              <h3 className="discipline-title">ROBOTICS & AUTOMATION</h3>
            </div>
          </div>

          <div className="discipline-box hardware-livery spotlight-card">
            <div className="discipline-header-strip strip-green"><span className="strip-icon"><Activity size={18}/></span><span className="strip-text">DOMAIN 04</span></div>
            <div className="discipline-body">
              <h3 className="discipline-title">INDUSTRIAL COMMUNICATION & INDUSTRY 4.0</h3>
            </div>
          </div>

          <div className="discipline-box software-livery spotlight-card">
            <div className="discipline-header-strip strip-red"><span className="strip-icon"><Terminal size={18}/></span><span className="strip-text">DOMAIN 05</span></div>
            <div className="discipline-body">
              <h3 className="discipline-title">AI & SMART AUTOMATION</h3>
            </div>
          </div>

          <div className="discipline-box hardware-livery spotlight-card">
            <div className="discipline-header-strip strip-green"><span className="strip-icon"><Zap size={18}/></span><span className="strip-text">DOMAIN 06</span></div>
            <div className="discipline-body">
              <h3 className="discipline-title">ENERGY & SUSTAINABLE ELECTRONICS</h3>
            </div>
          </div>

        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <a href="/Tech_Prix_Problem_Statement.pdf" download className="cta-glory" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <Download size={18} />
            DOWNLOAD DETAILED PROBLEM STATEMENT
          </a>
        </div>
      </div>
    </section>
  );
}