'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="faq" className="content-section pit-wall-faq" style={{ position: 'relative', paddingTop: '120px', marginTop: '0px', scrollMarginTop: '0px' }}>
      
      {/* Full-width Subtle Background Image */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '60px', 
          left: 0, 
          right: 0, 
          bottom: 0, 
          zIndex: 0, 
          pointerEvents: 'none', 
          opacity: 0.08, 
          filter: 'grayscale(100%)',
          backgroundImage: 'url(/Design_F1.png)',
          backgroundSize: '100% auto',
          backgroundPosition: 'center top',
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="f1-container max-w-850" style={{ position: 'relative', padding: '0px 0 40px 0' }}>
        
        {/* FAQ Content */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h2 className="section-title-large text-glitch reward-heading-glitch text-center" data-text="FAQS">FAQS</h2>
          <div className="faq-list mt-4">
          {[
            {q: 'Who can participate?', a: 'The hackathon is open to all college students, hardware enthusiasts, and developers of all skill levels.'},
            {q: 'Do I need to bring my own hardware and tools?', a: 'Yes. No tools or equipment will be provided at the venue. You must bring all your own components, microcontrollers, and soldering/fabrication equipment. However, you are permitted to do some of the work prior to the event and bring it with you.'},
            {q: 'What is the team size limit?', a: 'Teams can have a minimum of 2 and a maximum of 4 members.'},
            {q: 'Is there a registration fee?', a: 'Yes, the team entry fee is ₹300. This covers food, beverages, and entry passes for all team members.'},
            {q: 'Will internet be provided?', a: 'Yes, high-speed Wi-Fi will be available at the venue throughout the entire 8-hour sprint.'},
            {q: 'Can we build software-only projects?', a: 'No, this is a hardware-focused event. Your project must include a physical hardware component integrated with software.'}
          ].map((item, i) => (
            <div key={i} className={`faq-block spotlight-card ${active===i?'active':''}`}>
              <button className="faq-trigger" onClick={() => setActive(active===i ? null : i)}>
                <span>{item.q}</span><ChevronDown className="faq-arrow" size={18}/>
              </button>
              <div className="faq-drawer"><p>{item.a}</p></div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}