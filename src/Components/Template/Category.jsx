import React, { useContext, useState } from 'react'
import Accordion from '../Accordion/CustomAccordion'
import { IoMdAddCircle } from "react-icons/io";
import GlobalContext from '../../Context/Context';
export const Category = () => {

    const { category } = useContext(GlobalContext)
    const [selectedCategory, setSelectedCategory] = useState([])

    return (
        <div className='w-full'>
            <div className='bg-[#fff] min-h-96 rounded-2xl mx-6 px-4 pt-4 pb-2 overflow-auto'>
                <div className='font-Nunito_Sans font-bold content-center items-center flex'>
                    Category <span className='ml-4 cursor-pointer'><IoMdAddCircle fill='#227A60' size={30} /></span>
                </div>
                <div className='flex space-x-4'>
                    <div className='w-1/2'>
                        {category.map((cat, key) => (
                            <div className='rounded-md mb-2 shadow-lg mt-4' key={key}>
                                <div className={`flex font-bold justify-between rounded-xl items-center p-4 cursor-pointer ${cat?.category === selectedCategory[0]?.category && 'bg-[#227A60] text-white'}`} onClick={()=>setSelectedCategory([cat])}>
                                    {cat?.category}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='w-1/2 shadow-xl border rounded-2xl'>
                        <div className='font-Nunito_Sans  font-bold content-center items-center flex m-5'>
                            Sub-Category <span className='ml-4 cursor-pointer'><IoMdAddCircle fill='#227A60' size={30} /></span>
                        </div>
                        <div className='w-1/2'>
                        {selectedCategory?.map((cat, key) => (
                            <div className='' key={key}>
                                <div className='flex font-semibold justify-between items-center p-4 cursor-pointer'>
                                    {cat?.subCategory}
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
