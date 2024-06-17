import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIndustryDetail } from '../../redux/userslice';
const Businessmodel = ({ setShow, show }) => {
  const industry = useSelector((state) => state['user']['industry']);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState([
    { name: 'B2B2C', chekboxitem: false },
    { name: 'B2B', chekboxitem: false },
    { name: 'B2C', chekboxitem: false },
  ]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const newstate = checkedItems.map((obj) =>
      obj.name === name ? { ...obj, chekboxitem: checked } : obj,
    );
    // @ts-ignore
    setCheckedItems((prev) => (prev, [...newstate]));
  };

  const gotoRole = () => {
    const bmdata = checkedItems.filter((elm) => {
      if (elm.chekboxitem) {
        delete elm.chekboxitem;
        return elm.name;
      }
    });
    dispatch(setIndustryDetail({ ...industry, busisnessmodel: bmdata }));
    navigate(`/role`);
  };
  return (
    <div className="bg-[#ffffff] flex flex-col w-[564px] rounded p-4">
      <div className="text-2xl font-bold flex w-full justify-start pt-4">
        Business Model
      </div>
      <div className="flex flex-row p-4 space-x-2 flex-wrap">
        {checkedItems.map((checkedItems, index) => {
          return (
            <div className="flex flex-col mb-2 mx-2">
              <label className="border border-[#ADADAD] p-2 rounded-full inline-flex items-center cursor-pointer h-[50px] max-w-md justify-center item-center">
                <input
                  type="checkbox"
                  name={checkedItems.name}
                  value={checkedItems.name}
                  checked={checkedItems.chekboxitem}
                  onChange={handleCheckboxChange}
                  className="hidden"
                />
                <span className="w-5 h-5 border-2 border-[#ADADAD]  rounded-md flex items-center justify-center">
                  {checkedItems.chekboxitem && (
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
                <span className="ml-2 text-[#707070]">{checkedItems.name}</span>
              </label>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-between">
        <button
          className="w-[130px] h-[50px] bg-[#D6D6D6] text-white text-xl rounded-md "
          onClick={() => {
            setShow(!show);
          }}
        >
          Back
        </button>

        <button
          className="w-[130px] h-[50px] bg-[#323232] text-white text-xl rounded-md "
          onClick={() => gotoRole()}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Businessmodel;
