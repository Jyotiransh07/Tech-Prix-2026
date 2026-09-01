
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
        <div className="footer-divider" />
        <div className="footer-bottom-bar">
          <p>© 2026 Tech Prix. Co-hosted by Space &amp; Orbyte Technical Clubs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}