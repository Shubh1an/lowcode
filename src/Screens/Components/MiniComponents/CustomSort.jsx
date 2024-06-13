// import React, { useState } from 'react';
// import { IoClose } from 'react-icons/io5';
// import { LuSettings2 } from 'react-icons/lu';
// import ShortModal from './ShortModal';
// import SortOptions from './SortHeaders';

// const CustomSort = ({
//   initialComponent,
//   sortActive,
//   customClass,
//   handleSort,
//   setShowSort,
//   sortOptions = [],
//   selectedSortOption = '',
//   selectedSortOrder = 'asc',
//   handleSortSelect = () => {},
//   handleOrderSelect = () => {},
// }) => {
//   const [showModal, setShowModal] = useState(false);

//   const handleApplySort = (selectedOption) => {
//     handleSort(selectedOption);
//     setShowModal(false);
//   };

//   return !sortActive ? (
//     initialComponent
//   ) : (
//     <div className="w-full flex flex-row items-center border border-[#ADADAD] rounded-lg bg-[#FCF9EE] overflow-hidden px-4">
//       <span className={`w-full py-2 bg-[#FCF9EE] ${customClass}`}>Sort</span>
//       <LuSettings2
//         fontSize={16}
//         className="cursor-pointer"
//         onClick={() => setShowModal(true)}
//       />
//       <IoClose
//         fontSize={16}
//         className="cursor-pointer"
//         onClick={() => setShowSort(false)}
//       />
//       <ShortModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         children={
//           <SortOptions
//             options={sortOptions}
//             selectedOption={selectedSortOption}
//             selectedOrder={selectedSortOrder}
//             handleSelect={handleSortSelect}
//             handleOrderSelect={handleOrderSelect}
//             onApply={handleApplySort}
//           />
//         }
//       />
//     </div>
//   );
// };

// export default CustomSort;

import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { LuSettings2 } from 'react-icons/lu';
import ShortModal from './ShortModal';
import SortOptions from './SortHeaders';

const CustomSort = ({
  initialComponent,
  sortActive,
  customClass,
  handleSort,
  setShowSort,
  sortOptions = [],
  selectedSortOption = '',
  selectedSortOrder = 'asc',
  handleSortSelect = () => {},
  handleOrderSelect = () => {},
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleApplySort = () => {
    handleSort(selectedSortOption, selectedSortOrder);
    setShowModal(false);
  };

  return !sortActive ? (
    initialComponent
  ) : (
    <div className="w-full flex flex-row items-center border border-[#ADADAD] rounded-lg bg-[#FCF9EE] overflow-hidden px-4">
      <span className={`w-full py-2 bg-[#FCF9EE] ${customClass}`}>Sort</span>
      <LuSettings2
        fontSize={16}
        className="cursor-pointer"
        onClick={() => setShowModal(true)}
      />
      <IoClose
        fontSize={16}
        className="cursor-pointer"
        onClick={() => setShowSort(false)}
      />
      <ShortModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        children={
          <SortOptions
            options={sortOptions}
            selectedOption={selectedSortOption}
            selectedOrder={selectedSortOrder}
            handleSelect={handleSortSelect}
            handleOrderSelect={handleOrderSelect}
            onApply={handleApplySort}
          />
        }
      />
    </div>
  );
};

export default CustomSort;
