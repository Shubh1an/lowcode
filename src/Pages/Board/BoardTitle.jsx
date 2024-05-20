import React from 'react';

function BoardTitle({ title: label }) {
  return (
    <label className="block mb-2 mt-4 text-lg font-medium cursor-pointer text-[#227A60] font-bold underline px-5">
      {label}
    </label>
  );
}
export default BoardTitle;
