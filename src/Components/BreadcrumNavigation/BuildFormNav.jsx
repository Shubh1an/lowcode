import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

const BuildFormNav = () => {
    const pathArray = ['CRM', 'Lead', 'Add']
    const heading = 'Untitled Form'
    return (
        <div className='w-full'>
            <div className='w-full flex flex-row items-center'>
                <div className='w-full flex flex-col'>
                    <BreadCrumNav pathArray={pathArray} />
                    <p className='text-2xl px-4 text-[#4D4D4D font-bold] mt-3'>
                        {heading}
                    </p>
                </div>
                <button className='bg-[#E9F2EF] text-[#212121] px-4 py-2 rounded-md mx-4'>Add</button>
            </div>
            <div className='w-full h-[1px] bg-[#E9E9E9] mt-3'>
            </div>
        </div>
    )
}

const BreadCrumNav = ({ pathArray }) => {
    return (
        <div className='w-full flex flex-row items-center px-4 pt-4'>
            {pathArray.map((path, index) => {
                return (
                    <div className='flex flex-row items-center' key={index}>
                        <span className='text-base text-[#227A60] hover:underline cursor-pointer'>{path}</span>
                        {index !== pathArray.length - 1 && <IoIosArrowForward className='text-base' />}
                    </div>
                )
            })}
        </div >
    )
}

export default BuildFormNav