
import { Terminal, Cpu, Activity, Wrench } from 'lucide-react';
export default function Disciplines() {
  return (
    <section id="tracks" className="content-section tracks-showcase" style={{ scrollMarginTop: '0px', paddingTop: '120px', paddingBottom: '0px' }}>
      <div className="f1-container">
        <div className="section-header-block">
          <div className="spec-kicker"><span className="kicker-line"></span><span>SELECT YOUR TRACK</span></div>
          <h2 className="section-title-large">CHALLENGES</h2>
        </div>
        <div className="disciplines-grid">
          <div className="discipline-box software-livery spotlight-card">
            <div className="discipline-header-strip strip-red"><span className="strip-icon"><Cpu size={18}/></span><span className="strip-text">TRACK 01 // HARDWARE & IoT</span></div>
            <div className="discipline-body">
              <h3 className="discipline-title">SMART DEVICES & MICROCONTROLLERS</h3>
              <div className="tech-stack-pills">
                <span className="tech-pill">Arduino & ESP32</span><span className="tech-pill">Sensors</span><span className="tech-pill">Software Integration</span>
              </div>
            </div>
          </div>
          <div className="discipline-box hardware-livery spotlight-card">
            <div className="discipline-header-strip strip-green"><span className="strip-icon"><Wrench size={18}/></span><span className="strip-text">TRACK 02 // ROBOTICS & AUTOMATION</span></div>
            <div className="discipline-body">
              <h3 className="discipline-title">AUTONOMOUS MACHINES</h3>
              <div className="tech-stack-pills">
                <span className="tech-pill">Robotics</span><span className="tech-pill">Drones</span><span className="tech-pill">Hardware Prototyping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}