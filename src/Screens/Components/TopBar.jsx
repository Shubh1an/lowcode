import { BiHide, BiSort } from 'react-icons/bi';
import { BsFilter, BsPerson } from 'react-icons/bs';

const { IoSearch } = require('react-icons/io5');

const { IoFilter } = require('react-icons/io5');

const { default: CustomSort } = require('./MiniComponents/CustomSort');

// export declare const IoFilter: IconType;
const { default: AddNewButton } = require('./MiniComponents/AddNewButton');
const { default: CustomSearch } = require('./MiniComponents/CustomSearch');
const { default: CustomHide } = require('./MiniComponents/CustomHide');
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
  //searchableHeaders = [],
  setView = (val) => {},
  view = true,
  //handleSubmit = () => {},
  modalComponent = () => {},
  isDropDownButton = false,
  onclick = () => setShowModal(!showModal),
  resetModalState = () => {},
  setSearchableHeaders,
  SearchableHeaders,
  fetchModules, // Add fetchModules as a prop
  FilterHeaders,
}) => {
  const handleAddNewButtonClick = () => {
    resetModalState(); // Call resetModalState function
    handlePatch(); // Toggle showModal
  };
  const handlePatch = () => {
    setShowModal(true);
  };
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortOptions, setSortOptions] = useState(headers); // Add your sort options here
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const [selectedSortOrder, setSelectedSortOrder] = useState('asc');
  const [hiddenHeaders, setHiddenHeaders] = useState([]);

  const handleHeaderSelect = (value, checked) => {
    if (checked) {
      setSearchableHeaders((prev) => [...prev, value]);
    } else {
      setSearchableHeaders((prev) => prev.filter((header) => header !== value));
    }
  };
  const handleSortSelect = (option) => {
    setSelectedSortOption(option);
  };

  const handleOrderSelect = (order) => {
    setSelectedSortOrder(order);
  };

  const handleSort = (selectedOption, selectedOrder) => {
    console.log('Sorting by:', selectedOption, selectedOrder);
    fetchModules({}, 1, 4, { field: selectedOption, order: selectedOrder });
    // Add your sorting logic here
  };

  useEffect(() => {
    setSortOptions(headers);
  }, [headers]);

  return (
    <div className="h-[60px] mx-6 border-b justify-center">
      <div className="flex items-center h-full">
        <p className="text-2xl font-bold">{label}</p>
        <AddNewButton
          onclick={handleAddNewButtonClick}
          isDropDown={isDropDownButton}
        />
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

          <CustomSort
            initialComponent={
              <ListHeaderButton
                icon={<BiSort />}
                label="Sort"
                onclick={() => {
                  setShowSort(!showSort);
                }}
              />
            }
            sortOptions={sortOptions}
            selectedSortOption={selectedSortOption}
            selectedSortOrder={selectedSortOrder}
            handleSortSelect={handleSortSelect}
            handleOrderSelect={handleOrderSelect}
            sortActive={showSort}
            setShowSort={setShowSort}
            handleSort={handleSort}
          />
          <CustomSort
            initialComponent={
              <ListHeaderButton icon={<IoFilter />} label="Filter" />
            }
          />
          <CustomSort
            initialComponent={
              <ListHeaderButton icon={<BsPerson />} label="Person" />
            }
          />
          <CustomHide
            initialComponent={
              <ListHeaderButton icon={<BiHide />} label="Hide" />
            }
            headers={headers}
            hiddenHeaders={hiddenHeaders}
            handleHideSelect={(header, isHidden) => {
              if (isHidden) {
                setHiddenHeaders((prev) => [...prev, header]);
              } else {
                setHiddenHeaders((prev) =>
                  prev.filter((item) => item !== header),
                );
              }
            }}
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
