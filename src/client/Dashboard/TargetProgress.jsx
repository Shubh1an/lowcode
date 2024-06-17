import React from 'react';
import Graph from './Graph';

const TargetProgress = () => {
  const data = [
    { label: 'Calls', value: 60, color: 'bg-teal-700' },
    { label: 'Email', value: 30, color: 'bg-green-500' },
    { label: 'Sales', value: 30, color: 'bg-green-300' },
    { label: 'Calls', value: 30, color: 'bg-yellow-400' },
    { label: 'Email', value: 30, color: 'bg-yellow-300' },
    { label: 'Sales', value: 10, color: 'bg-yellow-200' },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Target Progress</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Last 30 Days</span>
        </div>
      </div>
      {data.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <span className="w-1/4 text-sm text-gray-700">{item.label}</span>
          <div className="w-3/4 flex items-center">
            <div
              className={`h-8 rounded ${item.color}`}
              style={{ width: `${item.value}%` }}
            >
              <span className="text-xs text-white ml-2">{item.value}%</span>
            </div>
            <span className="ml-2 text-xs text-gray-500">100%</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default TargetProgress;
