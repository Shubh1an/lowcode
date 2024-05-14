import React from 'react';

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

export default MainTab;
