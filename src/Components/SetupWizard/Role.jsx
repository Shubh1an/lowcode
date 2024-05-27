import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BackgroundsetupImg2 } from '../../svg';

const Role = ({ setUpImg }) => {
  const [checked, setchecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    setUpImg(<BackgroundsetupImg2 />);
  }, []);
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
            <span className="ml-2 text-[#707070]">Business Owner</span>
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
            <span className="ml-2 text-[#707070]">Customer Support</span>
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
            <span className="ml-2 text-[#707070]">Team Member</span>
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
            <span className="ml-2 text-[#707070]">Customer Success</span>
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
            <span className="ml-2 text-[#707070]">Sales Lead</span>
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

export default Role;
