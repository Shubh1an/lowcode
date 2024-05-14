import React, { useContext, useState } from 'react';
import MainTab from '../Components/Tab/MainTab';
import List from '../Components/Template/List';
import View from '../Components/Builder/View';
import Add from '../Components/Builder/Add';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GlobalContext from '../Context/Context';
import { Category } from '../Components/Template/Category';

const Templates = () => {
  const tabs = [{ title: 'All List' }];
  const [active, setActive] = useState(0);
  const { selectedSubMenu } = useContext(GlobalContext);
  return (
    <div className="w-full h-full bg-[#E9F2EF] flex flex-col">
      <div className="w-[90%] mx-auto flex justify-between">
        <MainTab tabs={tabs} active={active} setActive={setActive} />
        <div className="content-center min-w-fit">Search Button</div>
      </div>
      {
        <DndProvider backend={HTML5Backend}>
          {selectedSubMenu?.title === 'Category' ? <Category /> : <List />}
        </DndProvider>
      }
    </div>
  );
};

export default Templates;
