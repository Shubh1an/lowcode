import React, { useState } from 'react';
import MainTab from '../../Tab/MainTab';
import List from './List';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Add from './Add';
import View from './View';

const Form = () => {
  const tabs = [{ title: 'All List' }, { title: 'Add New' }, { title: 'View' }];
  const [active, setActive] = useState(0);
  console.log('first');
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

export default Form;
