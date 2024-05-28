import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

const AddPageField = ({
  field,
  handleProperties,
  defaultValue: defaultValueProp,
}) => {
  const { title: label, type, options, id, styles } = field;
  const [defaultValue, setDefaultValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [tempOptions, setTempOptions] = useState(options);

  useEffect(() => {
    setDefaultValue('');
    setDefaultValue(defaultValueProp?.propertyValues?.[field.id] || '');
  }, [field, defaultValueProp]);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const clearSelection = () => {
    setTempOptions([...tempOptions, ...selectedOptions]);
    setSelectedOptions([]);
  };

  const toggleMultiSelect = () => setIsOpen((prev) => !prev);

  const handleOptionToggle = (optionValue) => {
    let alreadySelected = selectedOptions.filter((opt) => opt === optionValue);
    if (alreadySelected.length === 0) {
      setSelectedOptions([...selectedOptions, optionValue]);
      setTempOptions(tempOptions.filter((opt) => opt !== optionValue));
    } else {
      setSelectedOptions(
        selectedOptions.filter((value) => value !== optionValue),
      );
      setTempOptions([...tempOptions, optionValue]);
    }
  };

  return (
    <div className="w-full">
      <label className="block mb-2 mt-4 text-lg font-medium text-gray-900">
        {label}
      </label>
      <InputByType
        type={type}
        options={options}
        id={id}
        handleProperties={handleProperties}
        defaultValue={defaultValue}
        isOpen={isOpen}
        toggleOpen={toggleMultiSelect}
        selectedOptions={selectedOptions}
        clearSelection={clearSelection}
        handleOptionToggle={handleOptionToggle}
      />
    </div>
  );
};

const InputByType = ({
  type,
  options,
  id,
  handleProperties,
  defaultValue,
  isOpen,
  toggleOpen,
  selectedOptions,
  clearSelection,
  handleOptionToggle,
}) => {
  const [selectOptions, setSelectOptions] = useState([]);
  const [addOptionValue, setAddOptionValue] = useState('');
  useEffect(() => {
    if (type === 'add_option') {
      setSelectOptions(defaultValue);
    }
  }, [defaultValue]);
  switch (type) {
    case 'text':
      return (
        <input
          type="text"
          className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
          onChange={(e) => {
            let payload = {
              id: id,
              value: e.target.value,
            };
            handleProperties(payload);
          }}
          defaultValue={defaultValue}
        />
      );
    case 'radio': {
      return (
        <div>
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
                  onChange={(e) => {
                    let payload = {
                      id: id,
                      value: option,
                    };
                    handleProperties(payload);
                  }}
                  checked={defaultValue === option}
                />
                <span className="ml-2">{option}</span>
              </div>
            );
          })}
        </div>
      );
    }
    case 'multiselect': {
      return (
        <>
          <div
            className={`block w-full content-center py-2 px-4 ${selectedOptions.length === 0 ? 'text-[#A6A6A6]' : 'bg-[#E9F2EF]'} border border-gray-300 rounded-lg text-left relative ${
              isOpen ? 'bg-gray-100' : ''
            }`}
            onClick={() => toggleOpen()}
          >
            {selectedOptions.length === 0
              ? '-- Select --'
              : selectedOptions.map((option) => (
                  <span
                    key={option}
                    className="inline-block bg-[#FFFFFF] rounded-lg mr-1 px-2"
                  >
                    {option}
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
            <div className="top-full left-0 z-50 w-full bg-white border border-gray-300 shadow-md rounded-t-lg">
              <div className="p-2">
                {options?.map((option) => (
                  <div
                    key={option}
                    className={`items-center p-2 cursor-pointer hover:bg-gray-100 ${
                      selectedOptions.includes(option) ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => handleOptionToggle(option)}
                  >
                    <span>{option}</span>
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
        </>
      );
    }
    case 'add_option': {
      // This is for adding new options
      return (
        <>
          <ol className="list-decimal list-inside">
            {selectOptions &&
              selectOptions?.map((option, index) => {
                return (
                  <li className="ml-2 mb-1" key={index}>
                    {option}
                    <button
                      onClick={() => {
                        let payload = {
                          id: id,
                          value: selectOptions.filter((elm) => elm !== option),
                        };
                        handleProperties(payload);
                      }}
                    >
                      <MdDelete color="red" />
                    </button>
                  </li>
                );
              })}
          </ol>

          <input
            type="text"
            className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
            onChange={(e) => {
              setAddOptionValue(e.target.value);
            }}
            value={addOptionValue}
          />
          <button
            className="bg-[#227A60] text-[#fff] px-4 py-1 rounded-md mr-4 font-bold mt-2"
            onClick={() => {
              let payload = {
                id: id,
                value: [...selectOptions, addOptionValue],
              };
              handleProperties(payload);
              setAddOptionValue('');
            }}
          >
            Add
          </button>
        </>
      );
    }

    default:
      return <input type="text" />;
  }
};

export default AddPageField;
