import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Homepage";
import React from "react";
import CTAFooterSection from "./components/CTAFooterSection";
import ScrollToHash from "./components/ScrollToHash";
import TeenageBlogList from "./blog/TeenageBlogList";
import TeenageBlogDetails from "./blog/TeenageBlogDetails";


function App() {
  return (
    <Router>
      <Header />
<ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/blog" element={<TeenageBlogList />} />
<Route path="/teenage-blog/:slug" element={<TeenageBlogDetails />} />
      </Routes>
<CTAFooterSection />
    </Router>
  );
}

export default App;
