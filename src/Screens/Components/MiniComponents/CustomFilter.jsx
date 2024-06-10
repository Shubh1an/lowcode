// import React, { useState, useEffect } from 'react';
// import { IoClose } from 'react-icons/io5';
// import { LuSettings2 } from 'react-icons/lu';
// import ShortModal from './ShortModal';
// import FilterHeaders from './FilterHeaders';

// const CustomFilter = ({
//   initialComponent,
//   filterActive,
//   customClass,
//   handleFilter,
//   setShowFilter,
//   filterOptions = [],
//   selectedFilters = [],
//   //handleFilterSelect = () => {},
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [selected, setSelected] = useState(selectedFilters);

//   const handleApplyFilters = () => {
//     handleFilter(selected);
//     setShowModal(false);
//   };

//   useEffect(() => {
//     handleFilter(selected);
//   }, [selected]);

//   return !filterActive ? (
//     initialComponent
//   ) : (
//     <div className="w-full flex flex-row items-center border border-[#ADADAD] rounded-lg bg-[#FCF9EE] overflow-hidden px-4">
//       <span className={`w-full py-2 bg-[#FCF9EE] ${customClass}`}>Filters</span>
//       <LuSettings2
//         fontSize={16}
//         className="cursor-pointer"
//         onClick={() => setShowModal(true)}
//       />
//       <IoClose
//         fontSize={16}
//         className="cursor-pointer"
//         onClick={() => setShowFilter(false)}
//       />
//       <ShortModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         children={
//           <FilterHeaders
//             options={filterOptions}
//             selectedOptions={selected}
//             handleSelect={setSelected}
//             onApply={handleApplyFilters}
//           />
//         }
//       />
//     </div>
//   );
// };

// export default CustomFilter;
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { IoClose } from 'react-icons/io5';
import { LuSettings2 } from 'react-icons/lu';
import ShortModal from './ShortModal';
import SearchHeaders from './SearchHeaders';
import SearchFilters from './FilterHeaders';

const CustomFilter = ({
  initialComponent,
  searchActive,
  customClass,
  handleSearch,
  setShowSearch,
  searchHeaders = [],
  headers = [],
  handleHeaderSelect = () => {},
}) => {
  const [text, setText] = useState('');
  const [value] = useDebounce(text, 300);

  const [showModal, setShowModal] = useState(false);
  console.log('text: ' + text);
  console.log('setText: ' + setText);
  useEffect(() => {
    if (value) {
      console.log('handleSearch value', value);
      const searchCriteria = {};
      searchHeaders.forEach((header) => {
        searchCriteria[header] = value;
      });
      handleSearch(searchCriteria);
    } else {
      console.log('handleSearch value', value);
      handleSearch({});
    }
  }, [value]);

  return !searchActive ? (
    initialComponent
  ) : (
    <div className="w-full flex flex-row items-center border border-[#ADADAD] rounded-lg bg-[#FCF9EE] overflow-hidden px-4">
      <input
        type="text"
        className={`w-full py-2 bg-[#FCF9EE] ${customClass} focus:outline-none`}
        placeholder="Filter"
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

export default CustomFilter;
