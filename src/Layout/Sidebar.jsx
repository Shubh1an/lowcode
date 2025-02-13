import { useContext, useEffect, useState } from 'react';
// @ts-ignore
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoWorkflow } from 'react-icons/go';
import { IoHomeOutline } from 'react-icons/io5';
import { PiGraphLight } from 'react-icons/pi';
import { RiStackLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import GlobalContext from '../Context/Context';
const Sidebar = () => {
  const menuData = [
    {
      title: 'Builder',
      icon: <IoHomeOutline className="" />,
      url: '/builder',
      subMenu: [],
    },
    {
      title: 'Template',
      icon: <RiStackLine />,
      url: '/template',
      subMenu: [
        {
          title: 'List',
          url: '/template/list',
        },
        {
          title: 'Category',
          url: '/template/category',
        },
      ],
    },
    {
      title: 'Apps',
      icon: <AiOutlineAppstoreAdd />,
      url: '/apps',
      subMenu: [],
    },
    {
      title: 'Sequence',
      icon: <PiGraphLight />,
      url: '/sequence',
      subMenu: [],
    },
    {
      title: 'Workflow',
      icon: <GoWorkflow />,
      url: '/workflow',
      subMenu: [],
    },
  ];
  // @ts-ignore
  const { setSelectedMenu, setSelectedSubMenu } = useContext(GlobalContext);
  const [active, setActive] = useState(0);
  const [activeSub, setActiveSub] = useState(0);

  useEffect(() => {
    setSelectedMenu(menuData[active]);
  }, [active]);

  useEffect(() => {
    setSelectedSubMenu(menuData[active].subMenu[activeSub]);
  }, [activeSub]);

  useEffect(() => {
    setActive(0);
    setActiveSub(0);
  }, []);
  return (
    <div className="h-full w-[100px] bg-[#FFFFFF]">
      <div className="flex flex-col items-center py-4">
        <GiHamburgerMenu className="text-black text-2xl" />
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col">
          {menuData.map((menu, index) => {
            return (
              <SidebarMenu
                key={index}
                menu={menu}
                index={index}
                length={menuData.length}
                setActive={setActive}
                active={active}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SidebarMenu = ({ menu, index, length, setActive, active }) => {
  return (
    <Link to={`${menu.url}`}>
      <div
        className={`flex flex-col w-full items-center ${active === index ? 'bg-[#FCF9EE] text-[#000]' : 'bg-[#E9E9E9] text-[#7A7A7A]'} ml-3 mb-1 cursor-pointer ${index === 0 ? 'rounded-t-lg' : index === length - 1 ? 'rounded-b-lg' : ''}`}
        onClick={() => setActive(index)}
      >
        <div className="flex flex-col w-full items-center my-2">
          <div className="w-full flex flex-row items-center text-2xl  justify-center ">
            {menu.icon}
          </div>
          <span className="text-xs">{menu.title}</span>
        </div>
      </div>
    </Link>
  );
};

const SidebarSubMenu = ({ menu, setActive, active, index }) => {
  return (
    <Link to={`${menu.url}`}>
      <div
        className={`w-full mb-2 text-sm ${active === index ? 'text-[#000]' : 'text-[#7A7A7A]'} cursor-pointer`}
        onClick={() => setActive(index)}
      >
        {menu.title}
      </div>
    </Link>
  );
};

export default Sidebar;
