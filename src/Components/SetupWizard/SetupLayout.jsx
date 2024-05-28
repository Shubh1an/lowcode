import React from 'react';
const SetupLayout = ({ children, stepUpImg }) => {
  // Validation schema using Yup
  return (
    <div className="w-full h-[100vh] bg-[#FCF9EE] flex flex-row">
      <div className="flex">
        <div className="w-[100%] flex justify-center items-center">
          {stepUpImg}
        </div>
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default SetupLayout;
