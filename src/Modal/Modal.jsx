// Modal component

import React from "react";


const Modal = ({ children, isOpen, onClose }) => {
  return (
    <div className="">
      <div
        className={`fixed inset-0 overflow-y-auto ${
            isOpen ? "block" : "hidden"
        }`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        >
        <div className="flex items-center justify-center min-h-screen">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
            onClick={onClose}
          ></div>
          <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="p-4">
              {children}
            </div>
            <div className="px-4 py-3 bg-gray-100 text-right">
              <button
                className="text-sm text-gray-600 hover:text-gray-900"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
