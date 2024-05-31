import React from 'react';
import ProfileDropdown from '../ProfileDropdown';

const Navbar = () => {
  return (
    <div className="w-full h-[60px] bg-[#FFFFFF]">
      <div className="flex justify-start items-center ml-5 h-full justify-between">
        <h1 className="text-2xl font-bold  text-[#323232]">CRM</h1>
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Navbar;
