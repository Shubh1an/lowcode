import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BackgroundsetupImg1 } from '../../svg';
import { getIndustry } from '../../Requests/user';

const Industry = ({ setUpImg }) => {
  // const { handleSubmit, values, touched, errors, handleChange } = formikProps;
  const [industry, setIndustry] = useState([
    { name: 'IT Industry', checkselect: false },
    { name: 'IT Consulting', checkselect: false },
    { name: 'Hospitality', checkselect: false },
    { name: 'E-Commerce', checkselect: false },
    { name: 'Marketing & Advertising', checkselect: false },
    { name: 'Retail & Wholesale', checkselect: false },
    { name: 'Other', checkselect: false },
  ]);
  useEffect(() => {
    setUpImg(<BackgroundsetupImg1 />);
  }, []);

  const handleRadioChange = (e, name) => {
    const newstate = industry.map((obj) =>
      obj.name === name
        ? { ...obj, checkselect: e.target.checked }
        : { ...obj, checkselect: false },
    );
    // @ts-ignore
    setIndustry((prev) => (prev, [...newstate]));
  };

  const showbusinessModel = () => {};
  return (
    // <form onSubmit={handleSubmit}>
    <div className="bg-[#ffffff] flex flex-col w-[564px] rounded p-4">
      <div className="text-2xl font-bold flex w-full justify-start pt-4">
        Select your industry
      </div>
      <div className="flex flex-row p-4 space-x-2 flex-wrap">
        {industry.map((elm, index) => {
          return (
            <div className="flex flex-col mb-2" key={index}>
              <label className="border border-[#ADADAD] p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
                <input
                  type="radio"
                  name="option"
                  value={elm.name}
                  checked={elm.checkselect}
                  onChange={(e) => handleRadioChange(e, elm.name)}
                  className="hidden"
                />
                <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]  rounded-full flex items-center justify-center">
                  {elm.checkselect && (
                    <span className="w-2 h-2 bg-black  rounded-full"></span>
                  )}
                </span>
                <span className="ml-2 text-[#707070]">{elm?.name}</span>
              </label>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-content-end">
        {/* <Link to={`/businessmodel`}> */}
        <button
          className="w-[130px] h-[50px] bg-[#323232] text-white text-xl rounded-md "
          onClick={showbusinessModel}
        >
          Next
        </button>
        {/* </Link> */}
      </div>
    </div>
    // </form>
  );
};
export default Industry;
