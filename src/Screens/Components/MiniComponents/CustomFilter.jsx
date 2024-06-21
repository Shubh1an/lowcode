// import React, { useState } from 'react';
// import { IoClose } from 'react-icons/io5';
// import ShortModal from './ShortModal';
// import FilterHeaders from './FilterHeaders';

// const CustomFilter = ({
//   headers,
//   initialComponent,
//   setShowFilter,
//   showFilter,
//   applyFilter,
// }) => {

//   const [filters, setFilters] = useState([]);
//   const conditions = ['equals', 'not equals', 'is', 'contains', 'does not contain'];
//   const handleAddFilter = () => {
//     setFilters([...filters, { header: '', condition: '', value: '' }]);
//   };

//   const handleFilterChange = (index, newFilter) => {
//     const updatedFilters = filters.map((filter, i) =>
//       i === index ? newFilter : filter
//     );
//     setFilters(updatedFilters);
//   };

//   const handleRemoveFilter = (index) => {
//     const updatedFilters = filters.filter((_, i) => i !== index);
//     setFilters(updatedFilters);
//   };

//   return (
//     <>
//       {React.cloneElement(initialComponent, {
//         onClick: () => setShowFilter(!showFilter),
//       })}
//       {showFilter && (
//         <ShortModal isOpen={showFilter} onClose={() => setShowFilter(false)}>
//           <div className="p-4">
//             <h2 className="text-xl font-bold mb-4">Filter</h2>
//             {filters.map((filter, index) => (
//               <FilterHeaders
//                 key={index}
//                 index={index}
//                 filter={filter}
//                 headers={headers}
//                 conditions={conditions}
//                 onChange={handleFilterChange}
//                 onRemove={handleRemoveFilter}
//               />
//             ))}
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//               onClick={handleAddFilter}
//             >
//               Add Filter
//             </button>
//             <button
//               className="bg-green-500 text-white px-4 py-2 rounded mt-2 ml-2"
//               onClick={() => {
//                 applyFilter(filters);
//                 setShowFilter(false);
//               }}
//             >
//               Apply Filters
//             </button>
//           </div>
//         </ShortModal>
//       )}
//     </>
//   );
// };

// export default CustomFilter;
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import ShortModal from './ShortModal';
import FilterHeaders from './FilterHeaders';

const CustomFilter = ({
  headers,
  initialComponent,
  setShowFilter,
  showFilter,
  applyFilter,
}) => {
  // Initialize filters with one empty filter object
  const [filters, setFilters] = useState([
    { header: '', condition: '', value: '' },
  ]);

  const conditions = [
    'equals',
    'not equals',
    'is',
    'contains',
    'does not contain',
  ];

  const handleAddFilter = () => {
    setFilters([...filters, { header: '', condition: '', value: '' }]);
  };

  const handleFilterChange = (index, newFilter) => {
    const updatedFilters = filters.map((filter, i) =>
      i === index ? newFilter : filter,
    );
    setFilters(updatedFilters);
  };

  const handleRemoveFilter = (index) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    setFilters(updatedFilters);
  };

  return (
    <>
      {React.cloneElement(initialComponent, {
        onClick: () => setShowFilter(!showFilter),
      })}
      {showFilter && (
        <ShortModal isOpen={showFilter} onClose={() => setShowFilter(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Filter</h2>
            {filters.map((filter, index) => (
              <FilterHeaders
                key={index}
                index={index}
                filter={filter}
                headers={headers}
                conditions={conditions}
                onChange={handleFilterChange}
                onRemove={handleRemoveFilter}
              />
            ))}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={handleAddFilter}
            >
              Add Filter
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-2 ml-2"
              onClick={() => {
                applyFilter(filters);
                setShowFilter(false);
              }}
            >
              Apply Filters
            </button>
          </div>
        </ShortModal>
      )}
    </>
  );
};

export default CustomFilter;
