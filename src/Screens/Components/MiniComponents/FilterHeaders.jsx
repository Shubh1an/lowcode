import React from 'react';

const FilterHeaders = ({
  index,
  filter,
  headers,
  conditions,
  onChange,
  onRemove,
}) => {
  const handleHeaderChange = (e) => {
    onChange(index, { ...filter, header: e.target.value });
  };

  const handleConditionChange = (e) => {
    onChange(index, { ...filter, condition: e.target.value });
  };

  const handleValueChange = (e) => {
    onChange(index, { ...filter, value: e.target.value });
  };

  return (
    <div className="mb-2 flex items-center">
      <select
        className="border p-2 mr-2"
        value={filter.header}
        onChange={handleHeaderChange}
      >
        <option value="">Select Header</option>
        {headers.map((header) => (
          <option key={header} value={header}>
            {header}
          </option>
        ))}
      </select>
      <select
        className="border p-2 mr-2"
        value={filter.condition}
        onChange={handleConditionChange}
      >
        <option value="">Select Condition</option>
        {conditions.map((condition) => (
          <option key={condition} value={condition}>
            {condition}
          </option>
        ))}
      </select>
      <input
        className="border p-2 mr-2"
        type="text"
        placeholder="Value"
        value={filter.value}
        onChange={handleValueChange}
      />
      <button
        className="bg-red-500 text-white px-2 py-1 rounded"
        onClick={() => onRemove(index)}
      >
        Remove
      </button>
    </div>
  );
};

export default FilterHeaders;
