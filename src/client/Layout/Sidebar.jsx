import { useContext, useEffect, useState } from 'react';
// @ts-ignore
import { BsGraphUpArrow } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import GlobalContext from '../../Context/Context';
import { Sidebaricon } from '../svg';
import { useSelector } from 'react-redux';
const Sidebar = () => {
  const modulesdata = useSelector((state) => state['modules']);

  const routes = ['/page/pipeline', '/page/contact', '/page/activity'];

  useEffect(() => {}, []);

  const menuData =
    modulesdata?.entity &&
    modulesdata?.entity?.map((em, index) => {
      return {
        ...em,
        icon: <BsGraphUpArrow />,
        url: routes[index],
        subMenu: [],
      };
    });

  // {
  //   title: 'Dashboard',
  //   icon: <RiLayout4Line />,
  //   url: '/dashboard',
  //   subMenu: [],
  // },
  // {
  //   title: 'Raw Data',
  //   icon: <BsGraphUpArrow />,
  //   url: '/page/raw',
  //   subMenu: [],
  // },
  // {
  //   title: 'Leads',
  //   icon: <PiFolderUserBold />,
  //   url: '/page/lead',
  //   subMenu: [],
  // },
  // {
  //   title: 'Deals',
  //   icon: <LiaHandshake />,
  //   url: '/page/deal',
  //   subMenu: [],
  // },

  // {
  //   title: 'Products',
  //   icon: <PiGraphLight />,
  //   url: '/Products',
  //   subMenu: [],
  // },

  // {
  //   title: 'Products',
  //   icon: <PiGraphLight />,
  //   url: '/Products',
  //   subMenu: [],
  // },

  // {
  //   title: 'Team',
  //   icon: <PiUsersFour />,
  //   url: '/Products',
  //   subMenu: [],
  // },

  // {
  //   title: 'Competitors',
  //   icon: <PiGraphLight />,
  //   url: '/Products',
  //   subMenu: [],
  // },

  // {
  //   title: 'Contacts',
  //   icon: <PiGraphLight />,
  //   url: '/Products',
  //   subMenu: [],
  // },
  // {
  //   title: 'Settings',
  //   icon: <PiGraphLight />,
  //   url: '/Products',
  //   subMenu: [],
  // },
  // @ts-ignore
  const { setSelectedMenu, setSelectedSubMenu } = useContext(GlobalContext);
  const [active, setActive] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedMenu(menuData[active]);
  }, [active]);

  useEffect(() => {
    setSelectedSubMenu(menuData[active]?.subMenu[activeSub]);
  }, [activeSub]);

  useEffect(() => {
    setActive(0);
    setActiveSub(0);
  }, []);

  const redirectto = () => {
    navigate('/');
  };

  return (
    <div className="h-full w-[100px] bg-[#FFFFFF]">
      <div className="flex flex-col items-center py-4">
        <span onClick={redirectto}>
          <Sidebaricon />
        </span>
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
    <Link to={`${menu.url}?entityId=${menu?.id}`}>
      <div
        className={`flex flex-col w-full items-center ${active === index ? '' : ''} ml-3 mb-1 cursor-pointer ${index === 0 ? 'rounded-t-lg' : index === length - 1 ? 'rounded-b-lg' : ''}`}
        onClick={() => setActive(index)}
      >
        <div className="flex flex-col w-full items-center my-2">
          <div className="w-full flex flex-row items-center text-2xl  justify-center ">
            {menu.icon}
          </div>
          <span className="text-xs">{menu.name}</span>
        </div>
      </div>
    </Link>
  );
};

const SidebarSubMenu = ({ menu, setActive, active, index }) => {
  return (
    <Link to={`${menu.url}`}>
      <div
        className={`w-full mb-4 text-sm ${active === index ? 'text-[#000]' : 'text-[#7A7A7A]'} cursor-pointer`}
        onClick={() => setActive(index)}
      >
        {menu.name}
      </div>
    </Link>
  );
};

export default Sidebar;
