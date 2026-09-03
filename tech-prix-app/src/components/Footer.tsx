import { Phone } from 'lucide-react';

export default function Footer({ onOpenModal }: { onOpenModal: (mode: string) => void }) {
  return (
    <footer className="paddock-footer">
      <div className="f1-container">
        <div className="footer-cta-block">
          <p className="footer-cta-headline">Ready to race?</p>
          <p className="footer-cta-sub">Secure your spot before seats run out.</p>
          <button
            className="cta-glory footer-register-btn"
            onClick={() => onOpenModal("squad")}
          >
            REGISTER NOW
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', paddingBottom: '64px', color: '#a1a1aa', textAlign: 'left' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '28px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', minWidth: '320px', flex: '1', maxWidth: '400px' }}>
            <h4 style={{ color: '#fff', marginBottom: '24px', letterSpacing: '1.5px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(225, 6, 0, 0.15)', padding: '6px', borderRadius: '6px' }}>
                <Phone size={14} style={{ color: '#E10600' }} />
              </div>
              STUDENT COORDINATORS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ margin: '0', fontSize: '0.95rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e4e4e7', fontWeight: 500 }}>Mihir Pimple</span>
                <span style={{ fontFamily: 'monospace', color: '#06b6d4', fontSize: '1.05rem', letterSpacing: '1px' }}>7066706995</span>
              </p>
              <p style={{ margin: '0', fontSize: '0.95rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e4e4e7', fontWeight: 500 }}>Jatin Tandel</span>
                <span style={{ fontFamily: 'monospace', color: '#06b6d4', fontSize: '1.05rem', letterSpacing: '1px' }}>9764151223</span>
              </p>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '28px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', minWidth: '320px', flex: '1', maxWidth: '400px' }}>
            <h4 style={{ color: '#fff', marginBottom: '24px', letterSpacing: '1.5px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(225, 6, 0, 0.15)', padding: '6px', borderRadius: '6px' }}>
                <Phone size={14} style={{ color: '#E10600' }} />
              </div>
              FACULTY COORDINATORS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ margin: '0', fontSize: '0.95rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e4e4e7', fontWeight: 500 }}>Vishakha Rane</span>
                <span style={{ fontFamily: 'monospace', color: '#06b6d4', fontSize: '1.05rem', letterSpacing: '1px' }}>9730371605</span>
              </p>
              <p style={{ margin: '0', fontSize: '0.95rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e4e4e7', fontWeight: 500 }}>Aishwarya Churi</span>
                <span style={{ fontFamily: 'monospace', color: '#06b6d4', fontSize: '1.05rem', letterSpacing: '1px' }}>9890413170</span>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-divider" />
        <div className="footer-bottom-bar">
          <p>© 2026 Tech Prix. Co-hosted by Space &amp; Orbyte Technical Clubs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}