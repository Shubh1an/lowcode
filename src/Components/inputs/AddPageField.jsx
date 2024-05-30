import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

const AddPageField = ({
  field,
  handleProperties,
  defaultValue: defaultValueProp,
}) => {
  const { title: label, type, options, id, styles } = field;
  const [defaultValue, setDefaultValue] = useState('');
  useEffect(() => {
    setDefaultValue('');
    setDefaultValue(defaultValueProp?.propertyValues?.[field.id] || '');
  }, [field, defaultValueProp]);

  console.log('styles>>>>>>>>>', field);

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
      />
    </div>
  );
};

const InputByType = ({ type, options, id, handleProperties, defaultValue }) => {
  const [selectOptions, setSelectOptions] = useState([]);
  const [addOptionValue, setAddOptionValue] = useState({});
  useEffect(() => {
    if (type === 'add_option') {
      console.log('addOptionValue', addOptionValue);
      console.log('defaultValue', defaultValue);
      console.log('id', id);
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

    case 'add_option': {
      // This is for adding new options
      return (
        <>
          <ol className="list-decimal list-inside">
            {selectOptions &&
              selectOptions?.map((option, index) => {
                return (
                  <li className="ml-2 mb-1" key={index}>
                    {option.label}
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
              setAddOptionValue({
                label: e.target.value,
                value: e.target.value,
              });
            }}
            value={addOptionValue?.label || ''}
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
