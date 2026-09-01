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
                  <strong>Time Limit:</strong> 6-hour hackathon. All projects must be finished and submitted within this window.
                </div>
              </li>
              <li className="tire-bullet-item">
                <span className="tire-icon"></span>
                <div>
                  <strong>BYO Gear:</strong> Teams must bring their own laptops, components, sensors, boards, and tools.
                </div>
              </li>
              <li className="tire-bullet-item">
                <span className="tire-icon"></span>
                <div>
                  <strong>Prior Work:</strong> Pre-existing code or hardware is allowed but must be declared. A substantial new feature must be added during the event.
                </div>
              </li>
              <li className="tire-bullet-item">
                <span className="tire-icon"></span>
                <div>
                  <strong>Tech & AI:</strong> APIs, open-source resources, and AI (ChatGPT, Gemini) are allowed, but you must fully understand and be able to explain your work.
                </div>
              </li>
              <li className="tire-bullet-item">
                <span className="tire-icon"></span>
                <div>
                  <strong>Safety First:</strong> Adhere strictly to all electrical, fabrication, and venue safety rules. Unsafe practices will be restricted.
                </div>
              </li>
              <li className="tire-bullet-item">
                <span className="tire-icon"></span>
                <div>
                  <strong>Demo:</strong> Submit required documentation on time and demonstrate a working solution to the judges.
                </div>
              </li>
              <li className="tire-bullet-item">
                <span className="tire-icon"></span>
                <div>
                  <strong>Conduct:</strong> No plagiarism or misconduct. Organizer instructions are final, and violations will lead to disqualification.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
