import React, { useState } from 'react';
import MainTab from '../Components/Tab/MainTab';
import List from '../Components/Builder/List';
import View from '../Components/Builder/View';
import Add from '../Components/Builder/Add';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Builder = () => {
    const tabs = [
        { title: 'All List' },
        { title: 'Add New' },
        { title: 'View' },
    ];
    const [active, setActive] = useState(0);
    return (
        <div className="w-full h-full bg-[#E9F2EF] flex flex-col">
            <MainTab tabs={tabs} active={active} setActive={setActive} />
            {active === 0 ? (
                <List />
            ) : active === 1 ? (
                <DndProvider backend={HTML5Backend}>
                    <Add />
                </DndProvider>
            ) : (
                <View />
            )}
        </div>
    );
};

export default Builder;
