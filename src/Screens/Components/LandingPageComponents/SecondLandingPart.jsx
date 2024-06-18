import React from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import MassangerIcon from '../../../assets/MassangerIcon.svg';
import CRMIcon from '../../../assets/CRMIcon.svg';
import BuilderIcon from '../../../assets/BuilderIcon.svg';
import WorkFlowIcon from '../../../assets/WorkFlowIcon.svg';
import Sequence from '../../../assets/Sequence.svg';
import TemplateIcon from '../../../assets/TemplateIcon.svg';
// function SecondLandingPart() {
//   return (
//     <div className="max-w-6xl ml-80" style={{ marginTop: '300px' }}>
//       {' '}
//       <div className="font-sans text-gray-800 text-2xl font-semibold mb-4 bold">
//         Featured App
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white shadow-md p-4 rounded-md flex items-center">
//           <img src={MassangerIcon} alt="Messanger Icon" className="w-12 h-8" />
//           <div className="font-plus-jakarta-sans text-20 font-semibold">
//             MESSENGER
//           </div>
//         </div>

//         {/* Card 2 - CRM */}
//         <div className="bg-white shadow-md p-4 rounded-md flex items-center">
//         <img src={CRMIcon} alt="CRM Icon" className="w-12 h-8" />
//           <div className="font-plus-jakarta-sans text-20 font-semibold">CRM</div>
//         </div>

//         {/* Card 3 - Template */}
//         <div className="bg-white shadow-md p-4 rounded-md flex items-center">
//           {/* <img src={TemplateIconImg} alt="Template Icon" className='w-12 h-8' /> */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6 mr-2"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M16 4h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2m2-2h4a2 2 0 012 2v2a2 2 0 01-2 2h-4a2 2 0 01-2-2V4a2 2 0 012-2zM9 10l2 2m0 0l3-3m-3 3l-2-2m0 0L7 9m3 3l2 2"
//             />
//           </svg>
//           <div>Template</div>
//         </div>

//         <div className="bg-white shadow-md p-4 rounded-md flex items-center">
//         <img src={BuilderIcon} alt="Builder Icon" className="w-12 h-8" />
//           {/* Builder text */}
//           <div>Builder</div>
//         </div>

//       </div>
//     </div>
//   );
// }

function SecondLandingPart() {
  return (
    <div
      className="max-w-10xl "
      style={{ position: 'absolute', left: '20%', right: '20%' }}
    >
      <div className="font-sans text-gray-800 text-2xl font-semibold mb-4 bold">
        Featured App
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-15">
        {/* Card 1 - MESSENGER */}
        <div className="bg-white p-4 rounded-md flex items-center">
          <img src={MassangerIcon} alt="Messanger Icon" className="w-12 h-8" />
          <div className="font-plus-jakarta-sans text-20 font-semibold">
            MESSENGER
          </div>
        </div>

        {/* Card 2 - CRM */}
        <div className="bg-white p-4 rounded-md flex items-center">
          <img src={CRMIcon} alt="CRM Icon" className="w-12 h-8" />
          <div className="font-plus-jakarta-sans text-20 font-semibold">
            CRM
          </div>
        </div>

        {/* Card 3 - Template */}
        <div className="bg-white p-4 rounded-md flex items-center">
          <img src={TemplateIcon} alt="Builder Icon" className="w-12 h-8" />
          <div className="font-plus-jakarta-sans text-20 font-semibold">
            TEMPLATE
          </div>
        </div>

        {/* Card 4 - Builder */}
        <div className="bg-white p-4 rounded-md flex items-center">
          <img src={BuilderIcon} alt="Builder Icon" className="w-12 h-8" />
          <div className="font-plus-jakarta-sans text-20 font-semibold">
            BUILDER
          </div>
        </div>

        {/* Card 5 - WorkFlow */}
        <div className="bg-white p-4 rounded-md flex items-center mt-8">
          <img src={WorkFlowIcon} alt="Builder Icon" className="w-12 h-8" />
          <div className="font-plus-jakarta-sans text-20 font-semibold">
            WORKFLOW
          </div>
        </div>

        {/* Card 6 - Sequence */}
        <div className="bg-white p-4 rounded-md flex items-center mt-8">
          <img src={Sequence} alt="Sequence" className="w-12 h-8" />
          <div className="font-plus-jakarta-sans text-20 font-semibold">
            SEQUENCE
          </div>
        </div>

        {/* Card 7 - Apps */}
        <div className="bg-white p-4 rounded-md flex items-center justify-center mt-8">
          <BsFillPlusCircleFill className="w-6 h-6 mr-2 " />
          <div className="font-plus-jakarta-sans text-20 font-semibold">
            AppS
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondLandingPart;
