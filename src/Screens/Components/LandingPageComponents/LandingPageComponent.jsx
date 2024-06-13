import React from 'react';
import FirstLandingPage from './FirstLandingPage';
import SecondLandingPart from './SecondLandingPart';
const LandingPageComponent = () => {
  return (
    <div className="flex flex-col h-full bg-[#FCF9EE] ">
      <div className="">
        <FirstLandingPage />
      </div>
      <div className="flex-grow">
        <SecondLandingPart />
      </div>
    </div>
  );
};

export default LandingPageComponent;
