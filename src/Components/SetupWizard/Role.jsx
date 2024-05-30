import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BackgroundsetupImg2 } from '../../svg';
import { useDispatch } from 'react-redux';
import { setRoleRedux } from '../../redux/userslice';

const Role = ({ setUpImg }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setUpImg(<BackgroundsetupImg2 />);
  }, []);
  const [role, setRole] = useState([
    { name: 'Sales Lead', checkselect: false },
    { name: 'Customer Success', checkselect: false },
    { name: 'Team Member', checkselect: false },
    { name: 'Customer Support', checkselect: false },
    { name: 'Business Owner', checkselect: false },
  ]);
  const handleRadioChange = (e, name) => {
    const newstate = role.map((obj) =>
      obj.name === name
        ? { ...obj, checkselect: e.target.checked }
        : { ...obj, checkselect: false },
    );
    // @ts-ignore
    setRole((prev) => (prev, [...newstate]));
  };

  const gotoCompany = () => {
    const roledata = role.find((elm) => elm.checkselect === true)?.name;
    dispatch(setRoleRedux(roledata));
    navigate(`/companymember`);
  };
  return (
    <div className="bg-[#ffffff] flex flex-col w-[564px] rounded p-4">
      <div className="text-2xl font-bold flex w-full justify-start pt-4">
        Select your Role
      </div>
      <div className="flex flex-row p-4 space-x-2 flex-wrap">
        {role.map((role, k) => {
          return (
            <div className="flex flex-col mb-2 mx-2">
              <label className="border border-[#ADADAD] p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
                <input
                  type="radio"
                  name="option"
                  value={role.name}
                  checked={role.checkselect}
                  onChange={(e) => handleRadioChange(e, role.name)}
                  className="hidden"
                />
                <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]  rounded-full flex items-center justify-center">
                  {role.checkselect && (
                    <span className="w-2 h-2 bg-black  rounded-full"></span>
                  )}
                </span>
                <span className="ml-2 text-[#707070]">{role.name}</span>
              </label>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-between">
        <Link to={`/industry`}>
          <button className="w-[130px] h-[50px] bg-[#D6D6D6] text-white text-xl rounded-md ">
            Back
          </button>
        </Link>

        <button
          className="w-[130px] h-[50px] bg-[#323232] text-white text-xl rounded-md "
          onClick={() => gotoCompany()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Role;
