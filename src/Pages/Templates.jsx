import { useContext, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainTab from '../Components/Tab/MainTab';
import { Category } from '../Components/Template/Category';
import List from '../Components/Template/List';
import GlobalContext from '../Context/Context';
import CustomSearch from '../Components/CustomSearch/CustomSearch.jsx';
import ListHeaderButton from '../Components/inputs/ListHeaderButton';
import { IoSearch } from 'react-icons/io5';
import { Route, Routes, useLocation } from 'react-router-dom';

const Templates = () => {
  const tabs = [{ title: 'All List' }];
  const [active, setActive] = useState(0);
  const { selectedSubMenu } = useContext(GlobalContext);
  const [showSearch, setShowSearch] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  const [componentToRender, setComponentToRender] = useState(null);

  useEffect(() => {
    // Update the current component based on the pathname
    switch (pathname) {
      case `/template/category`:
        setComponentToRender(<Category />);
        break;
      default:
        setComponentToRender(<List />);
        break;
    }
  }, [pathname]);

  return (
    <div className="w-full h-full bg-[#FCF9EE] flex flex-col">
      <div className="flex justify-between">
        <MainTab tabs={tabs} active={active} setActive={setActive} />
        <div className="content-center min-w-fit">
          <CustomSearch
            initialComponent={
              <ListHeaderButton
                icon={<IoSearch />}
                label="Search"
                onclick={() => {
                  setShowSearch(!showSearch);
                }}
              />
            }
            searchActive={showSearch}
            setShowSearch={setShowSearch}
            customClass={''}
            handleSearch={() => {}}
          />
        </div>
      </div>
      {
        <DndProvider backend={HTML5Backend}>
          {componentToRender}
          {/* {selectedSubMenu?.title === 'Category' ? <Category /> : <List />} */}
        </DndProvider>
      }
    </div>
  );
};

export default Templates;
