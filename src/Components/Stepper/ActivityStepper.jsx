import React from 'react';

const ActivityStepper = ({ message }) => {
  const { sender, content, timestamp } = message;
  return (
    <li className="py-4">
      <div className="flex space-x-3">
        <img
          className="h-6 w-6 rounded-full"
          src={sender.avatar}
          alt={`${sender.name} avatar`}
        />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{sender.name}</h3>
            <p className="text-sm text-gray-500">{timestamp}</p>
          </div>
          <p className="text-sm text-gray-900">{content}</p>
        </div>
      </div>
    </li>
  );
};

export default ActivityStepper;
