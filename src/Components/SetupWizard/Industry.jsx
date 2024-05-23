import React, { useState } from 'react';

const Industry = () => {
  const [checked, setchecked] = useState(true);

  const [selectedValue, setSelectedValue] = useState('');

  const [checkedItems, setCheckedItems] = useState({
    B2B2C: false,
    B2B: false,
    B2C: false,
  });

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className="bg-[#ffffff] flex flex-col w-[60%] rounded p-4">
      <div className="text-2xl font-bold flex w-full justify-start pt-4">
        Select your industry
      </div>
      <div className="flex flex-row p-4 space-x-2 flex-wrap">
        <div className="flex flex-col mb-2 mx-2">
          <label className="border border-[#ADADAD] p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
            <input
              type="radio"
              name="option"
              value="option1"
              checked={checked}
              onChange={handleRadioChange}
              className="hidden"
            />
            <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]  rounded-full flex items-center justify-center">
              {checked && (
                <span className="w-2 h-2 bg-black  rounded-full"></span>
              )}
            </span>
            <span className="ml-2 text-[#707070]">IT Industry</span>
          </label>
        </div>

        <div className="flex flex-col mb-2">
          <label className="border border-[#ADADAD] p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
            <input
              type="radio"
              name="option"
              value="option1"
              checked={checked}
              onChange={handleRadioChange}
              className="hidden"
            />
            <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]  rounded-full flex items-center justify-center">
              {checked && (
                <span className="w-2 h-2 bg-black  rounded-full"></span>
              )}
            </span>
            <span className="ml-2 text-[#707070]">Retail & Wholesale</span>
          </label>
        </div>

        <div className="flex flex-col mb-2">
          <label className="border border-[#ADADAD]  p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
            <input
              type="radio"
              name="option"
              value="option1"
              checked={checked}
              onChange={handleRadioChange}
              className="hidden"
            />
            <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]  rounded-full flex items-center justify-center">
              {checked && (
                <span className="w-2 h-2 bg-black  rounded-full"></span>
              )}
            </span>
            <span className="ml-2 text-[#707070]">Hospitality</span>
          </label>
        </div>

        <div className="flex flex-col mb-2">
          <label className="border border-[#ADADAD] p-2  rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
            <input
              type="radio"
              name="option"
              value="option1"
              checked={checked}
              onChange={handleRadioChange}
              className="hidden"
            />
            <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]  rounded-full flex items-center justify-center">
              {checked && (
                <span className="w-2 h-2 bg-black  rounded-full"></span>
              )}
            </span>
            <span className="ml-2 text-[#707070]">Marketing & Advertising</span>
          </label>
        </div>

        <div className="flex flex-col mb-2">
          <label className="border border-[#ADADAD] p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
            <input
              type="radio"
              name="option"
              value="option1"
              checked={checked}
              onChange={handleRadioChange}
              className="hidden"
            />
            <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]  rounded-full flex items-center justify-center">
              {checked && (
                <span className="w-2 h-2 bg-black  rounded-full"></span>
              )}
            </span>
            <span className="ml-2 text-[#707070]">E-Commerce</span>
          </label>
        </div>

        <div className="flex flex-col mb-2">
          <label className="border border-[#ADADAD] p-2  rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
            <input
              type="radio"
              name="option"
              value="option1"
              checked={checked}
              onChange={handleRadioChange}
              className="hidden"
            />
            <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]  rounded-full flex items-center justify-center">
              {checked && (
                <span className="w-2 h-2 bg-black  rounded-full"></span>
              )}
            </span>
            <span className="ml-2 text-[#707070]">IT Consulting</span>
          </label>
        </div>

        <div className="flex flex-col mb-2">
          <label className="border border-[#ADADAD] p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
            <input
              type="radio"
              name="option"
              value="option1"
              checked={checked}
              onChange={handleRadioChange}
              className="hidden"
            />
            <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]  rounded-full flex items-center justify-center">
              {checked && (
                <span className="w-2 h-2 bg-black  rounded-full"></span>
              )}
            </span>
            <span className="ml-2 text-[#707070]">Other</span>
          </label>
        </div>
      </div>

      <div className="text-2xl font-bold flex w-full justify-start pt-4">
        Business Model
      </div>

      <div className="flex flex-row p-4 space-x-2 flex-wrap">
        <div className="flex flex-col mb-2 mx-2">
          <label className="border border-[#ADADAD] p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
            <input
              type="checkbox"
              name="B2B"
              value="B2B"
              checked={checkedItems.B2B}
              onChange={handleRadioChange}
              className="hidden"
            />
            <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]  flex items-center justify-center">
              {checked && <span className="w-2 h-2 "></span>}
            </span>
            <span className="ml-2 text-[#707070]">B2B</span>
          </label>
        </div>

        <div className="flex flex-col mb-2 mx-2">
          <label className="border border-[#ADADAD] p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
            <input
              type="checkbox"
              name="B2C"
              value="B2C"
              checked={checkedItems.B2C}
              onChange={handleRadioChange}
              className="hidden"
            />
            <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]   flex items-center justify-center">
              {checked && <span className="w-2 h-2 "></span>}
            </span>
            <span className="ml-2 text-[#707070]">B2C</span>
          </label>
        </div>

        <div className="flex flex-col mb-2 mx-2">
          <label className="border border-[#ADADAD] p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
            <input
              type="checkbox"
              name="B2B2C"
              value="B2B2C"
              checked={checkedItems.B2B2C}
              onChange={handleRadioChange}
              className="hidden"
            />
            <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]   flex items-center justify-center">
              {checked && <span className="w-2 h-2 "></span>}
            </span>
            <span className="ml-2 text-[#707070]">B2B2C</span>
          </label>
        </div>
      </div>

      <div className="w-[132px] flex justify-end items-end mt-6">
        <button className="w-full h-[50px] bg-[#323232] text-white text-xl rounded-md ">
          Next
        </button>
      </div>
    </div>
  );
};
export default Industry;
