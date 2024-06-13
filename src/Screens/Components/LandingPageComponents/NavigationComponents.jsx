import React from 'react';
import NavHeaderComponent from './NavHeaderComponent';
import LandingPageComponent from './LandingPageComponent';

const NavigationComponents = () => {
  return (
    //  <div>
    //   <div className='w-full h-full flex flex-col'>
    //   <NavHeaderComponent/>
    // </div>
    // <div className="flex-grow">
    // <LandingPageComponent/>
    // </div>
    // </div>

    <div className="flex flex-col h-screen">
      <NavHeaderComponent />
      <div className="flex-grow">
        <LandingPageComponent />
      </div>
    </div>
  );
};

export default NavigationComponents;
