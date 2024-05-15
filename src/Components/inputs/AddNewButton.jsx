import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';

const AddNewButton = ({ onclick }) => {
  return (
    <button className="bg-[#227A60] text-[#fff] px-1 py-1 rounded-md mx-4 font-bold flex" onClick={onclick}>
      <IoIosAddCircle className="text-2xl ml-1 text-[#fff]" />
      <p className="mx-1">Add New</p>
    </button>
  );
};

export default AddNewButton;
