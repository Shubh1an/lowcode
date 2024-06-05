import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../Context/Context';

const CustomTopLoader = () => {
  const { isLoading } = useContext(GlobalContext);

  useEffect(() => {
    // console.log(isLoading);
  }, []);

  return (
    <div className="">
      {isLoading && (
        <div
          id="progress"
          className="fixed top-0 left-0 animate-refine-slide h-1 z-50 bg-black"
        >
          <div className="bg-black-400 w-full h-full "></div>
        </div>
      )}
    </div>
  );
};

export default CustomTopLoader;
