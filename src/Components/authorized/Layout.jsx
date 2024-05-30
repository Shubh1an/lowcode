import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex flex-col w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
};
export default Layout;
