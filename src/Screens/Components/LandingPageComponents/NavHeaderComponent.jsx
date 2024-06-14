import React from 'react';
import AdminMenu from './AdminMenuComponent';

const NavHeaderComponent = () => {
  return (
    <div className="w-full h-16 bg-white flex justify-between items-center px-4">
      <div className="text-2xl font-semibold text-gray-800">Quikit</div>

      <div className="flex items-center">
        <AdminMenu />
      </div>
    </div>
  );
};

export default NavHeaderComponent;
