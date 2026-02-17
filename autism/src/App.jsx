import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Homepage";
import React from "react";
import CTAFooterSection from "./components/CTAFooterSection";
import BlogPage from "./blog/BlogPage";
import BlogDetails from "./blog/BlogDetails";
import ScrollToHash from "./components/ScrollToHash";


function App() {
  return (
    <Router>
      <Header />
<ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />

      </Routes>
<CTAFooterSection />
    </Router>
  );
}

export default App;
