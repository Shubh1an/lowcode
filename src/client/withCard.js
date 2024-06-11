import React from 'react';

const withCard = (WrappedComponent) => {
  return (props) => (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <WrappedComponent {...props} />
    </div>
  );
};

export default withCard;
