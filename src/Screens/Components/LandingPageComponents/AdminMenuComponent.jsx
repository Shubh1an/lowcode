import React, { useState } from 'react';
import { SlArrowDown } from 'react-icons/sl';
import { IoSunnyOutline } from 'react-icons/io5';
import { GoBell } from 'react-icons/go';
const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    // setIsOpen(!isOpen);
    setIsOpen(isOpen);
  };

  return (
    <div className="flex items-center">
      <div className="mr-3">
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-6 py-2.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <img
            src="https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109"
            alt="Profile"
            className="w-6 h-6 mr-2 ml-[-12px] rounded-full"
          />
          <span className="text-base">Owner</span>
          <SlArrowDown
            className="ml-2 -mr-1 h-6 flex justify-center"
            aria-hidden="true"
          />
        </button>
      </div>
      <IoSunnyOutline className="text-black-500 h-6 w-6 mr-4" />
      <GoBell className="text-black-500 h-6 w-6 mr-6" />
      {isOpen && (
        <div
          className="absolute right-0 mt-9 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 mr-20"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              Profile
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
            >
              Settings
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-2"
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
