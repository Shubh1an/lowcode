import React, { useState } from 'react';

function ViewKanban({ options, setoption }) {
  const [defaultValue, setDefaultValue] = useState('');

  const handleProperties = (value) => {
    setDefaultValue(value);
  };
  return (
    <div className="w-1/3 h-full bg-[#fff] rounded-2xl flex flex-col">
      <div className="flex flex-col space-y-1 p-2">
        <label className="block mb-2 mt-2 text-lg font-medium text-gray-900 font-bold">
          Kanban Name
        </label>
        <input
          type="text"
          placeholder="kanban name"
          onChange={(event) => handleProperties(event.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col space-y-1 p-2">
        <label className="block mb-2 mt-2 text-lg font-medium text-gray-900 font-bold">
          Column Name
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
export default ViewKanban;
