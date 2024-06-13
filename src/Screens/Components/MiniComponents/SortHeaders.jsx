// import React, { useState } from 'react';

// // const SortHeaders = ({ options, selectedOption, handleSelect, onApply }) => {
// //   const [selected, setSelected] = useState(selectedOption);
// const SortHeaders = ({ options, selectedOption, selectedOrder, handleSelect, handleOrderSelect, onApply }) => {
//   const [selected, setSelected] = useState(selectedOption);
//   const [order, setOrder] = useState(selectedOrder);

//    const handleOrderChange = (order) => {
//     setOrder(order);
//     handleOrderSelect(order);
//   };

//   const handleOptionChange = (option) => {
//     setSelected(option);
//     handleSelect(option);
//   };

// //   return (
// //     <div className="p-4">
// //       <h3 className="text-lg font-bold">Sort Options</h3>
// //       <div className="mt-2">
// //         {options.map((option) => (
// //           <div key={option} className="flex items-center">
// //             <input
// //               type="radio"
// //               name="sortOption"
// //               value={option}
// //               checked={selected === option}
// //               onChange={() => handleOptionChange(option)}
// //             />
// //             <span className="ml-2">{option}</span>
// //           </div>
// //         ))}
// //       </div>
// //       <button
// //         className="mt-4 p-2 bg-blue-500 text-white rounded"
// //         onClick={() => onApply(selected)}
// //       >
// //         Apply Sort
// //       </button>
// //     </div>
// //   );
// // };
// return (
//   <div className="p-4">
//     <h3 className="text-lg font-bold">Sort Options</h3>
//     <div className="mt-2">
//       <label htmlFor="sortOption" className="block font-semibold mb-2">Headers</label>
//       <select
//         id="sortOption"
//         value={selected}
//         onChange={(e) => handleOptionChange(e.target.value)}
//         className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
//       >
//         <option value="" disabled>Select header</option>
//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//       <label htmlFor="sortOrder" className="block font-semibold mb-2">Order</label>
//       <select
//         id="sortOrder"
//         value={order}
//         onChange={(e) => handleOrderChange(e.target.value)}
//         className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
//       >
//         <option value="asc">Ascending</option>
//         <option value="desc">Descending</option>
//       </select>
//     </div>
//     <button
//       className="mt-4 p-2 bg-blue-500 text-white rounded"
//       onClick={() => onApply()}
//     >
//       Apply Sort
//     </button>
//   </div>
// );
// };
// export default SortHeaders;
import React, { useState } from 'react';

const SortHeaders = ({
  options,
  selectedOption,
  selectedOrder,
  handleSelect,
  handleOrderSelect,
  onApply,
}) => {
  const [selected, setSelected] = useState(selectedOption);
  const [order, setOrder] = useState(selectedOrder);

  const handleOptionChange = (option) => {
    setSelected(option);
    handleSelect(option);
  };

  const handleOrderChange = (order) => {
    setOrder(order);
    handleOrderSelect(order);
  };

  // return (
  //   <div className="p-4">
  //     <h3 className="text-lg font-bold">Sort Options</h3>
  //     <div className="mt-2">
  //       <label htmlFor="sortOption" className="block font-semibold mb-2">Headers</label>
  //       <select
  //         id="sortOption"
  //         value={selected}
  //         onChange={(e) => handleOptionChange(e.target.value)}
  //         className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
  //       >
  //         <option value="" disabled>Select header</option>
  //         {options.map((option) => (
  //           <option key={option} value={option}>
  //             {option}
  //           </option>
  //         ))}
  //       </select>
  //       <label htmlFor="sortOrder" className="block font-semibold mb-2">Order</label>
  //       <select
  //         id="sortOrder"
  //         value={order}
  //         onChange={(e) => handleOrderChange(e.target.value)}
  //         className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
  //       >
  //         <option value="asc">Ascending</option>
  //         <option value="desc">Descending</option>
  //       </select>
  //     </div>
  //     <button
  //       className="mt-4 p-2 bg-blue-500 text-white rounded"
  //       onClick={() => onApply()}
  //     >
  //       Apply Sort
  //     </button>
  //   </div>
  // );
  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Sort Options</h3>

      <div className="w-full h-[1px] bg-[#E9E9E9]" />
      <br></br>
      <div className="mt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 mr-2">
            <select
              id="sortOption"
              value={selected}
              onChange={(e) => handleOptionChange(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="" disabled>
                Select header
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 ml-2">
            <select
              id="sortOrder"
              value={order}
              onChange={(e) => handleOrderChange(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded"
            onClick={() => onApply()}
          >
            Apply Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortHeaders;
