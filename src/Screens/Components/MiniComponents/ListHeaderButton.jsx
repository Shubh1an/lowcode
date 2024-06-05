import React from 'react';

const ListHeaderButton = ({
  icon,
  label,
  onclick = () => {},
  extraClass = '',
}) => {
  return (
    <>
      <button
        onClick={onclick}
        className={`${extraClass} bg-[#FCF9EE] text-[#212121] px-1 py-1 rounded-md mx-1 font-bold flex items-center min-w-[80px] justify-center`}
      >
        {icon}
        <p className="mx-1 font-semibold text-base">{label}</p>
      </button>
    </>
  );
};

export default ListHeaderButton;
