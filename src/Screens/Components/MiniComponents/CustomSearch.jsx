import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { IoClose } from 'react-icons/io5';
import { LuSettings2 } from 'react-icons/lu';
import ShortModal from './ShortModal';
import SearchHeaders from './SearchHeaders';

const CustomSearch = ({
  initialComponent,
  searchActive,
  customClass,
  handleSearch,
  setShowSearch,
  searchHeaders = [],
  headers = [],
  handleHeaderSelect = () => {},
}) => {
  const [text, setText] = useState('Hello');
  const [value] = useDebounce(text, 300);

  const [showModal, setShowModal] = useState(false);
  // title, handleHeaderSelect, checked
  useEffect(() => {
    handleSearch(value);
  }, [value]);
  return !searchActive ? (
    initialComponent
  ) : (
    <div className="w-full flex flex-row items-center border border-[#ADADAD] rounded-lg bg-[#FCF9EE] overflow-hidden px-4">
      <input
        type="text"
        className={`w-full py-2 bg-[#FCF9EE] ${customClass} focus:outline-none`}
        placeholder="Search"
        onChange={(e) => setText(e.target.value)}
      />
      <LuSettings2
        fontSize={16}
        className="cursor-pointer"
        onClick={() => setShowModal(true)}
      />
      <IoClose
        fontSize={16}
        className="cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
      <ShortModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        children={
          <SearchHeaders
            headersArray={headers}
            handleSelect={handleHeaderSelect}
            searchableHeaders={searchHeaders}
          />
        }
      />
    </div>
  );
};

export default CustomSearch;
