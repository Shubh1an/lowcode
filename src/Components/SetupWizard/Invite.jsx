import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BackgroundsetupImg5 } from '../../svg';
import { useSelector } from 'react-redux';
import { Createcompany, Createuser } from '../../Requests/user';

const Invite = ({ setUpImg }) => {
  const userdata = useSelector((state) => state['user']);
  const navigate = useNavigate();

  useEffect(() => {
    setUpImg(<BackgroundsetupImg5 />);
  }, []);
  // Create link and and send  is pending

  const finishSignup = () => {
    Createuser({
      fullname: userdata?.orgdetail?.fullname,
      email: userdata?.orgdetail?.email,
      password: userdata?.orgdetail?.password,
      role: userdata?.role,
    }).then((res) => {
      let userId = res?.data?.data?._id;
      Createcompany({
        companyname: userdata?.orgdetail?.companyname,
        userId: userId,
        industryId: userdata?.industry?.industry,
        businessmodelId: userdata?.industry?.busisnessmodel,
        teamCount: userdata.companyBusisness.teamcount,
        companyCount: userdata.companyBusisness.companycount,
        selectedApps: userdata?.appDetail?.app,
        choice: userdata?.appDetail?.focusaim,
      }).then((res) => {
        navigate('/signin');
      });
    });
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
