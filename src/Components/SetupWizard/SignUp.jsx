import React from 'react';
import GoogleIcon from '../../assets/google.svg';
import FacebookIcon from '../../assets/facebook.svg';
import MicrosoftIcon from '../../assets/microsoft.svg';
import LinkedinIcon from '../../assets/linkedIn.svg';
import { Link } from 'react-router-dom';
const SignUp = () => {
  return (
    <div className="bg-[#ffffff] flex flex-col w-[60%] rounded p-4">
      <div className="text-2xl font-bold flex w-full justify-center pt-4">
        Sign Up
      </div>
      <div className="flex flex-col w-full p-4">
        <div className="flex flex-col w-full">
          <label className="text-base font-medium text-[#323232]">Email</label>
          <input
            type="email"
            className="w-full h-[50px] border border-[#ADADAD] rounded-md px-3 mt-2 text-lg font-semibold"
            placeholder="example@hello.com"
          />
        </div>

        <div className="w-full mt-6">
          <button className="w-full h-[50px] bg-[#323232] text-white text-xl rounded-md spacing-y-2">
            Continue
          </button>
        </div>

        <div className="w-full mt-6 flex justify-center items-center">
          <div className="w-2/5 h-[1px] bg-[#ADADAD]"></div>
          <div className="w-1/5 text-center text-sm font-medium text-[#ADADAD]">
            or
          </div>
          <div className="w-2/5 h-[1px] bg-[#ADADAD]"></div>
        </div>

        <div className="w-full mt-6 flex justify-center items-center">
          <img src={MicrosoftIcon} className="w-8 h-8 mx-5" />
          <img src={GoogleIcon} className="w-8 h-8 mx-5" />
          <img src={LinkedinIcon} className="w-8 h-8 mx-5" />
          <img src={FacebookIcon} className="w-8 h-8 mx-5" />
        </div>

        <div className="w-full flex justify-center items-center mt-6">
          <Link to={`/setup/signin`}>
            <div className="text-base font-medium ">
              Already have an account?
              <span className="text-sm mx-2 font-medium text-[#F29900]">
                Login
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
