// import React from 'react';
// import { Link } from 'react-router-dom';
// import { formatValue } from '../../../Utility/utility';

// const TableView = ({

//   data = { headers: [], cells: [] },
//   linkto,
//   currentPage,
//   totalPages,
//   onPageChange,

// }) => {
//   const { headers, cells } = data;
//
//   return (
//     <div className="w-full flex flex-col overflow-auto px-4">
//       <div className="w-full flex flex-row px-[2px] pt-[12px] sticky top-0 bg-[#fff]">
//         {headers.map((header, index) => (
//           <div
//             className="w-full flex justify-center items-center text-base font-medium py-2 border border-[#E9E9E9] overflow-hidden"
//             key={`${index}_heading`}
//           >
//             {header}
//           </div>
//         ))}
//       </div>
//       {cells.map((row, index) => (
//         <Link to={`${linkto}=${row?.id}`} key={`${index}_link`}>
//           <div
//             className={`w-full flex flex-row px-[2px] hover:bg-[#E9E9E9] cursor-pointer`}
//             key={`${index}_cell`}
//           >
//             {headers.map((header, headerIndex) => (
//               <div
//                 className="w-full flex justify-center items-center text-base font-medium py-2 border border-[#E9E9E9]"
//                 key={`${headerIndex}_cell`}
//               >
//                 {formatValue(row[header], header)}
//               </div>
//             ))}
//           </div>
//         </Link>
//       ))}
//       <div className="w-full flex justify-start items-center mt-4">
//         <button
//           className="px-4 py-2 bg-gray-200 rounded mr-2"
//           disabled={currentPage === 1}
//           onClick={() => onPageChange(currentPage - 1)}
//         >
//           Previous
//         </button>
//         <span className="mr-2">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           className="px-4 py-2 bg-gray-200 rounded"
//           disabled={currentPage === totalPages}
//           onClick={() => onPageChange(currentPage + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TableView;

import React from 'react';
import { Link } from 'react-router-dom';
import { formatValue } from '../../../Utility/utility';

const TableView = ({
  data = { headers: [], cells: [] },
  linkto,
  currentPage,
  totalPages,
  onPageChange,
  hiddenHeaders = [],
}) => {
  const { headers, cells } = data;
  const visibleHeaders = headers.filter(
    (header) => !hiddenHeaders.includes(header),
  );

  return (
    <div className="w-full flex flex-col overflow-auto px-4">
      <div className="w-full flex flex-row px-[2px] pt-[12px] sticky top-0 bg-[#fff]">
        {visibleHeaders.map((header, index) => (
          <div
            className="w-full flex justify-center items-center text-base font-medium py-2 border border-[#E9E9E9] overflow-hidden"
            key={`${index}_heading`}
          >
            {header}
          </div>
        ))}
      </div>
      {cells.map((row, index) => (
        <Link to={`${linkto}=${row?.id}`} key={`${index}_link`}>
          <div
            className={`w-full flex flex-row px-[2px] hover:bg-[#E9E9E9] cursor-pointer`}
            key={`${index}_cell`}
          >
            {visibleHeaders.map((header, headerIndex) => (
              <div
                className="w-full flex justify-center items-center text-base font-medium py-2 border border-[#E9E9E9]"
                key={`${headerIndex}_cell`}
              >
                {formatValue(row[header], header)}
              </div>
            ))}
          </div>
        </Link>
      ))}
      <div className="w-full flex justify-start items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded mr-2"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="mr-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableView;
