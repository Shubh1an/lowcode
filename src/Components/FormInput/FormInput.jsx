import React, { useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { FaStar } from 'react-icons/fa';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import Switch from 'react-switch';
import { RxCross2 } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { LuFolderSearch } from 'react-icons/lu';
import SignatureCanvas from 'react-signature-canvas';
import { MdFileDownload, MdDelete } from 'react-icons/md';
import {
  FaMicrophone,
  FaStop,
  FaPlay,
  FaTrash,
  FaVolumeUp,
  FaPause,
} from 'react-icons/fa';

const FormInput = ({
  field,
  setActiveField,
  activePropertiesField,
  deleteProp = <></>,
  onchange = () => {},
  onUpload = (file) => {},
  fieldValue = {},
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
  console.log('field', field);
  const [file, setFile] = useState(null);
  const [tempOptions, setTempOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [name, seteName] = useState();

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
        defaultValue={
          defaultValue ||
          fieldValue?.data?.[propertyValues?.display_name]?.value ||
          ''
        }
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
  const [url, setUrl] = useState('');
  const links = ['Link 1', 'Link 2', 'Link 3'];
  const [isOpendropdown, setIsOpen] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [isLinkVisible, setIsLinkVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [color, setColor] = useState('#ff0000'); // Default color: red
  const [selectedFiles, setSelectedFiles] = useState([]);
  const label = 'Select File';
  const placeholder = 'Choose File';
  const fileType = '.pdf,.doc,.docx';
  const prefixText = 'Browser ';
  const selectionType = 'single'; // or "multiple" or "directory"

  const buttons = [
    {
      label: 'Solid',
      style: 'bg-blue-500 text-white',
      activeStyle: 'bg-blue-700',
    },
    {
      label: 'Outline',
      style: 'border border-gray-500 text-gray-500',
      activeStyle: 'bg-gray-200',
    },
    {
      label: 'Danger',
      style: 'bg-red-500 text-white',
      activeStyle: 'bg-red-700',
    },
    {
      label: 'Transparent',
      style: 'bg-transparent text-gray-500',
      activeStyle: 'bg-gray-100',
    },
  ];

  const handleFileChangeDrop = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
  };

  const handleTextChange = (e) => {
    const textColor = e.target.value;
    setColor(textColor);
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const toggleLinkVisibility = () => {
    setIsLinkVisible(!isLinkVisible);
  };

  const handleToggle = (checked) => {
    setIsToggled(checked);
  };
  const handleToggleButton = () => {
    setIsToggled(!isToggled);
  };

  // For microphone

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecorded, setIsRecorded] = useState(false);
  const timerRef = useRef(null);

  const handleRecordClick = () => {
    setIsRecording(true);
    setIsRecorded(false);
    setRecordingTime(0);
    // Start recording logic here...
    startTimer();
  };

  const handleStopClick = () => {
    setIsRecording(false);
    setIsRecorded(true);
    // Stop recording logic here...
    stopTimer();
  };

  const handleClearClick = () => {
    setIsRecorded(false);
    setRecordingTime(0);
    // Clear recording logic here...
  };

  const startTimer = () => {
    // Start a timer to count recording time
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleOpenScanner = () => {
    setIsScannerOpen(true);
  };

  const handleCloseScanner = () => {
    setIsScannerOpen(false);
  };

  //microphone------------>

  //Signature pad--------------------->

  const sigCanvas = useRef(null);

  const clear = () => {
    sigCanvas.current.clear();
  };

  const save = () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    console.log(dataURL);
  };

  //Signature pad--------------------->

  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds, milliseconds } = prevTime;
          milliseconds += 10;
          if (milliseconds >= 1000) {
            milliseconds = 0;
            seconds++;
            if (seconds === 60) {
              seconds = 0;
              minutes++;
              if (minutes === 60) {
                minutes = 0;
                hours++;
              }
            }
          }
          return { hours, minutes, seconds, milliseconds };
        });
      }, 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (unit) => (unit < 10 ? `0${unit}` : unit);
  const formatMilliseconds = (unit) => (unit < 100 ? `0${unit}` : unit);

  const reset = () => {
    setIsActive(false);
    setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  };
  // Timer--------------------------->

  // Chat------------->
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages([
        ...messages,
        { id: Date.now(), text: inputText, sender: 'user' },
      ]);
      setInputText('');
      // Simulate a reply from a bot or another user
      setTimeout(() => {
        setMessages([
          ...messages,
          { id: Date.now(), text: 'This is a dummy reply.', sender: 'bot' },
        ]);
      }, 500);
    }
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  const handleChangeForChat = (e) => {
    setInputText(e.target.value);
  };

  // Chat---------->

  console.log('type', type);
  console.log('Values', defaultValue);
  switch (type) {
    case 'Single Line':
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
          className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-full py-2 px-4"
          id={id}
          rows={rows}
          placeholder={defaultValue}
          onChange={onchange}
        />
      );
    case 'Description':
      return (
        <textarea
          className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-full py-2 px-4"
          id={id}
          rows={rows}
          placeholder={defaultValue}
          onChange={onchange}
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
          onChange={onchange}
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
          onChange={onchange}
        />
      );
    case 'Phone': {
      return (
        <input
          type="tel"
          className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-full py-2 px-4"
          onChange={onchange}
          placeholder={defaultValue}
          id={id}
        />
      );
    }
    case 'Unique ID':
      return (
        <input
          type="text"
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
          onChange={onchange}
          placeholder={defaultValue}
          id={id}
        />
      );
    case 'Date':
      return (
        <input
          type="date"
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
          defaultValue={defaultValue}
          id={id}
          onChange={onchange}
        />
      );
    case 'Time':
      return (
        <input
          type="time"
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
          id={id}
          value={defaultValue}
          onChange={onchange}
        />
      );
    case 'Date-Time':
      return (
        <input
          type="datetime-local"
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
          id={id}
          value={defaultValue}
          onChange={onchange}
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
    case 'Multi Select': {
      return (
        <div ref={dropdownRef} className="relative">
          <div
            className={`block w-full content-center py-2 px-4 ${selectedOptions.length === 0 ? 'text-[#A6A6A6]' : 'bg-[#E9F2EF]'} border border-gray-300 rounded-lg text-left relative ${
              isOpen ? ' bg-gray-100' : ''
            }`}
            onClick={() => toggleOpen()}
          >
            {selectedOptions.length === 0
              ? '-- Select --'
              : selectedOptions.map((option) => (
                  <span
                    key={option.value}
                    className="inline-block bg-[#FFFFFF] rounded-lg mr-1 px-2"
                  >
                    {option.label}
                    <button
                      className="ml-1 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionToggle(option);
                      }}
                    >
                      &#10005;
                    </button>
                  </span>
                ))}
          </div>
          {isOpen && (
            <div className="absolute top-full left-0 z-50 w-full bg-white border border-gray-300 shadow-md rounded-t-lg">
              <div className="p-2">
                {options?.map((option) => (
                  <div
                    key={option.value}
                    className={`items-center p-2 cursor-pointer hover:bg-gray-100 ${
                      selectedOptions.includes(option) ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => handleOptionToggle(option)}
                  >
                    <span>{option.label}</span>
                    {selectedOptions.includes(option) && (
                      <span className="ml-auto">✓</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end px-2 pb-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-200 mr-2"
                  onClick={clearSelection}
                >
                  Clear
                </button>
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-blue-500 text-white"
                  onClick={() => toggleOpen()}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
    case 'Drop Down':
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
    case 'Star Rating':
      let max = 5;
      return (
        <div className="flex flex-row space-x-4 border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4">
          {[...Array(max)].map((star, i) => {
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={i + 1}
                  style={{ display: 'none' }}
                />
                <FaStar
                  color={i < defaultValue ? '#ffc107' : '#e4e5e9'}
                  size={24}
                  style={{ cursor: 'pointer' }} // Change cursor to pointer to indicate clickability
                  className="star"
                  onClick={() => onchange({ target: { value: i + 1 } })}
                />
              </label>
            );
          })}
        </div>
      );
    case 'Button':
      return (
        <div className="">
          <button className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-[79px] py-2 px-4">
            Button
          </button>
        </div>
      );

    case 'Toggle':
      return (
        <div className="">
          <Switch
            onChange={handleToggle}
            checked={isToggled}
            onColor="#757575"
            offColor="#bdbdbd"
            handleDiameter={24}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={16}
            width={40}
          />
        </div>
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
              value={url}
              onChange={handleChange}
              pattern="https?://.+"
              required
            />
          </div>
        </div>
      );

    case 'Button close':
      return (
        <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none">
          <RxCross2 className="w-6 h-6 text-gray-600" />
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
            className={`border rounded-lg w-20 py-2 px-4 focus:outline-none transition-colors duration-300 ${
              isToggled
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

    case 'Link List':
      return (
        <button className="">
          {links.map((link, index) => (
            <div key={index} className="flex items-center">
              <CgProfile className="mr-2" /> {/* Icon */}
              <span className="hover:underline">{link}</span> {/* Link */}
            </div>
          ))}
        </button>
      );

    case 'Toggle Link':
      return (
        <div>
          <button
            className="text-blue-500 hover:underline focus:outline-none flex items-center"
            onClick={toggleLinkVisibility}
          >
            {isLinkVisible ? (
              <>
                <IoIosArrowDown className="mr-1" /> Hide Link
              </>
            ) : (
              <>
                <IoIosArrowForward className="mr-1" /> Show Link
              </>
            )}
          </button>
          {/* {isLinkVisible && (
        <a href="#" className="text-blue-500 underline">
          Your Link
        </a>
      )} */}
        </div>
      );

    case 'Button Groups':
      return (
        <div className="flex space-x-2">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded focus:outline-none transform transition-transform duration-100 ${button.style} active:${button.activeStyle} active:scale-95`}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      );

    case 'Color Input':
      return (
        <div className="p-4">
          <div className="flex items-center border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-full py-2 px-4">
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="mr-2 w-8 h-8 p-0 border-none cursor-pointer"
              style={{ backgroundColor: color }}
            />
            <input
              type="text"
              value={color}
              onChange={handleTextChange}
              className="w-full py-2 px-4 bg-[#E9F2EF] border-none outline-none"
            />
          </div>
        </div>
      );

    case 'File Button':
      return (
        <div>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }} // Hide the file input visually
            onChange={handleFileChange}
          />
          <button
            onClick={() => document.getElementById('fileInput').click()} // Click event triggers file input click
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Choose File
          </button>
        </div>
      );

    case 'File Dropzone':
      return (
        <div
          className="rounded-lg p-8 text-center border border-gray-300 w-full h-full"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            multiple
            className="hidden w-full h-full cursor-pointer"
            onChange={handleFileChangeDrop}
            id="fileInput"
          />
          <LuFolderSearch
            onClick={handleIconClick}
            className="text-gray-500 w-16 h-16 mx-auto mb-4 cursor-pointer"
          />
          <div className="mt-4">
            <p>Select and drag and drop</p>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        </div>
      );

    case 'File Input':
      return (
        <div className="flex flex-col space-y-2 cursor-pointer">
          <div
            className="border border-gray-300 rounded-lg flex items-center bg-gray-200 cursor-pointer"
            onClick={handleIconClick}
          >
            <div className="flex items-center space-x-2 ">
              {prefixText && <span className="bg-gray-200">{prefixText}</span>}
              <LuFolderSearch className="text-gray-500 w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder={selectedFiles.length > 0 ? '' : placeholder}
              value={selectedFiles.length > 0 ? selectedFiles[0].name : ''}
              readOnly
              className="w-full outline-none px-2 py-1 placeholder-gray-400"
            />
            <input
              type="file"
              id="fileInput"
              accept={fileType}
              className="hidden"
              onChange={handleFileChangeDrop}
            />
          </div>
        </div>
      );

    case 'Microphone':
      return (
        <div className="flex flex-col items-center space-y-4">
          {!isRecorded && !isRecording && (
            <button
              onClick={handleRecordClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <FaMicrophone />
              <span>Record</span>
            </button>
          )}

          {isRecording && (
            <button
              onClick={handleStopClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <FaStop />
              <span>Stop</span>
              <span>{recordingTime}s</span>
            </button>
          )}

          {isRecorded && !isRecording && (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleClearClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Clear
              </button>
              <FaPlay className="text-gray-700 w-6 h-6" />
              <span>{recordingTime}s</span>
              <div className="relative w-32 h-2 bg-gray-300 rounded">
                <div
                  className="absolute left-0 top-0 h-full bg-blue-500"
                  style={{ width: `${(recordingTime / 60) * 100}%` }}
                ></div>
              </div>
              <FaVolumeUp className="text-gray-700 w-6 h-6" />
            </div>
          )}
        </div>
      );

    case 'Scanner':
      return (
        <div className="p-8">
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleOpenScanner}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Launch Scanner
            </button>

            {isScannerOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <p className="mb-4">Scanner is open</p>
                  <button
                    onClick={handleCloseScanner}
                    className="bg-white text-blue-500 px-4 py-2 border border-blue-500 rounded-lg"
                  >
                    Close Scanner
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );

    case 'Signature':
      return (
        <div className="flex flex-col items-center p-4">
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width: 500,
              height: 200,
              className: 'border border-gray-300 rounded-lg',
            }}
            ref={sigCanvas}
          />
          <div className="mt-4">
            <button
              onClick={clear}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
            >
              Clear
            </button>
            <button
              onClick={save}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      );

    case 'Timer':
      return (
        <div className="flex flex-col items-center p-4">
          <div className="text-3xl font-mono">
            {formatTime(time.hours)}:{formatTime(time.minutes)}:
            {formatTime(time.seconds)}.{formatMilliseconds(time.milliseconds)}
          </div>
          <div className="mt-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`px-4 py-2 rounded ${isActive ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white`}
            >
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={reset}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-700"
            >
              Reset
            </button>
          </div>
        </div>
      );

    case 'Chat':
      return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex justify-between items-center bg-gray-200 px-4 py-2">
            <h2 className="text-lg font-semibold">Chat</h2>
            <div className="flex">
              <MdFileDownload
                className="text-gray-600 mr-4 cursor-pointer"
                onClick={() => console.log('Download')}
              />
              <MdDelete
                className="text-gray-600 cursor-pointer"
                onClick={() => console.log('Delete')}
              />
            </div>
          </div>
          <div className="h-64 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span className="bg-gray-200 rounded-lg p-2">
                  {message.text}
                </span>
                {message.sender === 'user' && (
                  <MdDelete
                    className="ml-2 text-xs text-gray-500 hover:text-red-600 focus:outline-none cursor-pointer"
                    onClick={() => handleDeleteMessage(message.id)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center p-4 border-t">
            <input
              type="text"
              value={inputText}
              onChange={handleChangeForChat}
              placeholder="Type a message..."
              className="w-full mr-2 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              Send
            </button>
          </div>
        </div>
      );

    case 'Annotation Text':
      return (
        <div className="max-w-md mx-auto">
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            <span className="annotation">
              [Note: This is a sample annotation.]
            </span>
          </p>
        </div>
      );

    default:
      return <input type="text" />;
  }
};

export default FormInput;
