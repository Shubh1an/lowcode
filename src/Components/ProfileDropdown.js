import React, { useState } from 'react';
import profileimg from '../assets/Rectangle.svg';
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      <div className="flex flex-row">
        <button
          type="button"
          className="inline-flex h-[50px] w-[154px] rounded-md border border-gray-500 rounded-full shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            className="h-8 w-8 rounded-full mr-3"
            src={profileimg}
            alt="Profile"
          />
          <div>
            Owner <span className="mr-3">▼</span>
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {/* <a
              href="#profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Profile
            </a>
            <a
              href="#settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Settings
            </a> */}
            <Link to={`../../signin`}>
              <a
                href="#signout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Sign out
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
