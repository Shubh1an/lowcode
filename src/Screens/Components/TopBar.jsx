import { BiHide, BiSort } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';

const { IoSearch } = require('react-icons/io5');

const { IoFilter } = require('react-icons/io5');
const { default: CustomFilter } = require('./MiniComponents/CustomFilter');
const { default: CustomSort } = require('./MiniComponents/CustomSort');
// export declare const IoFilter: IconType;
const { default: AddNewButton } = require('./MiniComponents/AddNewButton');
const { default: CustomSearch } = require('./MiniComponents/CustomSearch');
const {
  default: ListHeaderButton,
} = require('./MiniComponents/ListHeaderButton');
const { useState, useEffect } = require('react');
const { ChangeViewBtn } = require('./MiniComponents/ChangeViewBtn');
const { default: ShortModal } = require('./MiniComponents/ShortModal');

const TopBar = ({
  label = '',
  showModal = false,
  setShowModal = (val) => {},
  modalForm = {},
  setModalForm = () => {},
  headers = [],
  handleSearch = () => {},
  searchableHeaders = [],
  setView = (val) => {},
  view = true,
  handleSubmit = () => {},
  modalComponent = () => {},
  isDropDownButton = false,
  onclick = () => setShowModal(!showModal),
  setSearchableHeaders,
  SearchableHeaders,
  FilterHeaders,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const handleHeaderSelect = (value, checked) => {
    if (checked) {
      setSearchableHeaders((prev) => [...prev, value]);
    } else {
      setSearchableHeaders((prev) => prev.filter((header) => header !== value));
    }
  };

  return (
    <div className="h-[60px] mx-6 border-b justify-center">
      <div className="flex items-center h-full">
        <p className="text-2xl font-bold">{label}</p>
        <AddNewButton onclick={onclick} isDropDown={isDropDownButton} />
        <div className="flex items-center h-full ml-auto">
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
            searchHeaders={SearchableHeaders}
            headers={headers}
            searchActive={showSearch}
            setShowSearch={setShowSearch}
            customClass={''}
            handleSearch={handleSearch}
            handleHeaderSelect={handleHeaderSelect}
            // handleHeaderSelect={(title, flag) => {
            //   handleHeaderSelect(title, flag);
            // }}
          />
          <CustomFilter
            initialComponent={
              <ListHeaderButton
                icon={<IoFilter />}
                label="Filter"
                onclick={() => {
                  setShowSearch(!showSearch);
                  // setShowFilter(!showFilter);
                }}
              />
            }
            searchHeaders={SearchableHeaders}
            headers={headers}
            searchActive={showSearch}
            setShowSearch={setShowSearch}
            customClass={''}
            handleSearch={handleSearch}
            handleHeaderSelect={handleHeaderSelect}

            // filterActive={showFilter}
            // setShowFilter={setShowFilter}
            // customClass={''}
            // handleFilter={(filters) => console.log("Filters applied:", filters)}
            // filterOptions={FilterHeaders}
            // selectedFilters={[]}
          />
          <CustomSort
            initialComponent={
              <ListHeaderButton icon={<BiSort />} label="Sort" />
            }
          />
          <CustomSort
            initialComponent={
              <ListHeaderButton icon={<BsPerson />} label="Person" />
            }
          />
          <CustomSort
            initialComponent={
              <ListHeaderButton icon={<BiHide />} label="Hide" />
            }
          />
          <ChangeViewBtn
            onclick={() => {
              setView(!view);
            }}
            view={view}
          />

          <ShortModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
            }}
            children={modalComponent}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
