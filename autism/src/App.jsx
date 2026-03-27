import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Homepage";
import React from "react";
import CTAFooterSection from "./components/CTAFooterSection";
import BlogPage from "./blog/BlogPage";
import BlogDetails from "./blog/BlogDetails";
import ScrollToHash from "./components/ScrollToHash";
import ContactForm from "./components/ContactForm";
import VideoGalleryPage from "./home/VideoGalleryPage";


function App() {
  return (
    <Router>
      <Header />
<ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/testimonial-video" element={<VideoGalleryPage />} />
      </Routes>
<CTAFooterSection />
    </Router>
  );
}

export default App;
