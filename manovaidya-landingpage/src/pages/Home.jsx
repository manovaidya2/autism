import React from "react";
import HeroSection from "../homepage/HeroSection";
import MeetDoctorSection from "../homepage/MeetDoctorSection";
import CareStagesSection from "../homepage/CareStagesSection";
import ConcernsSection from "../homepage/ConcernsSection";
import WhyChooseSection from "../homepage/WhyChooseSection";
import StoriesSection from "../homepage/StoriesSection";
import WellbeingJourneySection from "../homepage/WellbeingJourneySection";
// import ConditionsSupportSection from "../homepage/ConditionsSupportSection";
// import InsightsFaqSection from "../homepage/InsightsFaqSection";

function Home() {
  return (
    <React.Fragment>
      <main>
        <HeroSection />
        <MeetDoctorSection />
        <CareStagesSection />
        <ConcernsSection />
        <WhyChooseSection />
        <StoriesSection />
        <WellbeingJourneySection />
        {/* <ConditionsSupportSection />
        <InsightsFaqSection /> */}
      </main>
    </React.Fragment>
  );
}

export default Home;
