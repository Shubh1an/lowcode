import React from 'react';

const Search = ({ title, handleHeaderSelect, checked }) => {
  return (
    <div className="">
      <input
        type="checkbox"
        className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-4 h-4"
        name={title}
        onChange={(e) => {
          handleHeaderSelect(title, e.target.checked);
        }}
        checked={checked}
      />
      <label className="ml-2">{title}</label>
    </div>
  );
};

const SearchHeaders = ({ headersArray, handleSelect, searchableHeaders }) => {
  return (
    <div className="w-[300px]">
      <div className="">Fields</div>
      <div className="w-full h-[1px] bg-[#E9E9E9]" />
      {headersArray.map((header, index) => {
        let checked = searchableHeaders.includes(header);
        return (
          <Search
            key={index}
            title={header}
            handleHeaderSelect={handleSelect}
            checked={checked}
          />
        );
      })}
    </div>
  );
};
export default SearchHeaders;
