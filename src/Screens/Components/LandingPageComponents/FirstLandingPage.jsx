import React from 'react';
import LandingGroup from '../../../assets/LandingGroup.svg';
import LandingPageFont from '../../../assets/LandingPageFont.svg';

const FirstLandingPage = () => {
  return (
    //     <div className="relative text-center">
    //     <div className="relative inline-block">
    //       <img src={LandingGroup} alt="Landing Page" className="mx-auto " />
    //       <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
    //         <span className="text-Black text-8xl font-bold bg-opacity-50 px-4 py-3 rounded-md transform -translate-y-10" style={{ fontSize: '114px', width: '800px' }}>
    //         <span className="text-gray-900">Hi</span>, <span className="text-yellow-500">Alice</span>
    //         </span>
    //       </div>
    //       <div className="absolute top-12 left-0 w-full h-full flex items-center justify-center">
    //       <img src={LandingPageFont} alt="Landing Page Font" className="mt-4" />
    //       </div>
    //     </div>
    //   </div>

    <div className="text-center">
      <div
        className="absolute inline-block"
        style={{
          textAlign: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: '20%',
          right: '20%',
        }}
      >
        <img src={LandingGroup} alt="Landing Page" className="mx-auto w-3/4" />

        <div className="top-0 left-0 w-full h-full flex items-center justify-center">
          <span
            className="text-Black text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-opacity-50 px-4 py-3 rounded-md transform -translate-y-10"
            style={{ position: 'absolute', top: '25%' }}
          >
            <span className="text-gray-900">Hi</span>,{' '}
            <span className="text-yellow-500">Alice</span>
          </span>
        </div>
        <div className="absolute top-12 left-0 w-full h-full flex items-center justify-center">
          <img
            src={LandingPageFont}
            alt="Landing Page Font"
            className="mt-4 w-full sm:w-1/2 md:w-2/3 lg:w-3/4 xl:w-4/5"
            style={{ width: '400px', marginLeft: '20px' }}
          />
        </div>
      </div>
    </div>

    // <div className="text-center relative">
    //   <div
    //     className="inline-block mx-auto"
    //     style={{
    //       textAlign: 'center',
    //       justifyContent: 'center',
    //       position: 'absolute',
    //       left: '50%',
    //       transform: 'translateX(-50%)',
    //     }}
    //   >
    //     <img
    //       src={LandingGroup}
    //       alt="Landing Page"
    //       className="mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
    //     />

    //     <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
    //       <span
    //         className="text-black text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-opacity-50 px-4 py-3 rounded-md transform -translate-y-10"
    //         style={{ top: '25%' }}
    //       >
    //         <span className="text-gray-900">Hi</span>,{' '}
    //         <span className="text-yellow-500">Alice</span>
    //       </span>
    //     </div>

    //     <div className="absolute top-12 left-0 w-full h-full flex items-center justify-center">
    //       <img
    //         src={LandingPageFont}
    //         alt="Landing Page Font"
    //         className="mt-4 w-2/3 sm:w-1/3 md:w-1/4"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default FirstLandingPage;
