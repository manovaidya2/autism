import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
 <div className="flex w-full max-w-full overflow-x-hidden">
      {/* Sidebar space is handled inside Navbar */}
      <div className="flex-1 flex flex-col">
        <Navbar />
       <main className="bg-gray-100 min-h-screen md:ml-64 w-[calc(100%-16rem)] overflow-x-hidden px-3 sm:px-4 md:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
