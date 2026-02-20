import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import AdminAddBlog from "./pages/AdminAddBlog";
import TeenageBlog from "./pages/TeenageBlog";




function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
         <Route path="/Admin-Blog" element={<Layout><AdminAddBlog/></Layout>} />
        <Route path="/Admin-Teenage" element={<Layout><TeenageBlog/></Layout>} />
      
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      {/* Move ToastContainer **outside Router** so it always exists */}
      
    </>
  );
}

export default App;
