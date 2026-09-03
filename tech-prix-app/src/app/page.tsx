"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import ExecutiveBriefing from "@/components/ExecutiveBriefing";
import Podium from "@/components/Podium";
import Disciplines from "@/components/Disciplines";
import CircuitTimeline from "@/components/CircuitTimeline";
import RulesAndGuidelines from "@/components/RulesAndGuidelines";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";

export default function Home() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [modalMode, setModalMode] = useState<"squad" | "duo" | null>(null);

  const handleRegisterClick = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSc2iD4mLOo4jrVwfckZq0NEwpFPVxUtpNip5Dyj-3XeIeAEWg/viewform?usp=header", "_blank");
  };

  return (
    <main>
      <Navbar 
        soundEnabled={soundEnabled} 
        setSoundEnabled={setSoundEnabled}
        onOpenModal={handleRegisterClick}
      />

      <HeroCanvas onOpenModal={handleRegisterClick} />
      
      <ExecutiveBriefing />
      <Podium />
      <Disciplines />
      <CircuitTimeline />
      <RulesAndGuidelines />
      <FAQ />
      <Footer onOpenModal={handleRegisterClick} />

      {modalMode && (
        <RegistrationModal mode={modalMode} onClose={() => setModalMode(null)} />
      )}
    </main>
  );
}
