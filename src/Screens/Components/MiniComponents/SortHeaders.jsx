import React, { useState } from 'react';

const SortHeaders = ({ options, selectedOption, handleSelect, onApply }) => {
  const [selected, setSelected] = useState(selectedOption);

  const handleOptionChange = (option) => {
    setSelected(option);
    handleSelect(option);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Sort Options</h3>
      <div className="mt-2">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="radio"
              name="sortOption"
              value={option}
              checked={selected === option}
              onChange={() => handleOptionChange(option)}
            />
            <span className="ml-2">{option}</span>
          </div>
        ))}
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => onApply(selected)}
      >
        Apply Sort
      </button>
    </div>
  );
};

export default SortHeaders;
