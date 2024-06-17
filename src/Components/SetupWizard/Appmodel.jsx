import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BackgroundsetupImg4 } from '../../svg';
import { useDispatch } from 'react-redux';
import { setApp } from '../../redux/userslice';

const Appmodel = ({ setUpImg }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [apps, setApps] = useState([
    { name: 'Chat', checkselect: false },
    { name: 'CRM', checkselect: false },
    { name: 'Builder', checkselect: false },
    { name: 'Template', checkselect: false },
    { name: 'Sequence', checkselect: false },
    { name: 'Workflow', checkselect: false },
  ]);
  const [crm, setCRM] = useState([
    { name: 'Marketing CRM', checkselect: false },
    { name: 'Sales CRM', checkselect: false },
  ]);
  useEffect(() => {
    setUpImg(<BackgroundsetupImg4 />);
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const newstate = apps.map((obj) =>
      obj.name === name ? { ...obj, checkselect: checked } : obj,
    );
    // @ts-ignore
    setApps((prev) => (prev, [...newstate]));
  };

  const handleRadioChange = (e, name) => {
    const newstate = crm.map((obj) =>
      obj.name === name
        ? { ...obj, checkselect: e.target.checked }
        : { ...obj, checkselect: false },
    );
    // @ts-ignore
    setCRM((prev) => (prev, [...newstate]));
  };

  const gotoInvite = () => {
    const crmdata = crm.find((elm) => elm.checkselect === true)?.name;

    const appdata = apps.filter((elm) => {
      if (elm.checkselect) {
        delete elm.checkselect;
        return elm.name;
      }
    });
    dispatch(setApp({ app: appdata, focusaim: crmdata }));
    navigate(`/invitemember`);
  };
  return (
    <div className="bg-[#ffffff] flex flex-col w-[564px] rounded p-4">
      <div className="text-2xl font-bold flex w-full justify-start pt-4">
        Select Apps
      </div>
      <div className="flex flex-row p-4 space-x-2 flex-wrap">
        {apps.map((elm, index) => {
          return (
            <div className="flex flex-col mb-2" key={index}>
              <label className="border border-[#ADADAD] p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
                <input
                  type="checkbox"
                  name={elm.name}
                  value={elm.name}
                  checked={elm.checkselect}
                  onChange={handleCheckboxChange}
                  className="hidden"
                />
                <span className="w-5 h-5 border-2 border-[#ADADAD]  rounded-md flex items-center justify-center">
                  {elm.checkselect && (
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
                <span className="ml-2 text-[#707070]">{elm.name}</span>
              </label>
            </div>
          );
        })}
      </div>

      <div className="text-2xl font-bold flex w-full justify-start pt-4">
        Select what you’d like to focus on
      </div>
      <div className="flex flex-row p-4 space-x-2 flex-wrap">
        {crm.map((elm, index) => {
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

      <div className="w-full flex justify-between">
        <Link to={`/companymember`}>
          <button className="w-[130px] h-[50px] bg-[#D6D6D6] text-white text-xl rounded-md ">
            Back
          </button>
        </Link>

        <button
          className="w-[130px] h-[50px] bg-[#323232] text-white text-xl rounded-md "
          onClick={gotoInvite}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Appmodel;
