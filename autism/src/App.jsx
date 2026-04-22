import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Header from "./components/Header";
import Home from "./pages/Homepage";
import CTAFooterSection from "./components/CTAFooterSection";
import BlogPage from "./blog/BlogPage";
import BlogDetails from "./blog/BlogDetails";
import ScrollToHash from "./components/ScrollToHash";
import VideoGalleryPage from "./home/VideoGalleryPage";
import CompactContactForm from "./components/CompactContactForm";
import ContactForm from "./components/ContactForm";

// Import Schema Components
import { OrganizationJsonLd, WebSiteJsonLd, LocalBusinessJsonLd } from "./components/JsonLd";

function App() {
  return (
    <Router>
      <Helmet>
        <title>ManoVaidya | Autism Treatment & Care</title>
        <meta
          name="description"
          content="Best autism doctor in India providing autism treatment India and Ayurveda autism treatment for children. ManoVaidya provides mental wellness, psychological care, and support services."
        />
        <meta
          name="keywords"
          content="autism, autism treatment, autism doctor India, Ayurveda autism treatment, ManoVaidya, mental wellness, psychology, therapy, counseling, autism support, neurological care"
        />
        <meta name="author" content="ManoVaidya" />
        <meta name="google-site-verification" content="yvc9gLBvvSkQPdYgHdu-r83-9sPkFcXlIwSwjGtXe0k" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ManoVaidya | Autism Treatment & Care" />
        <meta
          property="og:description"
          content="Best autism doctor in India providing autism treatment India and Ayurveda autism treatment for children."
        />
        <meta property="og:url" content="https://autism.manovaidya.com/" />
        <meta property="og:site_name" content="ManoVaidya" />
        <meta property="og:image" content="https://autism.manovaidya.com/logo.png" />
        <link rel="canonical" href="https://autism.manovaidya.com/" />
      </Helmet>

      {/* Global Schemas */}
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <LocalBusinessJsonLd />

      <Header />
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/testimonial-video" element={<VideoGalleryPage />} />
        <Route path="/contact-form" element={<CompactContactForm />} />
      </Routes>

      <CTAFooterSection />
    </Router>
  );
}

export default App;