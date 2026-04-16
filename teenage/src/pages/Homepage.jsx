import React from "react";
import Hero from "../home/Hero";
import ChallengesTransformation from "../home/ChallengesTransformation";

import FAQSection from "../home/FAQSection";
import UnderstandingSection from "../home/UnderstandingSection";
import MythsFacts from "../home/MythsFacts";
import ScienceSection from "../home/ScienceSection";
import PillarSection from "../home/PillarSection";
import OverlayCardsSection from "../home/OverlayCardsSection";
import ResultsSection from "../home/ResultsSection";
import AssessmentSection from "../home/AssessmentSection";
import StepProgramSection from "../home/StepProgramSection";
import DoctorSection from "../home/DoctorSection";
import ResourcesSection from "../home/ResourcesSection";
import FinalCTASection from "../home/FinalCTASection";


export default function Home() {
  return (
    <>
  
      <Hero />
      <ChallengesTransformation />
      <UnderstandingSection />
      <MythsFacts />
      <ScienceSection />
      <PillarSection />
      <OverlayCardsSection />
      <ResultsSection />
      <AssessmentSection />
      <StepProgramSection />
       <FAQSection />
       <DoctorSection />
       <ResourcesSection />
       <FinalCTASection />
     
     
    </>
  );
}
