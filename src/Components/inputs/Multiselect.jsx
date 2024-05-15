import React, { useState } from 'react';

export default function Multiselect({ inputs, onChange }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    { id: 1, content: 'Task 1', status: 'Todo' },
    { id: 2, content: 'Task 2', status: 'Todo' },
    { id: 3, content: 'Task 3', status: 'Inprogress' },
    { id: 4, content: 'Task 4', status: 'Done' },
  ];

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-3">
      <label className="block mb-2 mt-4 text-lg font-medium text-gray-900 font-bold">
        {inputs.title}
      </label>
      {options.map((option) => (
        <div
          key={option.id}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        >
          <input
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={onChange}
            className="mr-2"
          />
          <span>{option.content}</span>
        </div>
      ))}

      {/* <div className="mt-4">
      <p>Selected Options</p>
      <ul>
        {selectedOptions.map((option) => (
          <li key={option.id}>{option.content}</li>
        ))}
      </ul>
    </div> */}
    </div>
  );
}
