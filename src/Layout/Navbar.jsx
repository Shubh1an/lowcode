import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
    return (
        <div className="w-full h-[60px] bg-[#227A60]">
            <div className="flex justify-start items-center ml-5 h-full">
                <GiHamburgerMenu className="text-white text-2xl" />
            </div>
        </div>
    );
};

export default Navbar;
