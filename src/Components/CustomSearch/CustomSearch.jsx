import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { IoClose } from 'react-icons/io5';
import { LuSettings2 } from 'react-icons/lu';

const CustomSearch = ({
    initialComponent,
    searchActive,
    customClass,
    handleSearch,
    setShowSearch,
}) => {
    const [text, setText] = useState('Hello');
    const [value] = useDebounce(text, 1000);

    useEffect(() => {
        handleSearch(value);
    }, [value]);
    return !searchActive ? (
        initialComponent
    ) : (
        <div className="w-full flex flex-row items-center border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] overflow-hidden px-4">
            <input
                type="text"
                className={`w-full py-2 bg-[#E9F2EF] ${customClass} focus:outline-none`}
                placeholder="Search"
                onChange={(e) => setText(e.target.value)}
            />
            <LuSettings2
                fontSize={16}
                className="cursor-pointer"
                onClick={() => setShowSearch(true)}
            />
            <IoClose
                fontSize={16}
                className="cursor-pointer"
                onClick={() => setShowSearch(false)}
            />
        </div>
    );
};

export default CustomSearch;
