import React from 'react';
import { IoClose } from 'react-icons/io5';

const ShortModal = ({
   onClose,
   isOpen,
   children,
   tittle = '',
   tittleClass = '',
}) => {
   if (!isOpen) return null;
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
         <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
         <div className="z-50 relative bg-white rounded-2xl p-3 flex flex-col">
            {/* Change max-width to fit your content */}
            <div className="flex justify-between">
               <h1 className={`${tittleClass}`}>{tittle}</h1>
               <div className="flex justify-end mb-2">
                  <button onClick={onClose}>
                     <IoClose fontSize={16} />
                  </button>
               </div>
            </div>
            <h2 className="text-lg font-semibold mb-4">{children}</h2>
         </div>
      </div>
   );
};

export default ShortModal;
