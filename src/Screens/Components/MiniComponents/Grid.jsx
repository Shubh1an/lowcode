// const { Link } = require('react-router-dom');
// const { formatValue } = require('../../../Utility/utility');

// const TableView = ({ data = { headers: [], cells: [] }, linkto }) => {
//   const { headers, cells } = data;
//   return (
//     <div className="w-full flex flex-col overflow-auto px-4">
//       <div className="w-full flex flex-row px-[2px] pt-[12px] sticky top-0 bg-[#fff]">
//         {headers.map((header, index) => {
//           return (
//             <div
//               className="w-full flex justify-center items-center text-base	font-medium py-2 border border-[#E9E9E9] overflow-hidden"
//               key={index + '_heading'}
//             >
//               {header}
//             </div>
//           );
//         })}
//       </div>
//       {cells.map((row, index) => {
//         return (
//           <Link to={`${linkto}=${row?._id}`} key={index + '_link'}>
//             <div
//               className={`w-full flex flex-row px-[2px] hover:bg-[#E9E9E9] cursor-pointer  ${row?.['type'] == 'defination' ? 'bg-[#E9E9E9]' : ''}`}
//               key={index + '_cell'}
//             >
//               {headers.map((header, index) => {
//                 return (
//                   <div
//                     className={`w-full flex justify-center items-center text-base font-medium py-2 border border-[#E9E9E9]`}
//                     key={index + '_cell'}
//                   >
//                     {formatValue(row[header], header)}
//                   </div>
//                 );
//               })}
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default TableView;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { formatValue } from '../../../Utility/utility';

// const TableView = ({ data = { headers: [], cells: [] }, linkto, currentPage, totalPages, onPageChange }) => {
//   const { headers, cells } = data;

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
//       <div className="w-full flex justify-between items-center mt-4">
//         <button
//           className="px-4 py-2 bg-gray-200 rounded"
//           disabled={currentPage === 1}
//           onClick={() => onPageChange(currentPage - 1)}
//         >
//           Previous
//         </button>
//         <span>Page {currentPage} of {totalPages}</span>
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

//export default TableView;

import React from 'react';
import { Link } from 'react-router-dom';
import { formatValue } from '../../../Utility/utility';

const TableView = ({
  data = { headers: [], cells: [] },
  linkto,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { headers, cells } = data;

  return (
    <div className="w-full flex flex-col overflow-auto px-4">
      <div className="w-full flex flex-row px-[2px] pt-[12px] sticky top-0 bg-[#fff]">
        {headers.map((header, index) => (
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
            {headers.map((header, headerIndex) => (
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

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { formatValue } from '../../../Utility/utility';

// const TableView = ({ data = { headers: [], cells: [] }, linkto, currentPage, totalPages, onPageChange }) => {
//   const { headers, cells } = data;

//   const getPaginationRange = () => {
//     const range = [];
//     let startPage, endPage;
//     if (totalPages <= 5) {
//       startPage = 1;
//       endPage = totalPages;
//     } else {
//       if (currentPage <= 3) {
//         startPage = 1;
//         endPage = 5;
//       } else if (currentPage + 2 >= totalPages) {
//         startPage = totalPages - 4;
//         endPage = totalPages;
//       } else {
//         startPage = currentPage - 2;
//         endPage = currentPage + 2;
//       }
//     }
//     for (let i = startPage; i <= endPage; i++) {
//       range.push(i);
//     }
//     if (startPage > 1) {
//       range.unshift('...');
//       range.unshift(1);
//     }
//     if (endPage < totalPages) {
//       range.push('...');
//       range.push(totalPages);
//     }
//     return range;
//   };

//   const paginationRange = getPaginationRange();

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
//       <div className="w-full flex justify-center items-center mt-4 space-x-2">
//         <button
//           className="px-4 py-2 bg-gray-200 rounded"
//           disabled={currentPage === 1}
//           onClick={() => onPageChange(currentPage - 1)}
//         >
//           {'<'}
//         </button>
//         {paginationRange.map((page, index) => (
//           <button
//             key={index}
//             className={`px-4 py-2 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//             onClick={() => typeof page === 'number' && onPageChange(page)}
//             disabled={page === '...'}
//           >
//             {page}
//           </button>
//         ))}
//         <button
//           className="px-4 py-2 bg-gray-200 rounded"
//           disabled={currentPage === totalPages}
//           onClick={() => onPageChange(currentPage + 1)}
//         >
//           {'>'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TableView;
