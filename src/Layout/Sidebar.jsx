import React, { useContext, useEffect, useState } from 'react'
// @ts-ignore
import LCNC from "../assets/LCNC.svg"
import { IoHomeOutline } from "react-icons/io5";
import { RiStackLine } from "react-icons/ri";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { PiGraphLight } from "react-icons/pi";
import { GoWorkflow } from "react-icons/go";
import GlobalContext from '../Context/Context';
const Sidebar = () => {
  const menuData = [
    {
      title: "Builder",
      icon: <IoHomeOutline className='' />,
      url: "/builder",
      subMenu: [
        {
          title: "Module",
          url: "/builder/module",
        },
        {
          title: "Entity",
          url: "/builder/entity",
        },
        {
          title: "Field",
          url: "/builder/field",
        },
        {
          title: "Dashboard",
          url: "/builder/dashboard",
        }
      ]
    },
    {
      title: "Template",
      icon: <RiStackLine />,
      url: "/template",
      subMenu: [
        {
          title: "List",
          url: "/template/list",
        },
        {
          title: "Category",
          url: "/template/category",
        }
      ]
    },
    {
      title: "Apps",
      icon: <AiOutlineAppstoreAdd />,
      url: "/apps",
      subMenu: []
    },
    {
      title: "Sequence",
      icon: <PiGraphLight />,
      url: "/sequence",
      subMenu: []
    },
    {
      title: "Workflow",
      icon: <GoWorkflow />,
      url: "/workflow",
      subMenu: []
    }
  ]
  // @ts-ignore
  const { setSelectedMenu, setSelectedSubMenu } = useContext(GlobalContext)
  const [active, setActive] = useState(0)
  const [activeSub, setActiveSub] = useState(0)
  useEffect(() => {
    setSelectedMenu(menuData[active])
  }, [active])

  useEffect(() => {
    setSelectedSubMenu(menuData[active].subMenu[activeSub])
  }, [activeSub])

  useEffect(() => {
    setActive(0)
    setActiveSub(0)
  }, [])
  return (
    <div className='h-full w-[13%] bg-[#FFFFFF]'>
      <div className='flex flex-col items-center py-7 '>
        <img src={LCNC} alt="LCNC" className='' />
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-col w-1/3'>
          {
            menuData.map((menu, index) => {
              return (
                <SidebarMenu key={index} menu={menu} index={index} length={menuData.length} setActive={setActive} active={active} />
              )
            })
          }
        </div>
        <div className='flex flex-col w-2/3 pl-7'>
          {
            menuData[active].subMenu.length > 0 ? menuData[active].subMenu.map((menu, index) => {
              return (
                <SidebarSubMenu key={index} menu={menu} setActive={setActiveSub} active={activeSub} index={index} />
              )
            }) : <SidebarSubMenu menu={{ title: "No Sub Menu", url: "/builder" }} setActive={setActiveSub} active={0} index={0} />
          }
        </div>
      </div>
    </div>
  )
}

const SidebarMenu = ({ menu, index, length, setActive, active }) => {
  return (
    <div className={`flex flex-col w-full items-center ${active === index ? 'bg-[#E9F2EF] text-[#227A60]' : 'bg-[#E9E9E9] text-[#7A7A7A]'} ml-3 mb-1 cursor-pointer ${index === 0 ? 'rounded-t-lg' : index === length - 1 ? 'rounded-b-lg' : ''}`}
      onClick={() => setActive(index)}
    >
      <div className='flex flex-col w-full items-center my-2'>
        <div className='w-full flex flex-row items-center text-2xl  justify-center '>
          {menu.icon}
        </div>
        <span className='text-xs'>{menu.title}</span>
      </div>
    </div>
  )
}

const SidebarSubMenu = ({ menu, setActive, active, index }) => {
  return (
    <div className={`w-full mb-2 text-sm ${active === index ? 'text-[#227A60]' : 'text-[#7A7A7A]'} cursor-pointer`} onClick={() => setActive(index)}>
      {menu.title}
    </div>
  )
}

export default Sidebar