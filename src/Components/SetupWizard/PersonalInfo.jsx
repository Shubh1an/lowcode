import React from 'react';

const PersonalInfo = () => {
  return (
    <div className="bg-[#ffffff] flex flex-col w-[60%] rounded p-4">
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
            className="w-full h-[50px] border border-[#ADADAD] rounded-md px-3 mt-2 text-lg font-semibold"
            placeholder="Enter company name"
          />
        </div>

        <div className="w-full flex justify-center items-center mt-6">
          <button className="w-full h-[50px] bg-[#323232] text-white text-xl rounded-md ">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
