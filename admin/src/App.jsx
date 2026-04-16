import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import TeenageBlog from "./pages/TeenageBlog";
import AdultBlog from "./pages/AdultBlog";
import AutismContactPanel from "./pages/AutismContactPanel";
import AdminBlogDashboard from "./pages/AdminBlogDashboard";
import AutismEditBlog from "./pages/AutismEditBlog";
import AdminAddBlog from "./pages/AdminAddBlog";
import TeenageBlogAdminDashboard from "./teenage/TeenageBlogAdminDashboard";







function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
         <Route path="/Admin-blogs" element={<Layout><AdminBlogDashboard/></Layout>} />
        <Route path="/Admin-Teenage" element={<Layout><TeenageBlog/></Layout>} />
        <Route path="/Admin-Adult" element={<Layout><AdultBlog/></Layout>} />
         <Route path="/Admin-Autism" element={<Layout><AutismContactPanel/></Layout>} />
           <Route path="/admin-addblog" element={<Layout><AdminAddBlog/></Layout>} />
           <Route path="/admin/edit-blog/:id" element={<Layout><AutismEditBlog/></Layout>} />
           <Route path ="/teenage dashboard" element={<Layout><TeenageBlogAdminDashboard/></Layout>} />
    
        </Routes>
      </Router>
      {/* Move ToastContainer **outside Router** so it always exists */}
      
    </>
  );
}

export default App;
