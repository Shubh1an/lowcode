import React from 'react';
import { BiMobile } from 'react-icons/bi';
import { BsTablet } from 'react-icons/bs';
import { CiMonitor } from 'react-icons/ci';

const MainTab = ({ tabs, active, setActive }) => {
  return (
    <div className="w-full flex flex-row p-4">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          title={tab.title}
          active={index === active}
          index={index}
          setActive={setActive}
        />
      ))}

      <div className="flex-grow">
        <Icons name={'Mobile'} />
      </div>
    </div>
  );
};

const Tab = ({ title, active, index, setActive }) => {
  return (
    <div
      className={`px-4 py-2 ${active && 'text-[#227A60] border-b-[3px] border-[#227A60]'} ${!active && 'border-b-[1px] border-[#E9E9E9]'} cursor-pointer hover:text-[#227A60] text-xl min-w-[160px] text-center h-[45px] items-center`}
      onClick={() => setActive(index)}
    >
      {title}
    </div>
  );
};

const Icons = ({ name }) => {
  return (
    <div className="text-2xl bg-[#E9E9E9] rounded-full">{getIcon(name)}</div>
  );
};

const getIcon = (name) => {
  switch (name) {
    case 'Mobile':
      return <BiMobile />;
    case 'AiOutlineClockCircle':
      return <BsTablet />;
    case 'AiOutlinePhone':
      return <CiMonitor />;
  }
};

export default MainTab;
