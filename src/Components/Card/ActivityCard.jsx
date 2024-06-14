import React from 'react';
import Avatar from '../../assets/Avatar.svg';
import { CiEdit } from 'react-icons/ci';
import { LuPhone } from 'react-icons/lu';
import { AiOutlineMail } from 'react-icons/ai';
const ActivityCard = () => {
  return (
    <div>
      {/* Upcoming */}
      <div className="m-2">
        <span className="text-md font-bold text-[#323232]">
          Upcoming Activites
        </span>
        <div className="flex items-start gap-2.5 mt-4 mb-2">
          <div className="flex flex-col w-full max-w-[320px] leading-1.5">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                15 jan 2024
              </span>
              <div className="w-px h-3 bg-[#4A4D53] dark:bg-gray-600"></div>
              <span className="text-xs font-medium text-[#323232] dark:text-gray-400">
                03:26 PM
              </span>
            </div>
          </div>
        </div>
        <div className="w-full p-4 bg-white rounded-lg shadow-md border-l-4 border-[#F29900] mb-2">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <a href="#" className="block relative">
                <img
                  src={Avatar}
                  alt="Avatar"
                  className="rounded-full h-11 w-11"
                />
              </a>
            </div>
            <div className="ml-4 flex-grow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-bold text-md text-[#323232]">
                    Madelyn Saris
                  </span>
                  <span className="ml-4 px-2 py-1 rounded-full bg-[#F9EFDE] text-[#F29900] text-sm font-semibold  flex items-center">
                    <LuPhone fontSize={16} className=" mr-1" />
                    Phone
                  </span>
                </div>
                <button className="flex items-center justify-center h-8 w-8 rounded-md bg-[#F8F8F8]">
                  <CiEdit fontSize={20} />
                </button>
              </div>

              <p className="mt-1 text-sm font-medium text-[#323232] dark:text-gray-400 mr-12 text-justify">
                <hr className="mt-2 mb-3" />
                <p className="mr-2 ">
                  A product team meeting is a gathering of the cross-functional
                  product team — ideally including team members from product,
                  engineering, marketing, and customer support.
                </p>

                <div className="mt-4">
                  <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <button
                      type="button"
                      className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                    >
                      Mark as done
                    </button>
                  </span>
                  <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <button
                      type="button"
                      className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                    >
                      Reschedule
                    </button>
                  </span>
                  <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <button
                      type="button"
                      className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                    >
                      Cancel
                    </button>
                  </span>
                </div>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2.5 mt-4 mb-2">
          <div className="flex flex-col w-full max-w-[320px] leading-1.5">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                16 jan 2024
              </span>
              <div className="w-px h-3 bg-[#4A4D53] dark:bg-gray-600"></div>
              <span className="text-xs font-medium text-[#323232] dark:text-gray-400">
                03:26 PM
              </span>
            </div>
          </div>
        </div>
        <div className="w-full p-4 bg-white rounded-lg shadow-md border-l-4 border-[#9159D8] mb-2">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <a href="#" className="block relative">
                <img
                  src={Avatar}
                  alt="Avatar"
                  className="rounded-full h-11 w-11"
                />
              </a>
            </div>
            <div className="ml-4 flex-grow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-bold text-md text-[#323232]">
                    Madelyn Saris
                  </span>
                  <span className="ml-4 px-2 py-1 rounded-full bg-[linear-gradient(90deg,rgba(145,89,216,0.1),rgba(145,89,216,0.1))] text-[#9159D8] text-sm font-semibold flex items-center">
                    <AiOutlineMail fontSize={16} className=" mr-1" />
                    Email
                  </span>
                </div>
                <button className="flex items-center justify-center h-8 w-8 rounded-md bg-[#F8F8F8]">
                  <CiEdit fontSize={20} />
                </button>
              </div>

              <p className="mt-1 text-sm font-medium text-[#323232] dark:text-gray-400 mr-12 text-justify">
                <hr className="mt-2 mb-3" />
                <p className="mr-2 ">
                  A product team meeting is a gathering of the cross-functional
                  product team — ideally including team members from product,
                  engineering, marketing, and customer support.
                </p>

                <div className="mt-4">
                  <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <button
                      type="button"
                      className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                    >
                      Mark as done
                    </button>
                  </span>
                  <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <button
                      type="button"
                      className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                    >
                      Reschedule
                    </button>
                  </span>
                  <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <button
                      type="button"
                      className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                    >
                      Cancel
                    </button>
                  </span>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity History */}
      <div className="m-2 mt-4">
        <span className="text-md font-bold text-[#323232]">
          Activity History
        </span>
        <ol className="relative border-s border-[#ADADAD] dark:border-gray-700 border-dashed">
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-[#ADADAD] rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <div className="flex items-start gap-2.5 mt-4 mb-2">
              <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    15 jan 2024
                  </span>
                  <div className="w-px h-3 bg-[#4A4D53] dark:bg-gray-600"></div>
                  <span className="text-xs font-medium text-[#323232] dark:text-gray-400">
                    03:26 PM
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full p-4 bg-white rounded-lg shadow-md border-l-4 border-[#F29900] mb-2">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <a href="#" className="block relative">
                    <img
                      src={Avatar}
                      alt="Avatar"
                      className="rounded-full h-11 w-11"
                    />
                  </a>
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-bold text-md text-[#323232]">
                        Madelyn Saris
                      </span>
                      <span className="ml-4 px-2 py-1 rounded-full bg-[#F9EFDE] text-[#F29900] text-sm font-semibold  flex items-center">
                        <LuPhone fontSize={16} className=" mr-1" />
                        Phone
                      </span>
                    </div>
                    <button className="flex items-center justify-center h-8 w-8 rounded-md bg-[#F8F8F8]">
                      <CiEdit fontSize={20} />
                    </button>
                  </div>

                  <p className="mt-1 text-sm font-medium text-[#323232] dark:text-gray-400 mr-12 text-justify">
                    <hr className="mt-2 mb-3" />
                    <p className="mr-2 ">
                      Tried to connect but call not picked up by client
                    </p>

                    <div className="mt-4">
                      <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <button
                          type="button"
                          className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                        >
                          Mark as done
                        </button>
                      </span>
                      <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <button
                          type="button"
                          className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                        >
                          Reschedule
                        </button>
                      </span>
                      <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <button
                          type="button"
                          className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                        >
                          Cancel
                        </button>
                      </span>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-[#ADADAD] rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <div className="flex items-start gap-2.5 mt-4 mb-2">
              <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    16 jan 2024
                  </span>
                  <div className="w-px h-3 bg-[#4A4D53] dark:bg-gray-600"></div>
                  <span className="text-xs font-medium text-[#323232] dark:text-gray-400">
                    03:26 PM
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full p-4 bg-white rounded-lg shadow-md border-l-4 border-[#9159D8] mb-2">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <a href="#" className="block relative">
                    <img
                      src={Avatar}
                      alt="Avatar"
                      className="rounded-full h-11 w-11"
                    />
                  </a>
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-bold text-md text-[#323232]">
                        Madelyn Saris
                      </span>
                      <span className="ml-4 px-2 py-1 rounded-full bg-[linear-gradient(90deg,rgba(145,89,216,0.1),rgba(145,89,216,0.1))] text-[#9159D8] text-sm font-semibold flex items-center">
                        <AiOutlineMail fontSize={16} className=" mr-1" />
                        Email
                      </span>
                    </div>
                    <button className="flex items-center justify-center h-8 w-8 rounded-md bg-[#F8F8F8]">
                      <CiEdit fontSize={20} />
                    </button>
                  </div>

                  <p className="mt-1 text-sm font-medium text-[#323232] dark:text-gray-400 mr-12 text-justify">
                    <hr className="mt-2 mb-3" />
                    <p className="mr-2 ">
                      Tried to connect but call not picked up by client
                    </p>

                    <div className="mt-4">
                      <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <button
                          type="button"
                          className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                        >
                          Mark as done
                        </button>
                      </span>
                      <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <button
                          type="button"
                          className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                        >
                          Reschedule
                        </button>
                      </span>
                      <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <button
                          type="button"
                          className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                        >
                          Cancel
                        </button>
                      </span>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li className="ms-4">
            <div className="absolute w-3 h-3 bg-[#ADADAD] rounded-full mt-1.5 -start-1.5  dark:border-gray-900 dark:bg-gray-700"></div>
            <div className="flex items-start gap-2.5 mt-4 mb-2">
              <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    15 jan 2024
                  </span>
                  <div className="w-px h-3 bg-[#4A4D53] dark:bg-gray-600"></div>
                  <span className="text-xs font-medium text-[#323232] dark:text-gray-400">
                    03:26 PM
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full p-4 bg-white rounded-lg shadow-md border-l-4 border-[#F29900] mb-2">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <a href="#" className="block relative">
                    <img
                      src={Avatar}
                      alt="Avatar"
                      className="rounded-full h-11 w-11"
                    />
                  </a>
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-bold text-md text-[#323232]">
                        Madelyn Saris
                      </span>
                      <span className="ml-4 px-2 py-1 rounded-full bg-[#F9EFDE] text-[#F29900] text-sm font-semibold  flex items-center">
                        <LuPhone fontSize={16} className=" mr-1" />
                        Phone
                      </span>
                    </div>
                    <button className="flex items-center justify-center h-8 w-8 rounded-md bg-[#F8F8F8]">
                      <CiEdit fontSize={20} />
                    </button>
                  </div>

                  <p className="mt-1 text-sm font-medium text-[#323232] dark:text-gray-400 mr-12 text-justify">
                    <hr className="mt-2 mb-3" />
                    <p className="mr-2 ">
                      Tried to connect but call not picked up by client
                    </p>

                    <div className="mt-4">
                      <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <button
                          type="button"
                          className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                        >
                          Mark as done
                        </button>
                      </span>
                      <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <button
                          type="button"
                          className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                        >
                          Reschedule
                        </button>
                      </span>
                      <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-[linear-gradient(90deg,rgba(70,145,255,0.1),rgba(70,145,255,0.1))] rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <button
                          type="button"
                          className="inline-flex items-center p-0.5  text-xs text-[#4691FF] rounded-full  dark:hover:bg-blue-800 dark:hover:text-blue-300"
                        >
                          Cancel
                        </button>
                      </span>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ActivityCard;
