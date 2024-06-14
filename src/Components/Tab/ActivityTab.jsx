import React, { useState } from 'react';

const ActivityTab = ({ tabs, handleActivityTabClick }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleClick = (index, tab) => {
    setActiveTab(index);
    handleActivityTabClick(tab.name);
  };

  return (
    <div>
      <ul className="flex flex-wrap text-lg font-normal text-center text-[#323232] p-1">
        {tabs.map((tab, index) => (
          <li key={index} className="me-2">
            {tab.disabled ? (
              <span className="inline-block px-4 py-3 text-[#323232] cursor-not-allowed dark:text-gray-500">
                {tab.name}
              </span>
            ) : (
              <a
                href="#"
                className={`inline-block px-4 py-3 rounded ${
                  activeTab === index
                    ? 'text-[#323232] bg-[#FFFFFF] shadow-md font-semibold'
                    : ''
                }`}
                aria-current={activeTab === index ? 'page' : undefined}
                onClick={() => handleClick(index, tab)}
              >
                {tab.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityTab;
