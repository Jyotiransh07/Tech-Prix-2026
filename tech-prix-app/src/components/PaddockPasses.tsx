
export default function PaddockPasses({ onOpenModal }: { onOpenModal: (mode: string) => void }) {
  return (
    <section id="passes" className="content-section pricing-passes">
      <div className="f1-container">
        <div className="section-header-block text-center">
          <h2 className="section-title-large">CLAIM YOUR EVENT PASS</h2>
        </div>
        <div className="passes-grid" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="pass-box featured-pass-box spotlight-card" style={{ maxWidth: '400px', width: '100%' }}>
            <div className="pass-tier-header">
              <span className="tier-code text-red">PASS TIER // ENTRY PASS</span>
              <div className="tier-cost text-white">₹300</div>
            </div>
            <button className="cta-glory" onClick={() => onOpenModal('register')}>REGISTER NOW</button>
          </div>
        </div>
      </div>
    </section>
  );
}