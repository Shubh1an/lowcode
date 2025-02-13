import React, { useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

const FormInput = ({
  field,
  setActiveField,
  activePropertiesField,
  deleteProp = <></>,
  onchange = () => {},
  onUpload = (file) => {},
}) => {
  const {
    title: label,
    inputType: type,
    options = [
      { value: 'opt', label: 'Option 1' },
      { value: 'opt', label: 'Option 2' },
      { value: 'opt', label: 'Option 3' },
    ],
    id,
    defaultValue,
    rows,
    propertyValues,
    extrClass = '',
    labelClass = '',
    index,
  } = field;

  const [file, setFile] = useState(null);
  const [tempOptions, setTempOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [name, seteName] = useState();

  useEffect(() => {
    console.log('propertyValues:', propertyValues);
  }, [propertyValues]);

  const clearSelection = () => {
    setTempOptions([...tempOptions, ...selectedOptions]);
    setSelectedOptions([]);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleChange = (e) => {
    seteName(e.target.value);
  };

  const toggleMultiSelect = () => setIsOpen((prev) => !prev);

  const handleUpload = () => {
    onUpload(file);
    setFile(null);
  };

  const handleOptionToggle = (optionValue) => {
    let alreadySelected = selectedOptions.filter(
      (opt) => opt.value === optionValue.value,
    );
    if (alreadySelected.length === 0) {
      setSelectedOptions([...selectedOptions, optionValue]);
      setTempOptions(
        tempOptions.filter((opt) => opt.value !== optionValue.value),
      );
    } else {
      setSelectedOptions(
        selectedOptions.filter((value) => value !== optionValue),
      );
      setTempOptions([...tempOptions, optionValue]);
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <div className={`w-full flex flex-row items-center`}>
        <label
          className={`block mb-2 mt-4 text-lg font-medium cursor-pointer ${activePropertiesField === id ? 'text-[#227A60] font-bold underline' : 'text-gray-900 font-bold '}`}
          onClick={() => setActiveField(id)}
        >
          {propertyValues?.display_name || label}
        </label>
        <div className="ml-auto cursor-pointer justify-self-end">
          {deleteProp}
        </div>
      </div>
      <InputByType
        onchange={onchange}
        type={type}
        options={options}
        id={id}
        defaultValue={defaultValue}
        rows={rows}
        isOpen={isOpen}
        toggleOpen={toggleMultiSelect}
        selectedOptions={selectedOptions}
        clearSelection={clearSelection}
        handleOptionToggle={handleOptionToggle}
        dropdownRef={dropdownRef}
        extrClass={extrClass}
        file={file}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
      />
    </div>
  );
};

const InputByType = ({
  type,
  options,
  id,
  defaultValue,
  rows,
  isOpen,
  toggleOpen,
  selectedOptions,
  clearSelection,
  handleOptionToggle,
  dropdownRef,
  extrClass,
  file,
  onchange,
  handleFileChange,
  handleUpload,
}) => {
  console.log('check ---->', options);
  switch (type) {
    case 'Single Line1':
      return (
        <input
          type="text"
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
          onChange={onchange}
          placeholder={defaultValue}
        />
      );
    case 'Multi Line':
      return (
        <textarea
          className="border border-[#BDD7CF] rounded-lg w-full py-2 px-4 bg-white"
          id={id}
          rows={rows}
          placeholder={defaultValue}
        />
      );
    case 'Description':
      return (
        <textarea
          className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-full py-2 px-4"
          id={id}
          rows={rows}
          placeholder={defaultValue}
        />
      );
    case 'Number':
      return (
        <input
          type="number"
          className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-full py-2 px-4"
          onChange={onchange}
          placeholder={defaultValue}
        />
      );
    case 'Name':
      return (
        <input
          type="text"
          className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-full py-2 px-4"
          placeholder={defaultValue}
        />
      );
    case 'Email':
      return (
        <input
          type="email"
          className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-full py-2 px-4"
          onChange={onchange}
          placeholder={defaultValue}
        />
      );
    case 'Address':
      return (
        <textarea
          className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-full py-2 px-4"
          id={id}
          rows={rows}
          placeholder={defaultValue}
        />
      );
    case 'Phone': {
      return (
        <input
          type="tel"
          className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-full py-2 px-4"
        />
      );
    }
    case 'Unique ID':
      return (
        <input
          type="text"
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
          onChange={onchange}
        />
      );
    case 'Date':
      return (
        <input
          type="date"
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
          defaultValue={defaultValue}
        />
      );
    case 'Time':
      return (
        <input
          type="time"
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
          id={id}
          value={defaultValue}
        />
      );
    case 'Date-Time':
      return (
        <input
          type="datetime-local"
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
          id={id}
        />
      );
    case 'Dropdown':
      return (
        <select
          value={options.value}
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
        >
          {options.map((option) => (
            <option value={option.value}>{options.label}</option>
          ))}
        </select>
      );

    case 'Radio':
      return (
        <div className="flex flex-row space-x-4 border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4">
          {options.map((option, index) => {
            return (
              <div
                className="flex flex-row items-center justify-start "
                key={index}
              >
                <input
                  type="radio"
                  className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-4 h-4"
                  name={id}
                />
                <span className="ml-2">{option.label}</span>
              </div>
            );
          })}
        </div>
      );
    case 'CheckBox':
      return (
        <div className="flex flex-row items-center justify-start border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4 ">
          {options.map((option, index) => {
            return (
              <div
                className="flex flex-row items-center justify-start "
                key={index}
              >
                <input
                  type="checkbox"
                  className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-4 h-4"
                  name={id}
                />
                <span className="ml-2 me-2">{option.value}</span>
              </div>
            );
          })}
        </div>
      );
    case 'File Upload': {
      return (
        <div>
          <input
            type="file"
            className="block w-full border border-gray-400 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-blue-500"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleUpload}
            disabled={!file}
          >
            Upload
          </button>
        </div>
      );
    }
    case 'Image Upload': {
      return (
        <input
          type="file"
          className=" border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
          accept="image/png, image/jpeg"
        />
      );
    }
    // case 'Single Line': {
    //   return (
    //     <div ref={dropdownRef} className="relative">
    //       <div
    //         className={`block w-full content-center py-2 px-4 ${selectedOptions.length === 0 ? 'text-[#A6A6A6]' : 'bg-[#E9F2EF]'} border border-gray-300 rounded-lg text-left relative ${
    //           isOpen ? ' bg-gray-100' : ''
    //         }`}
    //         onClick={() => toggleOpen()}
    //       >
    //         {selectedOptions.length === 0
    //           ? '-- Select --'
    //           : selectedOptions.map((option) => (
    //               <span
    //                 key={option.value}
    //                 className="inline-block bg-[#FFFFFF] rounded-lg mr-1 px-2"
    //               >
    //                 {option.label}
    //                 <button
    //                   className="ml-1 focus:outline-none"
    //                   onClick={(e) => {
    //                     e.stopPropagation();
    //                     handleOptionToggle(option);
    //                   }}
    //                 >
    //                   &#10005;
    //                 </button>
    //               </span>
    //             ))}
    //       </div>
    //       {isOpen && (
    //         <div className="absolute top-full left-0 z-50 w-full bg-white border border-gray-300 shadow-md rounded-t-lg">
    //           <div className="p-2">
    //             {options?.map((option) => (
    //               <div
    //                 key={option.value}
    //                 className={`items-center p-2 cursor-pointer hover:bg-gray-100 ${
    //                   selectedOptions.includes(option) ? 'bg-gray-200' : ''
    //                 }`}
    //                 onClick={() => handleOptionToggle(option)}
    //               >
    //                 <span>{option.label}</span>
    //                 {selectedOptions.includes(option) && (
    //                   <span className="ml-auto">✓</span>
    //                 )}
    //               </div>
    //             ))}
    //           </div>
    //           <div className="flex justify-end px-2 pb-2">
    //             <button
    //               className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-200 mr-2"
    //               onClick={clearSelection}
    //             >
    //               Clear
    //             </button>
    //             <button
    //               className="px-4 py-2 border border-gray-300 rounded-lg bg-blue-500 text-white"
    //               onClick={() => toggleOpen()}
    //             >
    //               Done
    //             </button>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   );
    // }
    case 'Dropdown':
      return (
        <select
          value={options.value}
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
        >
          {options.map((options) => (
            <option value={options.value}>{options.label}</option>
          ))}
        </select>
      );
    case 'Radio':
      return (
        <div className="flex flex-row space-x-4 border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4">
          {options.map((option, index) => {
            console.log('Rendering radio option:', option.label);
            return (
              <div
                className="flex flex-row items-center justify-start "
                key={index}
              >
                <input
                  type="radio"
                  className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-4 h-4"
                  name={id}
                />
                <span className="ml-2">{option.label}</span>
              </div>
            );
          })}
        </div>
      );
    case 'Alert': {
      return (
        <input
          type="text"
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
        />
      );
    }
    case 'Avatar': {
      return (
        <input
          type="image"
          alt="submit"
          src=""
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
        />
      );
    }
    case 'Circular Image': {
      return (
        <input
          type="image"
          alt="Submit"
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
        />
      );
    }
    case 'Divider': {
      return (
        <input
          type="text"
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
        />
      );
    }
    case 'Icon': {
      return (
        <i className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4" />
      );
    }

    default:
      return <input type="text" />;
  }
};

export default FormInput;
