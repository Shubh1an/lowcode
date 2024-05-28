import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BackgroundsetupImg } from '../../svg';

const PersonalInfo = ({ setUpImg, formikProps }) => {
  const { handleSubmit, values, touched, errors, handleChange } = formikProps;
  useEffect(() => {
    setUpImg(<BackgroundsetupImg />);
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-[#ffffff] flex flex-col w-[564px] rounded p-4">
        <div className="text-2xl font-bold flex w-full justify-center pt-4">
          Create Your Account
        </div>
        <div className="flex flex-col w-full p-4 space-y-5">
          <div className="flex flex-col w-full ">
            <label className="text-base font-medium text-[#323232]">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={values.fullname}
              onChange={handleChange}
              className="w-full h-[50px] border border-[#ADADAD] rounded-md px-3 mt-2 text-lg font-semibold"
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-base font-medium text-[#323232]">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full h-[50px] border border-[#ADADAD] rounded-md px-3 mt-2 text-lg font-semibold"
              placeholder="Enter at least 8 characters"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-base font-medium text-[#323232]">
              Company Name
            </label>
            <input
              type="text"
              name="companyname"
              id="companyname"
              value={values.companyname}
              onChange={handleChange}
              className="w-full h-[50px] border border-[#ADADAD] rounded-md px-3 mt-2 text-lg font-semibold"
              placeholder="Enter company name"
            />
          </div>

          <div className="w-full mt-6">
            <button
              className="w-full h-[50px] bg-[#323232] text-white text-xl rounded-md spacing-y-2"
              type="submit"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PersonalInfo;
