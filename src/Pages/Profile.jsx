import { useState } from 'react';
import { AiOutlineLeft, AiOutlineMail } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { CiEdit, CiSearch } from 'react-icons/ci';
import {
  IoIosAddCircleOutline,
  IoIosArrowDown,
  IoIosArrowUp,
} from 'react-icons/io';
import { IoCallOutline } from 'react-icons/io5';
import MainTab from '../Components/Tab/MainTab';
import Avatar from '../assets/Avatar.svg';
import Raw from '../assets/raw.svg';
import { LuFilter, LuPhone } from 'react-icons/lu';
import ActivityTab from '../Components/Tab/ActivityTab';
import ActivityStepper from '../Components/Stepper/ActivityStepper';
import ActivityCard from '../Components/Card/ActivityCard';
import { timelineData } from '../Components/timelineData.js';
import NewLead from '../assets/newlead.svg';
import Deal from '../assets/deal.svg';
const Profile = () => {
  const tabs = [{ title: 'Basic Details' }, { title: 'Extra Details' }];
  const activityTabs = [
    { name: 'All Activity' },
    { name: 'Notes' },
    { name: 'Email' },
    { name: 'Calls' },
    { name: 'Reminders' },
    { name: 'Meetings' },
  ];
  const breadcrumbItems = [
    { text: 'Home', href: '#' },
    { text: 'Projects', href: '#' },
    { text: 'Flowbite', href: '#' },
  ];

  const [active, setActive] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [showBasic, setShowBasic] = useState(false);
  const [showExtra, setshowExtra] = useState(false);
  const [view, setView] = useState('list');
  const [showMore, setShowMore] = useState(false);
  const [activeView, setActiveView] = useState('');
  const [ActiveActivityTab, setActiveActivityTab] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const showAlert = () => {
    alert('Button clicked!');
  };
  const toggleView = () => {
    setView((prevView) => (prevView === 'grid' ? 'list' : 'grid'));
  };
  const handleTabClick = (index) => {
    setActiveTab(index);
    setShowBasic(index === 0);
    setshowExtra(index === 1);
  };
  const handleActivityTabClick = (index) => {
    setActiveView(index);
  };

  const renderView = () => {
    switch (activeView) {
      case 'All Activity':
        return (
          <div>
            <ActivityCard />
          </div>
        );
      case 'Notes':
        return (
          <div>
            <ActivityCard />
          </div>
        );
      case 'Email':
        return (
          <div>
            <ActivityCard />
          </div>
        );
      case 'Calls':
        return (
          <div>
            <ActivityCard />
          </div>
        );
      case 'Reminders':
        return (
          <div>
            <ActivityCard />
          </div>
        );
      case 'Meetings':
        return (
          <div>
            <ActivityCard />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-6 bg-[#FCF9EE] h-[94%] overflow-hidden">
      <div className="flex justify-between bg-[#FFFFFF] p-1">
        <div className="flex items-center">
          <div className="mr-2">
            <AiOutlineLeft fontSize={18} />
          </div>
          <div className="font-semibold text-2xl">Daisy Wilson</div>
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li className="bg-[#FCF9EE] p-2">
              <a href="#" className="text-[#F29900]">
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex h-full pt-6 pb-6">
        <div className="flex gap-4 h-full w-full">
          <div className="w-1/4 bg-[#FFF]  overflow-scroll h-full no-scrollbar p-2 mb-8">
            <div className="px-12 pt-8 pb-2 rounded-3xl text-center flex flex-col justify-center">
              <div className="grid place-content-center">
                <div className="bg-[#4691FF] w-20 h-20 rounded-full grid place-content-center text-white ">
                  <p className="p-4 text-3xl">DW</p>
                </div>
              </div>
              <h1 className="mt-6 text-xl font-bold text-slate-800 dark:text-white">
                Daisy Wilson
              </h1>
              <p>XYZ Company</p>
              <div className="mt-6 flex flex-row justify-center gap-4">
                <button>
                  <span className="flex items-center justify-center h-12 w-12 rounded-full bg-[#F8F8F8]">
                    <IoIosAddCircleOutline fontSize={24} />
                  </span>
                  <p className="text-sm">Log</p>
                </button>

                <button>
                  <span className=" flex items-center justify-center  h-12 w-12 rounded-full bg-[#F8F8F8]">
                    <AiOutlineMail fontSize={24} />
                  </span>
                  <p className="text-sm">Email</p>
                </button>

                <button>
                  <span className="flex items-center justify-center h-12 w-12 rounded-full bg-[#F8F8F8]">
                    <IoCallOutline fontSize={24} />
                  </span>
                  <p className="text-sm">Call</p>
                </button>

                <button>
                  <span className="flex items-center justify-center h-12 w-12 rounded-full bg-[#F8F8F8]">
                    <BsThreeDots fontSize={24} />
                  </span>
                  <p className="text-sm">More</p>
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <button className=" bg-[#323232]  text-white font-bold p-2 rounded-lg m-4 w-40 mx-auto">
                Convert To Deal
              </button>
            </div>
            <div className="flex justify-center flex-col pb-6 text-sm">
              <span className="flex justify-center flex-row">
                <span className="bg-[#57BF57] w-2 h-2 rounded-full place-content-center m-2"></span>{' '}
                Last Activity 2 Jun 2023 at
              </span>
              <span className="flex justify-center flex-row">09:00AM</span>
            </div>
            <hr />
            <div className="m-4 font-bold">
              <p className="text-2xl ">Lead Owner</p>
            </div>
            <div className="flex items-start m-4 mt-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <a
                    href="#"
                    className="text-lg py-2 rounded-lg flex items-center"
                  >
                    <img
                      src={Avatar}
                      alt="Avatar"
                      className="inline h-12 w-12"
                    />
                  </a>
                </div>
                <span className="ml-2">Mahek Khandelwal</span>
              </div>

              <button className="ms-auto flex items-center justify-center h-8 w-8 rounded-md bg-[#F8F8F8]">
                <CiEdit fontSize={20} />
              </button>
            </div>

            <hr />
            <MainTab
              tabs={tabs}
              active={activeTab}
              setActive={setActiveTab}
              handleTabClick={handleTabClick}
            />
            {setShowBasic && activeTab === 0 && (
              <form className="space-y-2 m-4" action="#">
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white">
                    Name
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className=" text-[#707070] rounded-lg  block w-full pl-0 focus:p-2  active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Alice Carlo"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                    Phone Number
                  </label>
                  <input
                    name="number"
                    id="number"
                    placeholder="(405) 555-0128"
                    className=" text-gray-900 rounded-lg  block w-full pl-0 focus:p-2   active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                    Email
                  </label>
                  <input
                    name="email"
                    id="email"
                    placeholder="example@hello.com"
                    className=" text-gray-900 rounded-lg  block w-full pl-0 focus:p-2  active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                    Product
                  </label>
                  <input
                    name="product"
                    id="product"
                    placeholder="Jipssy"
                    className=" text-gray-900 rounded-lg  block w-full pl-0 focus:p-2  active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                    Expected Revenue
                  </label>
                  <input
                    name="revenue"
                    id="revenue"
                    placeholder="$500"
                    className=" text-gray-900 rounded-lg  block w-full pl-0 focus:p-2  active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                    Expected Closing Date
                  </label>
                  <input
                    name="date"
                    id="date"
                    placeholder="26 Jul 2024"
                    className="text-gray-900 rounded-lg  block w-full pl-0 focus:p-2   active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                    Priority
                  </label>
                  <input
                    name="priority"
                    id="priority"
                    placeholder="Medium"
                    className="text-gray-900 rounded-lg  block w-full pl-0 focus:p-2   active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
              </form>
            )}
            {setshowExtra && activeTab === 1 && (
              <form className="space-y-2 m-4" action="#">
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white">
                    Job Title
                  </label>
                  <input
                    className=" text-[#707070] rounded-lg  block w-full pl-0 focus:p-2  active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Project Manager"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                    Website
                  </label>
                  <input
                    placeholder="www.yourweblink.com"
                    className=" text-gray-900 rounded-lg  block w-full pl-0 focus:p-2   active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                    Address
                  </label>
                  <input
                    name="email"
                    id="email"
                    placeholder="4948 Schaefer Crossing, Alaska,
                     Austria,41774-3419"
                    className=" text-gray-900 rounded-lg  block w-full pl-0 focus:p-2  active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                    Industry
                  </label>
                  <input
                    placeholder="IT Industry"
                    className=" text-gray-900 rounded-lg  block w-full pl-0 focus:p-2  active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                    Lead Source
                  </label>
                  <input
                    placeholder="Website"
                    className=" text-gray-900 rounded-lg  block w-full pl-0 focus:p-2  active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                    Secondary Contact
                  </label>
                  <input
                    placeholder="+1 (747) 443-5447"
                    className="text-gray-900 rounded-lg  block w-full pl-0 focus:p-2   active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                    Description (extra)
                  </label>
                  <input
                    placeholder="Lorem ipsum dolor sit amet consectetur. Ornare enim faucibus iaculis duis. Est leo quam ante mattis feugiat malesuada gravida eros purus."
                    className="text-gray-900 rounded-lg  block w-full pl-0 focus:p-2   active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <button
                  onClick={toggleShowMore}
                  className="flex items-center text-yellow-500 focus:outline-none"
                >
                  {showMore ? 'Show less' : 'Show more'}
                  {showMore ? (
                    <IoIosArrowUp className="w-4 h-4 mr-1" />
                  ) : (
                    <IoIosArrowDown className="w-4 h-4 mr-1" />
                  )}
                </button>
                {showMore && (
                  <div>
                    <div>
                      <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                        Company LinkedIn
                      </label>
                      <input
                        placeholder="www.linkedin.com"
                        className="text-gray-900 rounded-lg  block w-full pl-0 focus:p-2   active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-lg font-medium text-[#323232] dark:text-white mt-0">
                        GST/Tax Number
                      </label>
                      <input
                        placeholder="ASWAD1214"
                        className="text-gray-900 rounded-lg  block w-full pl-0 focus:p-2   active:p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
          <div className="w-2/4  bg-[#FFFFFF]  overflow-scroll h-full no-scrollbar p-4 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center p-2">
              <span className="font-bold text-xl">Activities</span>
              <div className="flex items-center space-x-2">
                <div className="flex items-center border border-[#999999] rounded-md p-1.5">
                  <CiSearch className="h-4 w-4 text-[#323232] mr-1" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="outline-none flex-1 text-sm max-w-16 text-[#323232]" // Adjusted width here
                  />
                </div>
                <button className="flex items-center border border-[#999999] rounded-md p-1.5">
                  <LuFilter className="h-5 w-5 text-[#323232] mr-1" />
                </button>
              </div>
            </div>
            <div className="flex items-center font-bold bg-[#FCF9EE]">
              <ActivityTab
                tabs={activityTabs}
                handleActivityTabClick={handleActivityTabClick}
              />
            </div>
            <div className="mt-4">{renderView()}</div>
          </div>
          <div className="w-1/4 bg-[#FFFFFF] overflow-scroll no-scrollbar p-4 flex flex-col max-h-[80%]">
            <div className="flex flex-col sm:flex-row justify-between items-center p-2">
              <span className="font-bold text-xl">Client Journey</span>
              <div className="flex items-center space-x-2">
                <button className="flex items-center justify-center h-8 w-8 rounded-md bg-[#F8F8F8]">
                  <CiEdit fontSize={20} />
                </button>
              </div>
            </div>
            <ol className="mt-2">
              <li className="ms-4">
                <div className="flex flex-col sm:flex-row justify-between items-center bg-[#FCF9EE] rounded-lg p-2">
                  <div className="flex items-center space-x-2">
                    <img src={Raw} alt="raw" className="h-8 w-8" />
                    <span className="font-bold text-sm ml-2">Raw</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="flex items-center rounded-md p-0.5">
                      <p>By: Madelyn Saris</p>
                    </div>
                    <div className="flex items-center rounded-md p-o.5 font-light text-[#888888]">
                      <p>16 Jan 2024</p>
                    </div>
                  </div>
                </div>
              </li>
              <div className="flex ">
                <div className="w-px h-8 bg-[#4691FF] dark:bg-gray-600"></div>
                <span className="ml-5 mt-2 font-semibold text-[#888888] text-xs">
                  Duration (5 days)
                </span>
              </div>
              <li className="ms-4">
                <div className="flex flex-col sm:flex-row justify-between items-center bg-[#FCF9EE] rounded-lg p-2">
                  <div className="flex justify-between  space-x-2">
                    <img src={NewLead} alt="raw" className="h-8 w-8" />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm ml-2">New Lead</span>
                      <span className="font-bold text-sm ml-2">
                        Tried to connect
                      </span>
                      <span className="font-bold text-sm ml-2 text-[#888888]">
                        Qualified
                      </span>
                      <span className="font-bold text-sm ml-2 text-[#888888]">
                        Unqualified
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="flex items-center rounded-md p-0.5">
                      <p>By: Madelyn Saris</p>
                    </div>
                    <div className="flex items-center rounded-md p-o.5 font-light text-[#888888]">
                      <p>20 Jan 2024</p>
                    </div>
                  </div>
                </div>
              </li>
              <div className="w-px h-8 bg-[#57BF57] dark:bg-gray-600 ml-9"></div>
              <li className="mb-4 ms-4">
                <div className="flex flex-col sm:flex-row justify-between items-center bg-[#FCF9EE] rounded-lg p-2 ">
                  <div className="flex justify-between space-x-2">
                    <img src={Deal} alt="raw" className="h-8 w-8" />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm ml-2">Deals</span>
                      <span className="font-bold text-sm ml-2 text-[#888888]">
                        Won
                      </span>
                      <span className="font-bold text-sm ml-2 text-[#888888]">
                        Lost
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="flex items-center rounded-md p-0.5">
                      <p>By: Madelyn Saris</p>
                    </div>
                    <div className="flex items-center rounded-md p-o.5 font-light text-[#888888]">
                      <p>23 Jan 2024</p>
                    </div>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
