import React from "react";
import AboutDoctorSection from "../about/AboutDoctorSection";
import AboutDoctorBioSection from "../about/AboutDoctorBioSection";
import AboutDoctorFocusSection from "../about/AboutDoctorFocusSection";
import NeuroAyurvedaSystemSection from "../about/NeuroAyurvedaSystemSection";

function AboutDoctorPage() {
  return (
    <main>
      <AboutDoctorSection />
      <NeuroAyurvedaSystemSection />
      <AboutDoctorBioSection />
      <AboutDoctorFocusSection />
    </main>
  );
}

export default AboutDoctorPage;
