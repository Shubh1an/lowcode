import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Business = () => {
  const [checked, setchecked] = useState(false);

  const [selectedValue, setSelectedValue] = useState('');

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className="bg-[#ffffff] flex flex-col w-[564px] rounded p-4">
      <div className="text-2xl font-bold flex w-full justify-start pt-4">
        How many people are on your teams?
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
            <span className="ml-2 text-[#707070]">Only Me</span>
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
            <span className="ml-2 text-[#707070]">2-5</span>
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
            <span className="ml-2 text-[#707070]">6-10</span>
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
            <span className="ml-2 text-[#707070]">11-15</span>
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
            <span className="ml-2 text-[#707070]">16-25</span>
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
            <span className="ml-2 text-[#707070]">25-50</span>
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
            <span className="ml-2 text-[#707070]">51-100</span>
          </label>
        </div>
      </div>

      <div className="text-2xl font-bold flex w-full justify-start pt-4">
        How many people work at your company?
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

      <div className="w-full flex justify-content-end">
        <Link to={`/setup/role`}>
          <button className="w-[130px] h-[50px] bg-[#323232] text-white text-xl rounded-md ">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};
