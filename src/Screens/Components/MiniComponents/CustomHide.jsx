// // CustomHide.jsx

// import { useDebounce } from 'use-debounce';
// import { IoClose } from 'react-icons/io5';
// import { LuSettings2 } from 'react-icons/lu';
// import ShortModal from './ShortModal';

// import React, { useState } from 'react';
// const CustomHide = ({
//   initialComponent,
//   headers,
//   hiddenHeaders,
//   setHiddenHeaders,
// }) => {
//   const [showHideOptions, setShowHideOptions] = useState(false);

//   const toggleShowHideOptions = () => {
//     setShowHideOptions(!showHideOptions);
//   };
// debugger;
//   const handleSelectChange = (header) => {
//     const isHidden = hiddenHeaders.includes(header);
//     setHiddenHeaders((prevHiddenHeaders) => {
//       if (isHidden) {
//         return prevHiddenHeaders.filter((h) => h !== header);
//       } else {
//         return [...prevHiddenHeaders, header];
//       }
//     });
//   };

//   return (

//     <div className="relative inline-block">
//       <div onClick={toggleShowHideOptions}>{initialComponent}</div>
//       {showHideOptions && (
//         <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl"  style={{ zIndex: 1000 }} >
//           {headers.map((header) => (
//             <div key={header} className="px-4 py-2">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={!hiddenHeaders.includes(header)}
//                   onChange={() => handleSelectChange(header)}
//                 />
//                 <span className="ml-2">{header}</span>
//               </label>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomHide;

import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import ShortModal from './ShortModal'; // Assuming you have this component

const CustomHide = ({
  initialComponent,
  headers,
  hiddenHeaders,
  setHiddenHeaders,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleSelectChange = (header) => {
    const isHidden = hiddenHeaders.includes(header);
    setHiddenHeaders((prevHiddenHeaders) => {
      if (isHidden) {
        return prevHiddenHeaders.filter((h) => h !== header);
      } else {
        return [...prevHiddenHeaders, header];
      }
    });
  };

  return (
    <div className="relative inline-block">
      <div onClick={() => setShowModal(true)}>{initialComponent}</div>
      <ShortModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        children={
          <div className="w-[300px] p-4 bg-white rounded shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Hide Columns</h2>
              <IoClose
                className="cursor-pointer"
                onClick={() => setShowModal(false)}
              />
            </div>
            <div className="w-full h-[1px] bg-[#E9E9E9] my-2" />
            {headers.map((header) => (
              <div key={header} className="flex items-center py-1">
                <input
                  type="checkbox"
                  checked={!hiddenHeaders.includes(header)}
                  onChange={() => handleSelectChange(header)}
                  className="border border-[#ADADAD] rounded-lg bg-[#FCF9EE] w-4 h-4"
                />
                <span className="ml-2">{header}</span>
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
};

export default CustomHide;
