import React from 'react';

const FormInput = ({ field, setActiveField, activePropertiesField }) => {
   const { title: label, inputType: type, options, id, defaultValue } = field;
   return (
      <div className={`w-full`}>
         <label
            className={`block mb-2 mt-4 text-lg font-medium cursor-pointer ${activePropertiesField === id ? 'text-[#227A60] font-bold underline' : 'text-gray-900 font-bold '}`}
            onClick={() => setActiveField(id)}
         >
            {label}
         </label>
         <InputByType
            type={type}
            options={options}
            id={id}
            defaultValue={defaultValue}
         />
      </div>
   );
};
const InputByType = ({ type, options, id, defaultValue }) => {
   switch (type) {
      case 'text':
         return (
            <input
               type="text"
               className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
               placeholder={defaultValue}
            />
         );
      case 'textarea':
         return (
            <textarea
               className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
               placeholder={defaultValue}
            />
         );
      case 'email':
         return (
            <input
               type="email"
               className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
               placeholder={defaultValue}
            />
         );
      case 'number':
         return (
            <input
               type="number"
               className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
               placeholder={defaultValue}
            />
         );
      case 'date':
         return (
            <input
               type="date"
               className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
            />
         );
      case 'time':
         return (
            <input
               type="time"
               className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
            />
         );
      case 'checkbox':
         return (
            <div className="flex flex-row items-center justify-start ">
               {options.map((option, index) => {
                  return (
                     <div
                        className="flex flex-row items-center justify-start "
                        key={index}
                     >
                        <input
                           type="checkbox"
                           className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-4 h-4"
                           name={id}
                        />
                        <span className="ml-2">{option}</span>
                     </div>
                  );
               })}
            </div>
         );
      case 'tel':
         return (
            <input
               type="tel"
               className="border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4"
            />
         );
      case 'radio': {
         return (
            <div>
               {options.map((option, index) => {
                  return (
                     <div
                        className="flex flex-row items-center justify-start "
                        key={index}
                     >
                        <input
                           type="radio"
                           className="border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-4 h-4"
                           name={id}
                        />
                        <span className="ml-2">{option}</span>
                     </div>
                  );
               })}
            </div>
         );
      }

      default:
         return <input type="text" />;
   }
};

export default FormInput;
