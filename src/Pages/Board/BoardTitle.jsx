import React from 'react';

function BoardTitle({ draggedItem }) {
  return (
    <>
      {draggedItem.map((data, index) => (
        <label
          key={index}
          className="block mb-2 mt-4 text-lg font-medium cursor-pointer text-[#227A60] font-bold underline px-5"
        >
          {data?.title}
        </label>
      ))}
    </>
  );
}
export default BoardTitle;
