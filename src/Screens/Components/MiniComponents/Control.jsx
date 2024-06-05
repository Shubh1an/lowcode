import React, { useEffect, useState } from 'react'
import CustomSelect from './CustomSelect';
import { getPageDetails, getPages } from '../../../Requests/page';
import { getFillData } from '../../../Requests/fillData';

const Control = ({ label, value, setValue, index, options = [], links, field }) => {
  const handleValue = (field) => {
    setValue((prev) => {
      let newValue = [...prev];

      newValue[index] = {
        ...newValue[index],
        value: field,
      };
      return newValue;
    });
  };
  const [inputValue, setInputValue] = useState('');
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    setInputValue(value[index]?.value);
  }, [value]);
  //   const option = [
  //     { value: 'opt', label: 'Option 1' },
  //     { value: 'opt', label: 'Option 2' },
  //     { value: 'opt', label: 'Option 3' },
  //   ];
  const handleToggle = (checked) => {
    setIsToggled(checked);
  };
  const handleToggleButton = () => {
    setIsToggled(!isToggled);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpendropdown, setIsOpendropdown] = useState(false);

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setIsOpen(false); // Close the dropdown after selecting an option
  };
  switch (label) {
    case 'section':
      return (
        <div className="w-full min-h-[100px] border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF]"></div>
      );
    case 'single_line':
      return (
        <input
          type="text"
          className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm"
          onChange={(e) => handleValue(e.target.value)}
          value={inputValue}
        />
      );
    case 'dropdown':
      return (
        <select
          className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm p-2 text-sm"
          onChange={(e) => handleValue(e.target.value)}
          value={inputValue}
        >
          {
            options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))
          }
        </select>
      );
    case 'Image Upload': {
      return (
        <input
          type="file"
          className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm p-2 text-sm"
          onChange={(e) => handleValue(e.target.value)}
          value={inputValue}
          accept="image/png, image/jpeg"
        />
      );
    }
    case 'File Upload': {
      return (
        <div>
          <input
            type="file"
            className="block w-full border border-gray-400 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-blue-500"
            onChange={(e) => handleValue(e.target.value)}
            value={inputValue}
            accept=".pdf,.doc,.docx"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Upload
          </button>
        </div>
      );
    }
    case 'Description':
      return (
        <textarea
          className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm p-2 text-sm"
          onChange={(e) => handleValue(e.target.value)}
          value={inputValue}
        />
      );
    case 'Number':
      return (
        <input
          type="number"
          className="border border-[#E9E9E9] rounded-lg bg-[#FFFFFF] w-full py-2 px-4"
          onChange={(e) => handleValue(e.target.value)}
          value={inputValue}
        />
      );
    case 'Name':
      return (
        <input
          type="text"
          className="border border-[#E9E9E9] rounded-lg bg-[#FFFFFF] w-full py-2 px-4"
          onChange={(e) => handleValue(e.target.value)}
          value={inputValue}
        />
      );
    case 'Email':
      return (
        <input
          type="email"
          className="border border-[#E9E9E9] rounded-lg bg-[#FFFFFF] w-full py-2 px-4"
          onChange={(e) => handleValue(e.target.value)}
          value={inputValue}
        />
      );
    case 'Address':
      return (
        <textarea
          className="border border-[#E9E9E9] rounded-lg bg-[#FFFFFF] w-full py-2 px-4"
          onChange={(e) => handleValue(e.target.value)}
          value={inputValue}
        />
      );
    case 'Phone': {
      return (
        <input
          type="tel"
          className="border border-[#E9E9E9] rounded-lg bg-[#FFFFFF] w-full py-2 px-4"
          onChange={(e) => handleValue(e.target.value)}
          value={inputValue}
        />
      );
    }
    case 'Unique_ID':
      return (
        <input
          type="text"
          className="border border-[#E9E9E9] rounded-lg	bg-[#FFFFFF] w-full py-2 px-4"
          onChange={(e) => handleValue(e.target.value)}
          value={inputValue}
        />
      );
    case 'Date':
      return (
        <input
          type="date"
          className="border border-[#E9E9E9] rounded-lg	bg-[#FFFFFF] w-full py-2 px-4"
          onChange={(e) => handleValue(e.target.value)}
          value={inputValue}
        />
      );
    case 'Time':
      return (
        <input
          type="time"
          className="border border-[#E9E9E9] rounded-lg	bg-[#FFFFFF] w-full py-2 px-4"
          onChange={(e) => handleValue(e.target.value)}
          value={inputValue}
        />
      );
    case 'Date-Time':
      return (
        <input
          type="datetime-local"
          className="border border-[#E9E9E9] rounded-lg	bg-[#FFFFFF] w-full py-2 px-4"
        />
      );
    case 'Radio':
      return (
        <input
          type="radio"
          className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm p-2 text-sm"
        />

        // <div className="flex flex-row space-x-4 border border-[#E9E9E9] rounded-lg	bg-[#FFFFFF] w-full py-2 px-4">
        //   {option.map((options, index) => {
        //     return (
        //       <div
        //         className="flex flex-row items-center justify-start "
        //         key={index}
        //       >
        //         <input
        //           type="radio"
        //           className="border border-[#E9E9E9] rounded-lg bg-[#FFFFFF] w-4 h-4"
        //         />
        //         <span className="ml-2">{options.label}</span>
        //       </div>
        //     );
        //   })}
        // </div>
      );
    case 'Checkbox':
      return (
        // <div className="flex flex-row items-center justify-start border border-[#E9E9E9] rounded-lg	bg-[#FFFFFF] w-full py-2 px-4 ">
        //   {option.map((options, index) => {
        //     return (
        //         <div
        //           className="flex flex-row items-center justify-start "
        //           key={index}
        //         >
        //           <input
        //             type="checkbox"
        //             className="border border-[#E9E9E9] rounded-lg bg-[#FFFFFF] w-4 h-4"
        //           />
        //           <span className="ml-2 me-2">{options.value}</span>
        //         </div>
        //     );
        //   })}
        // </div>
        <input
          type="checkbox"
          className="border border-[#E9E9E9] rounded-lg bg-[#FFFFFF] w-4 h-4"
        />
      );
    case 'Star-Rating':
      return (
        <div className="star-rating border border-[#E9E9E9] rounded-lg bg-[#FFFFFF] w-4 h-4 flex felx-raw">
          <input type="radio" />
          <input type="radio" />
          <input type="radio" />
          <input type="radio" />
          <input type="radio" />
        </div>
      );
    case 'Avatar': {
      return (
        <input
          type="image"
          alt="submit"
          src=""
          className="border border-[#E9E9E9] rounded-lg	bg-[#FFFFFF] w-full py-2 px-4"
        />
      );
    }
    case 'Circular Image': {
      return (
        <input
          type="image"
          alt="Submit"
          className="border border-[#E9E9E9] rounded-lg	bg-[#FFFFFF] w-full py-2 px-4"
        />
      );
    }
    case 'Icon': {
      return (
        <i className="border border-[#E9E9E9] rounded-lg bg-[#FFFFFF] w-full py-2 px-4 "></i>
        // <input
        //   type="file"
        //   className="border border-[#E9E9E9] rounded-lg bg-[#FFFFFF] w-4 h-4"
        // />
        // &#8986;
      );
    }
    case 'Button':
      return (
        <div className="">
          <button className="border border-[#E9E9E9] rounded-lg bg-[#FFFFFF] w-[79px] py-2 px-4">
            Button
          </button>
        </div>
      );
    case 'Toggle':
      return (
        <div
          className=" onChange={handleToggle}
        checked={isToggled} 
      "
        ></div>
      );
    case 'URL':
      return (
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            URL:
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
              https://
            </span>
            <input
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-18"
              style={{ paddingLeft: '65px' }}
              type="text"
              placeholder=""
              // value={url}
              // onChange={handleChange}
              pattern="https?://.+"
              required
            />
          </div>
        </div>
      );
    case 'Close Button':
      return (
        <button
          className="close-button"
          aria-label="Close alert"
          type="button"
          data-close
        >
          <span aria-hidden="true">&times;</span>
        </button>
      );
    case 'Button Dropdown':
      return (
        <div className="flex flex-col">
          <button
            onClick={() => setIsOpen(!isOpendropdown)}
            className="border border-gray-300 rounded-lg bg-gray-100 w-32 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedOption || 'Option'}
          </button>
          {isOpendropdown && (
            <div className="mt-1 w-32 bg-white shadow-lg rounded-md">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.label)}
                  className="block w-full py-2 px-4 text-left hover:bg-gray-100 focus:outline-none"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    case 'Toggle Button':
      return (
        <div className="">
          <button
            className={`border rounded-lg w-20 py-2 px-4 focus:outline-none transition-colors duration-300 ${isToggled
              ? 'bg-green-500 border-green-500'
              : 'bg-gray-300 border-gray-300'
              }`}
            onClick={handleToggleButton}
          >
            {isToggled ? 'ON' : 'OFF'}
          </button>
        </div>
      );
    case 'Link':
      return <button className="text-blue-500 hover:underline">Link</button>;

    case 'lookup':
      let entityType = field?.properties?.entityType?.value
      let entity = field?.properties?.entity?.value
      let entityColumn = field?.properties?.entityColumn?.value


      const [entityData, setEntityData] = useState([])
      useEffect(() => {
        if (entity) {
          getPages(entity).then((res) => {
            let default_add = res?.data?.find((page) => {
              if (page?.type === "default_add") {
                return page
              }
            })?._id
            getFillData(default_add).then((data) => {
              // setEntityData(data?.data.map((entity) => {
              //   return entity?.form_data.map((data) => {
              //     if (data?.key === entityColumn) {
              //       return {
              //         label: data?.value, value: entity._id
              //       }
              //     }
              //   })
              // }))

              let entityData = []

              data?.data?.map((entity) => {
                entity?.form_data?.map((data) => {
                  if (data?.key === entityColumn) {
                    entityData.push({
                      label: data?.value, value: entity._id
                    })
                  }
                })
              })
              setEntityData(entityData)
            })
          }).catch((err) => {
            console.log(err)
          })
        }
      }, [])

      useEffect(() => {
      }, [entityData])

      if (!entity) {
        return <div
          className="border border-[#E9E9E9] rounded-lg bg-[#FFFFFF] w-full py-2 px-4"
        >Lookup</div>
      }
      console.log(entityType, entity, entityColumn)

      return <div>
        {entityType && entity && <CustomSelect options={entityData} setValue={setInputValue} />}
      </div>;
    default:
      return null;
  }
};

export default Control;
