import React, { useState } from 'react';

const FilterHeaders = ({ options, selectedOptions, handleSelect, onApply }) => {
  const [selected, setSelected] = useState(selectedOptions);

  const toggleOption = (option) => {
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    setSelected(newSelected);
    handleSelect(newSelected);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Filter Options</h3>
      <div className="mt-2">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => toggleOption(option)}
            />
            <span className="ml-2">{option}</span>
          </div>
        ))}
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => onApply(selected)}
      >
        Apply Filters
      </button>
    </div>
  );
};
const SearchFilters = ({ headersArray, handleSelect, searchableHeaders }) => {
  return (
    <div className="w-[300px]">
      <div className="">Fields</div>
      <div className="w-full h-[1px] bg-[#E9E9E9]" />
      {headersArray.map((header, index) => {
        let checked = searchableHeaders.includes(header);
        return (
          <Search
            key={index}
            title={header}
            handleHeaderSelect={handleSelect}
            checked={checked}
          />
        );
      })}
    </div>
  );
};
export default SearchFilters;
