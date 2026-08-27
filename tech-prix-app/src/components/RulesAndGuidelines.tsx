"use client";
import Image from 'next/image';

export default function RulesAndGuidelines() {
  return (
    <section id="rules" className="content-section race-regulations" style={{ paddingTop: '40px', paddingBottom: '0px', marginBottom: '0px' }}>
      <div className="f1-container max-w-[1200px] mx-auto px-4">
        <div className="section-header-block text-center">
          <h2 className="section-title-large text-glitch reward-heading-glitch" data-text="RULES & GUIDELINES">RULES & GUIDELINES</h2>
          <p className="section-summary" style={{ margin: '24px auto 0 auto', textAlign: 'center' }}>
            All teams must follow these guidelines to ensure a fair and safe competition.
          </p>
        </div>

        <div className="relative w-full max-w-[850px] mx-auto mt-8 md:mt-12">
          {/* Rules Card */}
          <div className="rules-container spotlight-card w-full relative z-10 bg-black/80 backdrop-blur-sm">
            <ul className="tire-list">
              <li className="tire-bullet-item">
                <span className="tire-icon"></span>
                <div>
                  <strong>Bring Your Own Gear & Prior Work:</strong> No tools or equipment will be provided at the venue. You must bring all your own materials. However, you are permitted to do some of the work prior to the event and bring it on the day.
                </div>
              </li>
              <li className="tire-bullet-item">
                <span className="tire-icon"></span>
                <div>
                  <strong>Power Limits:</strong> High-voltage components exceeding 24V DC or 110V AC require explicit safety sign-off from the Event Mentors prior to testing.
                </div>
              </li>
              <li className="tire-bullet-item">
                <span className="tire-icon"></span>
                <div>
                  <strong>Component Inspection:</strong> All components, including partially assembled pre-work, must be declared and inspected at the start of the event to ensure fairness and safety.
                </div>
              </li>
              <li className="tire-bullet-item">
                <span className="tire-icon"></span>
                <div>
                  <strong>Workspace Safety:</strong> Soldering irons and heat guns must only be used in designated fire-safe workspaces. Proper eye protection is mandatory during fabrication.
                </div>
              </li>
              <li className="tire-bullet-item">
                <span className="tire-icon"></span>
                <div>
                  <strong>Open-Source Code:</strong> Any software used to control your hardware must be pushed to a public repository for the judges to verify.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
