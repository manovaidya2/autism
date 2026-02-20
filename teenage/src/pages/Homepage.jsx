import React from "react";
import Hero from "../home/Hero";
import ChallengesTransformation from "../home/ChallengesTransformation";
import ProgramIncludes from "../home/ProgramIncludes";
import HowItWorks from "../home/HowItWorks";
import Testimonials from "../home/Testimonials";
import FAQSection from "../home/FAQSection";


export default function Home() {
  return (
    <>
  
      <Hero />
      <ChallengesTransformation />
      <ProgramIncludes />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
    </>
  );
}
