import React, { useEffect, useState } from 'react';
import MainTab from '../../Tab/MainTab';
import List from './List';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Add from './Add';
import View from './View';

const Form = () => {
  const tabs = [{ title: 'All List' }, { title: 'Add New' }, { title: 'View' }];
  const [active, setActive] = useState(0);
  const [newPageData, setNewPageData] = useState({});

  useEffect(() => {
    if (active === 1) {
      if (Object.keys(newPageData).length === 0) {
        setActive(0);
      }
    }
    if (active === 0) {
      setNewPageData({});
    }
  }, [active]);
  return (
    <div className="w-full h-full bg-[#E9F2EF] flex flex-col">
      <MainTab tabs={tabs} active={active} setActive={setActive} />
      {active === 0 ? (
        <List
          setNewPageData={setNewPageData}
          newPageData={newPageData}
          setActive={setActive}
        />
      ) : active === 1 ? (
        <DndProvider backend={HTML5Backend}>
          <Add newPageData={newPageData} setActive={setActive} />
        </DndProvider>
      ) : (
        <View />
      )}
    </div>
  );
};
