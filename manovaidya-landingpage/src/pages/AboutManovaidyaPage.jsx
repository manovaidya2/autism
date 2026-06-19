import React from "react";
import AboutManovaidyaHeroSection from "../aboutmanovaidya/AboutManovaidyaHeroSection";
import AboutManovaidyaMissionVisionSection from "../aboutmanovaidya/AboutManovaidyaMissionVisionSection";
import AboutManovaidyaFounderSection from "../aboutmanovaidya/AboutManovaidyaFounderSection";
import AboutManovaidyaWhyChooseSection from "../aboutmanovaidya/AboutManovaidyaWhyChooseSection";
import AboutManovaidyaSupportSection from "../aboutmanovaidya/AboutManovaidyaSupportSection";
import AboutManovaidyaSystemWorkSection from "../aboutmanovaidya/AboutManovaidyaSystemWorkSection";

function AboutManovaidyaPage() {
  return (
    <main>
      <AboutManovaidyaHeroSection />
      <AboutManovaidyaFounderSection />
      <AboutManovaidyaWhyChooseSection />
      <AboutManovaidyaSupportSection />
      <AboutManovaidyaSystemWorkSection />
      <AboutManovaidyaMissionVisionSection />
    </main>
  );
}

export default AboutManovaidyaPage;
