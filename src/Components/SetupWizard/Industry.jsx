import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BackgroundsetupImg1 } from '../../svg';
import { getIndustry } from '../../Requests/user';

const Industry = ({ setUpImg, formikProps }) => {
  const { handleSubmit, values, touched, errors, handleChange } = formikProps;
  const [checked, setchecked] = useState(false);

  const [selectedValue, setSelectedValue] = useState('');

  const [checkedItems, setCheckedItems] = useState({
    B2B2C: false,
    B2B: false,
    B2C: false,
  });

  useEffect(() => {
    setUpImg(<BackgroundsetupImg1 />);
    // getIndustryData();
  }, []);

  // const getIndustryData = () => {
  //   getIndustry().then((data) => {
  //     console.log('industry----', data);
  //   });
  // };

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-[#ffffff] flex flex-col w-[564px] rounded p-4">
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
              <span className="ml-2 text-[#707070]">
                Marketing & Advertising
              </span>
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
                onChange={handleCheckboxChange}
                className="hidden"
              />
              <span className="w-5 h-5 border-2 border-[#ADADAD]  rounded-md flex items-center justify-center">
                {checked && (
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
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
                onChange={handleCheckboxChange}
                className="hidden"
              />
              <span className="w-5 h-5 border-2 border-[#ADADAD]  rounded-md flex items-center justify-center">
                {checked && (
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
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
                onChange={handleCheckboxChange}
                className="hidden"
              />
              <span className="w-5 h-5 border-2 border-[#ADADAD]  rounded-md flex items-center justify-center">
                {checked && (
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
              </span>

              <span className="ml-2 text-[#707070]">B2B2C</span>
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
    </form>
  );
};
export default Industry;
