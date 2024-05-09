import React from 'react'
// @ts-ignore
import LCNC from "../assets/LCNC.svg"
const Sidebar = () => {
  return (
    <div className='h-screen w-[13%] bg-[#FFFFFF]'>
      <div className='flex flex-col items-center'>
        <img src={LCNC} alt="LCNC" className='mt-7'/>
      </div>
    </div>
  )
}

export default Sidebar