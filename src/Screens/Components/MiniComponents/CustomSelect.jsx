import React, { useEffect, useState } from 'react';

const CustomSelect = ({ options, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (setValue) {
      setValue(selectedOption?.value);
      console.log('Setting ', selectedOption);
    }
  }, [selectedOption]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const filteredOptions = options?.filter((option) =>
    option?.label?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative inline-block text-left w-full ">
      <div>
        <span className="rounded-md shadow-sm z-[1]">
          <input
            type="text"
            placeholder="Select..."
            value={selectedOption ? selectedOption.label : ''}
            readOnly
            className="cursor-pointer block w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onClick={toggleDropdown}
          />
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10">
          <div className="py-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-sm border-b border-gray-200"
            />
          </div>
          <div className="py-1">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
