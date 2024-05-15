import React, { useEffect, useState } from 'react';
import MainTab from '../Components/Tab/MainTab';
import List from '../Components/Builder/List';
import View from '../Components/Builder/View';
import Add from '../Components/Builder/Add';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';

const Builder = () => {
  const location = useLocation();
  const { pathname } = location;

  const [componentToRender, setComponentToRender] = useState(null);

  useEffect(() => {
    // Update the current component based on the pathname
    switch (pathname) {
      case `/builder/entity`:
        setComponentToRender(<Entity />);
        break;
      case `/builder/field`:
        setComponentToRender(<Fields />);
        break;
      case `/builder/dashboard`:
        setComponentToRender(<Module />);
        break;
      default:
        setComponentToRender(<Module />);
        break;
    }
  }, [pathname]);
  return <>{componentToRender}</>;
};

const Module = () => {
  return <div>Module</div>;
};

const Entity = () => {
  return <div>Entity</div>;
};

const Fields = () => {
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

export default Builder;
