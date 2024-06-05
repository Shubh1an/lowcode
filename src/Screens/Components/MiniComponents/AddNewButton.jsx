import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';

const AddNewButton = ({ onclick, isDropDown }) => {
  const types = ['Form', 'View'];
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  return (
    <div>
      <button
        className="bg-[#000] text-[#fff] px-1 py-1 rounded-md mx-4 font-bold flex"
        onClick={() => {
          if (!isDropDown) {
            onclick('add');
          } else {
            setIsDropDownOpen((prev) => !prev);
          }
        }}
      >
        <IoIosAddCircle className="text-2xl ml-1 text-[#fff]" />
        <p className="mx-1">Add New</p>
      </button>
      {isDropDownOpen && (
        <DropdownComponent
          setIsDropDownOpen={setIsDropDownOpen}
          types={types}
          onclick={onclick}
        />
      )}
    </div>
  );
};

export const DropdownComponent = ({ setIsDropDownOpen, types, onclick }) => {
  return (
    <div className="absolute z-10 w-[200px] border border-[#E9E9E9] bg-[#fff]">
      {/* <Link to="/builder/pages">
      <p className="py-2 px-4 hover:bg-[#E9E9E9] cursor-pointer" onClick={() => {
        setIsDropDownOpen(false)
      }}>Page</p>
    </Link> */}
      {types.map((type, index) => {
        return (
          <p
            key={index}
            className="py-2 px-4 hover:bg-[#E9E9E9] cursor-pointer"
            onClick={() => {
              setIsDropDownOpen(false);
              onclick(type);
            }}
          >
            {type}
          </p>
        );
      })}
    </div>
  );
};

export default AddNewButton;
