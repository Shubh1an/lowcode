import React, { useContext, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { CiGrid41 } from 'react-icons/ci';
import { CiBoxList } from 'react-icons/ci';
import ListHeaderButton from '../inputs/ListHeaderButton';
import { ChangeViewBtn } from '../Buttons/ChangeViewBtn';
import Accordion from '../Accordion/CustomAccordion';
import { FaFileWord } from 'react-icons/fa';
import GlobalContext from '../../Context/Context';
import AddTemplate from './AddTemplate';

const List = () => {
  const [view, setView] = useState(false);
  const { category } = useContext(GlobalContext);
  const [dummyData, setDummyData] = useState([
    {
      img: 'Frame 1261155984.svg',
      name: 'offer_Letter',
      type: 'pdf',
      icon: <FaFileWord />,
    },
    {
      img: 'Frame 1261155983.svg',
      name: 'offer_Letter',
      type: 'pdf',
      icon: <FaFileWord />,
    },
    {
      img: 'Frame 1261155983.svg',
      name: 'offer_Letter',
      type: 'pdf',
      icon: <FaFileWord />,
    },
    {
      img: 'Frame 1261155983.svg',
      name: 'offer_Letter',
      type: 'pdf',
      icon: <FaFileWord />,
    },
  ]);

  const [addTemplate, setAddTemplate] = useState(false);

  return (
    <div>
      {!addTemplate ? (
        <div className="flex">
          <div className="w-1/3">
            <div className="bg-[#fff] min-h-96 rounded-2xl mx-6 px-4 pt-4 pb-2 overflow-auto">
              <div className="font-Nunito_Sans font-bold content-center">
                Category
              </div>
              <div>
                {category.map((cat, key) => (
                  <Accordion title={cat?.category} key={key}>
                    <ul>
                      {cat?.subCategory.map((subcat, key) => (
                        <li key={key}>{subcat}</li>
                      ))}
                    </ul>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
          <div className="w-2/3 bg-[#fff] rounded-2xl mr-6 overflow-auto h-[80vh]">
            <div className="flex justify-between px-4 pt-4 pb-2">
              <div className="font-Nunito_Sans font-bold content-center">
                Templates
              </div>
              <div className="space-x-4 flex">
                <ListHeaderButton
                  icon={<IoMdAddCircleOutline size={20} />}
                  label={'Add Template'}
                  onclick={() => setAddTemplate(true)}
                ></ListHeaderButton>
                <ChangeViewBtn
                  onclick={() => (view ? setView(false) : setView(true))}
                  view={view}
                />
              </div>
            </div>
            <div className="w-[95%] m-auto mb-2">
              <hr />
            </div>
            <div
              className={`mb-2 w-[98%] m-auto ${view ? 'grid grid-cols-4 space-x-4' : 'space-y-4'}`}
            >
              {dummyData.map((data, key) => (
                <div className={`py-2 px-2 bg-[#FCF9EE] rounded-xl`} key={key}>
                  <div
                    className={`space-x-2 ${!view ? 'flex' : 'flex-col w-[90%] mx-auto space-y-4'}`}
                  >
                    <div className="cursor-pointer">
                      <img
                        src={process.env.PUBLIC_URL + data.img}
                        className={`${!view ? 'w-32' : 'w-56'}`}
                        alt="filler"
                      />
                    </div>
                    <div className={`${!view && 'content-center'}`}>
                      <div className="font-bold text-[#212121] ">
                        {data.name}
                      </div>
                      <div className="space-x-1 flex items-center">
                        <span>{data.icon}</span>
                        <span>{data.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <AddTemplate onClickCancel={() => setAddTemplate(false)} />
      )}
    </div>
  );
};

export default List;
