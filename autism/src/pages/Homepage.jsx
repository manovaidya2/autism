import React from "react";
import { Helmet } from "react-helmet-async";
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

// Import Schema Components
import { 
  PersonJsonLd, 
  MedicalConditionJsonLd, 
  MedicalProcedureJsonLd 
} from "../components/JsonLd";

export default function Home() {
  // Sample FAQ data - replace with your actual FAQs
  const faqData = [
    {
      question: "What is the success rate of autism treatment?",
      answer: "Our comprehensive treatment program has shown significant improvements in 85% of children within 6 months of consistent treatment."
    },
    {
      question: "Is Ayurvedic treatment safe for children with autism?",
      answer: "Yes, our Ayurvedic treatments are completely natural and safe for children. All treatments are customized based on individual needs."
    },
    {
      question: "How long does the treatment take?",
      answer: "Treatment duration varies depending on the individual case, but typically shows noticeable improvements within 3-6 months."
    }
  ];

  return (
    <>
      <Helmet>
        <title>ManoVaidya | Best Autism Doctor in India - Ayurveda Autism Treatment</title>
        <meta
          name="description"
          content="Best autism doctor in India providing autism treatment India and Ayurveda autism treatment for children. ManoVaidya offers compassionate mental wellness and support services."
        />
        <meta
          name="keywords"
          content="autism doctor India, autism treatment, Ayurveda autism treatment, best autism doctor, ManoVaidya, autism specialist, neurodevelopmental disorders"
        />
        <meta property="og:title" content="ManoVaidya | Best Autism Doctor in India" />
        <meta
          property="og:description"
          content="Best autism doctor in India providing autism treatment India and Ayurveda autism treatment for children."
        />
        <link rel="canonical" href="https://autism.manovaidya.com/" />
      </Helmet>

      {/* Homepage Specific Schemas */}
      <PersonJsonLd />
      <MedicalConditionJsonLd />
      <MedicalProcedureJsonLd />

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
      <FAQSection faqs={faqData} />
      <DoctorSection />
      <ResourcesSection />
      <FinalCTASection />
    </>
  );
}