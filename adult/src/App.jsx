import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Homepage";
import React from "react";
import CTAFooterSection from "./components/CTAFooterSection";
import ScrollToHash from "./components/ScrollToHash";
import AdultBlogList from "./blog/AdultBlogList";
import AdultBlogDetails from "./blog/AdultBlogDetails";


function App() {
  return (
    <Router>
      <Header />
<ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/adult-blogs" element={<AdultBlogList />} />
<Route path="/adult-blog/:slug" element={<AdultBlogDetails />} />
      </Routes>
<CTAFooterSection />
    </Router>
  );
}

export default App;
