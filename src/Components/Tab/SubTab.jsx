import React from 'react';

const SubTab = ({ tabs, active, setActive }) => {
  return (
    <div className="w-full flex flex-row p-4 justify-center">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          title={tab}
          active={index === active}
          index={index}
          setActive={setActive}
        />
      ))}
    </div>
  );
};

const Tab = ({ title, active, index, setActive }) => {
  return (
    <div
      className={`w-full px-4 py-2 ${active && 'text-[#227A60] border-b-[3px] border-[#227A60]'} ${!active && 'border-b-[1px] border-[#E9E9E9]'} cursor-pointer hover:text-[#227A60] text-xl text-center h-[45px] items-center text-base`}
      onClick={() => setActive(index)}
    >
      {title}
    </div>
  );
};

export default SubTab;
