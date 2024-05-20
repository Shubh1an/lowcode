import React from 'react';

export default function CustomInput({ inputs, onChange }) {
  return (
    <div className="flex flex-col space-y-4 p-3">
      <label className="block mb-2 mt-4 text-lg font-medium text-gray-900 font-bold">
        {inputs.title}
      </label>
      <input
        onChange={onChange}
        key={inputs.id}
        type={inputs.type}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
}
