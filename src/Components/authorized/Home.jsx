import React, { useState } from 'react';
import { Card, Card1, Card2, Card3, Card4, Card5 } from '../../svg/iconhome';
const Home = () => {
  const [homecards, sethomecards] = useState([
    {
      title: 'Messenger',
      image: <Card />,
      description:
        'Lorem Ipsum is simply dum text of the printing and typesetting industry.',
    },
    {
      title: 'CRM',
      image: <Card1 />,
      description:
        'Lorem Ipsum is simply dum text of the printing and typesetting industry.',
    },
    {
      title: 'Template',
      image: <Card2 />,
      description:
        'Lorem Ipsum is simply dum text of the printing and typesetting industry.',
    },
    {
      title: 'Builder',
      image: <Card3 />,
      description:
        'Lorem Ipsum is simply dum text of the printing and typesetting industry.',
    },
    {
      title: 'Workflow',
      image: <Card4 />,
      description:
        'Lorem Ipsum is simply dum text of the printing and typesetting industry.',
    },
    {
      title: 'Sequence',
      image: <Card5 />,
      description:
        'Lorem Ipsum is simply dum text of the printing and typesetting industry.',
    },
  ]);

  return (
    <div className="p-8 bg-[#FCF9EE] h-[100vh]">
      <div className="grid grid-cols-4 gap-3 mb-4 px-10 py-10 justify-center">
        {homecards.map((elm, i) => {
          return (
            <div
              className="p-6 bg-white shadow rounded-lg flex items-center w-[350px] cursor-pointer"
              key={i}
            >
              <div className="mr-4">
                <span className="text-purple-500 text-3xl">{elm.image}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{elm.title}</h3>
                <p className="text-gray-600">{elm.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
