import React, { useState } from 'react';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-md mb-2 shadow-lg mt-4">
      <div
        className="flex font-bold justify-between items-center p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <div>{title}</div>
        <div className="flex items-center">
          <svg
            className={`w-6 h-6 ${isOpen ? 'transform -rotate-160' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="px-4 pb-4">
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Accordion;