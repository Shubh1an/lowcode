import React from 'react';

const OverviewCard = ({ title, value }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-2xl mt-2">{value}</p>
    </div>
  );
};

export default OverviewCard;
