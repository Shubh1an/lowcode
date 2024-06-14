import React from 'react';
import FirstLandingPage from './FirstLandingPage';
import SecondLandingPart from './SecondLandingPart';
const LandingPageComponent = () => {
  return (
    <div className="flex flex-col h-full bg-[#FCF9EE] ">
      <div style={{ flexGrow: 0.6 }}>
        <FirstLandingPage />
      </div>
      <div className="flex-grow mt-30">
        <SecondLandingPart />
      </div>
    </div>
  );
};

export default LandingPageComponent;
