import React from 'react';
import { UserPills } from '../utils';

const contacts = [
  {
    name: 'Ravi Ranjan',
    status: 'New',
    phone: '+91 1234567890',
    owner: 'PA',
    lastActivity: 'May 11, 2024',
    activityType: 'Emailed',
  },
  {
    name: '+91 1234567890',
    status: 'Won',
    phone: '+91 123456789',
    owner: 'PA',
    lastActivity: 'May 11, 2024',
    activityType: 'Emailed',
  },
  {
    name: 'example@hello.com',
    status: 'Dead',
    phone: '+91 123456789',
    owner: 'PA',
    lastActivity: 'May 11, 2024',
    activityType: 'Emailed',
  },
  {
    name: 'Devis Piter',
    status: 'Prospect',
    phone: '+91 123456789',
    owner: 'PA',
    lastActivity: 'May 11, 2024',
    activityType: 'Emailed',
  },
  {
    name: 'Brent Homer',
    status: 'Contacted',
    phone: '+91 123456789',
    owner: 'PA',
    lastActivity: 'May 11, 2024',
    activityType: 'Emailed',
  },
];

const statusStyles = {
  New: 'bg-blue-100 text-blue-800',
  Won: 'bg-green-100 text-green-800',
  Dead: 'bg-red-100 text-red-800',
  Prospect: 'bg-yellow-100 text-yellow-800',
  Contacted: 'bg-purple-100 text-purple-800',
};

const Raw = () => {
  return (
    <div className="flex flex-col p-4 h-full">
      <div className="flex justify-between mb-4">
        <button className="bg-black text-white px-4 py-2 rounded">
          Add New
        </button>
        <div className="flex space-x-2">
          <input
            type="text"
            className="border rounded px-2 py-1"
            placeholder="Search"
          />
          <button className="border rounded px-4 py-2">Add New</button>
          <button className="border rounded px-4 py-2">15/05 - 30/05</button>
        </div>
      </div>
      <table className="min-w-full bg-white text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="min-w-full bg-white">
          <tr className="border-b">
            <th className="p-2">
              <input type="checkbox" />
            </th>
            <th className="p-2">Contacts</th>
            <th className="p-2">Status</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Owner</th>
            <th className="p-2">Last Activity</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-2 py-3">
                <input type="checkbox" />
              </td>
              <td className="px-2 py-3">{contact.name}</td>
              <td className="px-2 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${statusStyles[contact.status]}`}
                >
                  {contact.status}
                </span>
              </td>
              <td className="px-2 py-3">{contact.phone}</td>
              <td className="px-2 py-3">
                <UserPills user={{ name: contact.owner }} />
              </td>
              <td className="px-2 py-3">
                <span className="flex gap-5">
                  <span className="m-1">{contact.lastActivity}</span>{' '}
                  <span className="text-green-600 rounded-full bg-[#F1FBF8] px-4 py-2">
                    {contact.activityType}
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-auto">
        <div>
          Show
          <select className="border rounded px-2 py-1 mx-2">
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
          </select>
          entries
        </div>
        <div className="flex space-x-1">
          <button className="border rounded px-3 py-1">1</button>
          <button className="border rounded px-3 py-1 bg-orange-500 text-white">
            2
          </button>
          <button className="border rounded px-3 py-1">3</button>
          <button className="border rounded px-3 py-1">...</button>
          <button className="border rounded px-3 py-1">17</button>
        </div>
      </div>
    </div>
  );
};

export default Raw;
