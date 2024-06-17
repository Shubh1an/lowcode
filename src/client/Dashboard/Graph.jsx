// src/components/Graph.js
import React from 'react';

const data = [
  { label: 'Calls', value: 60, color: 'bg-teal-700' },
  { label: 'Email', value: 30, color: 'bg-green-500' },
  { label: 'Sales', value: 30, color: 'bg-green-300' },
  { label: 'Calls', value: 30, color: 'bg-yellow-400' },
  { label: 'Email', value: 30, color: 'bg-yellow-300' },
  { label: 'Sales', value: 10, color: 'bg-yellow-200' },
];

const Graph = () => {
  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Target Progress</h2>
          <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded">
            Hug x Hug
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Last 30 Days</span>
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-4 18a9 9 0 100-18 9 9 0 000 18z"
            />
          </svg>
        </div>
      </div>
      {data.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <span className="w-1/4 text-sm text-gray-700">{item.label}</span>
          <div className="w-3/4 flex items-center">
            <div
              className={`h-4 rounded ${item.color}`}
              style={{ width: `${item.value}%` }}
            >
              <span className="text-xs text-white ml-2">{item.value}%</span>
            </div>
            <span className="ml-2 text-xs text-gray-500">100%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Graph;
