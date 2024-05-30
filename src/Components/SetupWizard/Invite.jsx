import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BackgroundsetupImg5 } from '../../svg';
import { useSelector } from 'react-redux';

const Invite = ({ setUpImg }) => {
  const userdata = useSelector((state) => state['user']);
  const orgdata = useSelector((state) => state['user']['orgdetail']);
  const industry = useSelector((state) => state['user']['industry']);
  const role = useSelector((state) => state['user']['role']);
  const appDetail = useSelector((state) => state['user']['companyBusisness']);
  const companyBusisness = useSelector(
    (state) => state['user']['companyBusisness'],
  );

  useEffect(() => {
    setUpImg(<BackgroundsetupImg5 />);
  }, []);
  // Create link and and send  is pending

  const finishSignup = () => {
    console.log(
      'final object have save in redux',
      companyBusisness,
      appDetail,
      role,
      industry,
      orgdata,
      userdata,
    );
  };
  return (
    <div className="bg-[#ffffff] flex flex-col w-[564px] rounded p-4">
      <div className="text-2xl font-bold flex w-full justify-start pt-4">
        Share Link to invite team members
      </div>
      <input
        type="text"
        className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
        value={'htttp://inviteteammember/mvzxcbczxvnb...'}
      />

      <div className="w-full flex justify-between mt-6">
        <Link to={`/apps`}>
          <button className="w-[130px] h-[50px] bg-[#D6D6D6] text-white text-xl rounded-md ">
            Back
          </button>
        </Link>
        <Link to={`/auth/home`}>
          <button
            className="w-[130px] h-[50px] bg-[#323232] text-white text-xl rounded-md "
            onClick={() => finishSignup()}
          >
            Finish
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Invite;
