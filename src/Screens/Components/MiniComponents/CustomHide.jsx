// CustomHide.jsx
import React, { useState } from 'react';
const CustomHide = ({
  initialComponent,
  headers,
  hiddenHeaders,
  setHiddenHeaders,
}) => {
  const [showHideOptions, setShowHideOptions] = useState(false);

  const toggleShowHideOptions = () => {
    setShowHideOptions(!showHideOptions);
  };

  const handleSelectChange = (header) => {
    const isHidden = hiddenHeaders.includes(header);
    setHiddenHeaders((prevHiddenHeaders) => {
      if (isHidden) {
        return prevHiddenHeaders.filter((h) => h !== header);
      } else {
        return [...prevHiddenHeaders, header];
      }
    });
  };

  return (
    <div className="relative inline-block">
      <div onClick={toggleShowHideOptions}>{initialComponent}</div>
      {showHideOptions && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl">
          {headers.map((header) => (
            <div key={header} className="px-4 py-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={!hiddenHeaders.includes(header)}
                  onChange={() => handleSelectChange(header)}
                />
                <span className="ml-2">{header}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomHide;
