import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainTab from '../../Tab/MainTab';
import Add from './Add';
import List from './List';
import View from '../view/page';
import ListData from './ListData';
import AddView from './AddView';

const Form = () => {
  const tabs = [
    { title: 'All List' },
    { title: 'Add New' },
    { title: 'View' },
    { title: 'List Data' },
  ];
  const [active, setActive] = useState(0);
  const [newPageData, setNewPageData] = useState({});
  const [selectedPage, setSelectedPage] = useState(null);

  console.log('newPageData', newPageData);
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
    <div className="w-full h-full bg-[#FCF9EE] flex flex-col">
      <MainTab tabs={tabs} active={active} setActive={setActive} />
      {active === 0 ? (
        <List
          setNewPageData={setNewPageData}
          setActive={setActive}
          setSelectedPage={setSelectedPage}
        />
      ) : active === 1 ? (
        <DndProvider backend={HTML5Backend}>
          {newPageData?.type === 'Form' ? (
            <Add newPageData={newPageData} selectedPage={selectedPage} />
          ) : (
            <AddView newPageData={newPageData} selectedPage={selectedPage} />
          )}
        </DndProvider>
      ) : active === 2 ? (
        <View newPageData={newPageData} />
      ) : (
        <ListData newPageData={newPageData} />
      )}
    </div>
  );
};

export default Form;
