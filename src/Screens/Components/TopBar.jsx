const { IoSearch } = require('react-icons/io5');
const { default: AddNewButton } = require('./MiniComponents/AddNewButton');
const { default: CustomSearch } = require('./MiniComponents/CustomSearch');
const {
  default: ListHeaderButton,
} = require('./MiniComponents/ListHeaderButton');
const { useState } = require('react');
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
  resetModalState = () => {},
}) => {
  const handleAddNewButtonClick = () => {
    resetModalState(); // Call resetModalState function
    handlePatch(); // Toggle showModal
  };
  const handlePatch = () => {
    setShowModal(true);
  };
  const [showSearch, setShowSearch] = useState(false);
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
            searchHeaders={searchableHeaders}
            headers={headers}
            searchActive={showSearch}
            setShowSearch={setShowSearch}
            customClass={''}
            handleSearch={handleSearch}
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
