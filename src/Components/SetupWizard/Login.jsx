import React, { useEffect } from 'react';
// @ts-ignore
import GoogleIcon from '../../assets/google.svg';
// @ts-ignore
import FacebookIcon from '../../assets/facebook.svg';
// @ts-ignore
import MicrosoftIcon from '../../assets/microsoft.svg';
// @ts-ignore
import LinkedinIcon from '../../assets/linkedIn.svg';
import { BackgroundsetupImg } from '../../svg';

const Login = ({ setUpImg }) => {
  useEffect(() => {
    setUpImg(<BackgroundsetupImg />);
  }, []);

  return (
    <div className="bg-[#ffffff] flex flex-col w-[564px] rounded p-4">
      <div className="text-2xl font-bold flex w-full justify-center pt-4">
        Sign In
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
        <div className="flex flex-col w-full mt-4">
          <label className="text-base font-medium text-[#323232]">
            Password
          </label>
          <input
            type="password"
            className="w-full h-[50px] border border-[#ADADAD] rounded-md px-3 mt-2 text-lg font-semibold"
            placeholder="P@ssw0rd"
          />
        </div>
        <div className="w-full mt-2 flex justify-end">
          <a className="text-sm font-medium text-[#323232]">Forgot Password?</a>
        </div>
        <div className="w-full mt-6">
          <button className="w-full h-[50px] bg-[#323232] text-white text-xl rounded-md">
            Login
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
      </div>
    </div>
  );
};

export default Login;
