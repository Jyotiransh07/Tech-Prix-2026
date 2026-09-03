
export default function RegistrationModal({ mode, onClose }: { mode?: string; onClose: () => void }) {
  return (
    <div className="modal-backdrop-wrap active" data-mode={mode}>
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
}