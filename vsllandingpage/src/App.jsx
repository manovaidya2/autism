import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
// import LeadPopup from "./components/LeadPopup";
import BookingForm from "./components/BookingForm";
import ThankYou from "./components/ThankYou";

export default function App() {
  return (
    <BrowserRouter>
      {/* <LeadPopup /> */}

      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/book-appointment" element={<BookingForm />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}