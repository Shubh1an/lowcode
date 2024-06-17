import React, { useState, useEffect } from 'react';
import tickCircle from '../../assets/tick-circle.svg'; // Import the image

const Toast = ({ message, showToast, setShowToast }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(showToast);
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 6000); // Adjust the timeout as per your requirement
    }
  }, [showToast, setShowToast]);

  return (
    <>
      {isVisible && (
        <div
          style={{
            backgroundColor: '#DDF2DD',
            borderRadius: '20px',
            width: '306px',
            height: '50px',
          }}
          className="fixed top-1 left-1/2 transform -translate-x-1/2 bg-DDF2DD border-2 border-green-500 rounded-md flex items-center justify-between p-4"
        >
          <img src={tickCircle} alt="tick icon" className="h-35 w-35 mr-2" />{' '}
          {/* Image */}
          <p className="text-lg text-gray-800">{message}</p>
          <button
            onClick={() => setShowToast(false)}
            className="text-white hover:text-gray-200 focus:outline-none"
          ></button>
        </div>
      )}
    </>
  );
};

export default Toast;
