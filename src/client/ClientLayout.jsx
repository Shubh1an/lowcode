import React from 'react';
import Navbar from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';

const ClientLayout = ({ children }) => {
  return (
    <div className="flex flex-row w-full h-screen  bg-[#FCF9EE]">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default ClientLayout;
