import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCompanyBusiness } from '../../redux/userslice';
import { BackgroundsetupImg1 } from '../../svg';

const Business = ({ setUpImg }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setUpImg(<BackgroundsetupImg1 />);
  }, []);

  const [teampeople, setteampeople] = useState([
    { name: 'Only Me', checkselect: false },
    { name: '2-5', checkselect: false },
    { name: '6-10', checkselect: false },
    { name: '11-15', checkselect: false },
    { name: '16-25', checkselect: false },
    { name: '25-50', checkselect: false },
    { name: '51-100', checkselect: false },
    { name: '101-500', checkselect: false },
  ]);
  const [companypeople, setcompanypeople] = useState([
    { name: '1-19', checkselect: false },
    { name: '20-49', checkselect: false },
    { name: '50-99', checkselect: false },
    { name: '100-250', checkselect: false },
    { name: '251-500', checkselect: false },
    { name: '501-1500', checkselect: false },
    { name: '1500+', checkselect: false },
  ]);

  const handleteamChange = (e, name) => {
    const newstate = teampeople.map((obj) =>
      obj.name === name
        ? { ...obj, checkselect: e.target.checked }
        : { ...obj, checkselect: false },
    );
    // @ts-ignore
    setteampeople((prev) => (prev, [...newstate]));
  };
  const handleCpmnyChange = (e, name) => {
    const newstate = companypeople.map((obj) =>
      obj.name === name
        ? { ...obj, checkselect: e.target.checked }
        : { ...obj, checkselect: false },
    );
    // @ts-ignore
    setcompanypeople((prev) => (prev, [...newstate]));
  };

  const gotoApp = () => {
    const teamdata = teampeople.find((elm) => elm.checkselect === true)?.name;
    const cmpnydata = companypeople.find(
      (elm) => elm.checkselect === true,
    )?.name;
    dispatch(
      setCompanyBusiness({ teamcount: teamdata, companycount: cmpnydata }),
    );
    navigate(`/apps`);
  };

  return (
    <div className="bg-[#ffffff] flex flex-col w-[564px] rounded p-4">
      <div className="text-2xl font-bold flex w-full justify-start pt-4">
        How many people are on your teams?
      </div>
      <div className="flex flex-row p-4 space-x-2 flex-wrap">
        {teampeople.map((data, i) => {
          return (
            <div className="flex flex-col mb-2 mx-2" key={i}>
              <label className="border border-[#ADADAD] p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
                <input
                  type="radio"
                  name="option"
                  value={data.name}
                  checked={data.checkselect}
                  onChange={(e) => handleteamChange(e, data.name)}
                  className="hidden"
                />
                <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]  rounded-full flex items-center justify-center">
                  {data.checkselect && (
                    <span className="w-2 h-2 bg-black  rounded-full"></span>
                  )}
                </span>
                <span className="ml-2 text-[#707070]">{data.name}</span>
              </label>
            </div>
          );
        })}
      </div>

      <div className="text-2xl font-bold flex w-full justify-start pt-4">
        How many people work at your company?
      </div>
      <div className="flex flex-row p-4 space-x-2 flex-wrap">
        {companypeople.map((elm, j) => {
          return (
            <div className="flex flex-col mb-2 mx-2" key={j}>
              <label className="border border-[#ADADAD] p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
                <input
                  type="radio"
                  name="option"
                  value={elm.name}
                  checked={elm.checkselect}
                  onChange={(e) => handleCpmnyChange(e, elm.name)}
                  className="hidden"
                />
                <span className="w-[20px] h-[20px] border-2 border-[#ADADAD]  rounded-full flex items-center justify-center">
                  {elm.checkselect && (
                    <span className="w-2 h-2 bg-black  rounded-full"></span>
                  )}
                </span>
                <span className="ml-2 text-[#707070]">{elm.name}</span>
              </label>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-between">
        <Link to={`/role`}>
          <button className="w-[130px] h-[50px] bg-[#D6D6D6] text-white text-xl rounded-md ">
            Back
          </button>
        </Link>

        <button
          className="w-[130px] h-[50px] bg-[#323232] text-white text-xl rounded-md "
          onClick={gotoApp}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Business;
