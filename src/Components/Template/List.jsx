import React, { useState } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiGrid41 } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";


const List = () => {

    const [view,setView] = useState('grid')

    return (
        <div className='flex'>
            <div className='w-1/3 bg-[#fff] rounded-2xl mx-6 px-4 pt-4 pb-2 overflow-auto h-96'>
                <div className='font-Nunito_Sans font-bold content-center'>
                    Category
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
            <div className='w-2/3 bg-[#fff] rounded-2xl mr-6 overflow-auto h-[80vh]'>
                <div className='flex justify-between px-4 pt-4 pb-2'>
                    <div className='font-Nunito_Sans font-bold content-center'>Templates</div>
                    <div className='space-x-4 flex'>
                        <button className='px-4 py-2 flex space-x-2 text-[#4D4D4D] bg-[#E9F2EF] text-center text-sm border border-[#E9E9E9] rounded-lg'><span><IoMdAddCircleOutline size={20} /></span><span>Add Template</span></button>
                        <button className='text-[#4D4D4D] px-4 py-2 bg-[#E9F2EF] text-center text-sm border border-[#E9E9E9] rounded-lg w-fit' onClick={()=>view === 'grid' ? setView('list') : setView('grid') } > {view === 'grid' ? <CiGrid41 size={20}/> : <CiBoxList size={20} />} </button>
                    </div>                    
                </div>
                <div className='w-[95%] m-auto mb-2'>
                <hr />
                </div>
                <div className={`mb-2 w-[98%] m-auto ${view === 'grid' ? 'grid grid-cols-4 space-x-4' : 'space-y-4'}`}>
                    <div className='py-2 px-2 flex space-x-2 bg-[#E9F2EF] rounded-xl'>
                        <div className='cursor-pointer'>
                        <img src={process.env.PUBLIC_URL + 'Frame 1261155983.svg'} alt="filler" />
                        </div>
                        <div className='text-center min-h-full content-center'>
                            <div>
                            Offer Letter
                            </div>
                            <div>
                            Type_Word
                            </div>
                        </div>
                    </div>
                    <div className='py-2 px-2 flex space-x-2 bg-[#E9F2EF] rounded-xl'>
                        <div className='cursor-pointer'>
                        <img src={process.env.PUBLIC_URL + 'Frame 1261155983.svg'} alt="filler" />
                        </div>
                        <div className='text-center min-h-full content-center'>
                            <div>
                            Offer Letter
                            </div>
                            <div>
                            Type_Word
                            </div>
                        </div>
                    </div>
                    <div className='py-2 px-2 flex space-x-2 bg-[#E9F2EF] rounded-xl'>
                        <div className='cursor-pointer'>
                        <img src={process.env.PUBLIC_URL + 'Frame 1261155983.svg'} alt="filler" />
                        </div>
                        <div className='text-center min-h-full content-center'>
                            <div>
                            Offer Letter
                            </div>
                            <div>
                            Type_Word
                            </div>
                        </div>
                    </div>
                    <div className='py-2 px-2 flex space-x-2 bg-[#E9F2EF] rounded-xl'>
                        <div className='cursor-pointer'>
                        <img src={process.env.PUBLIC_URL + 'Frame 1261155983.svg'} alt="filler" />
                        </div>
                        <div className='text-center min-h-full content-center'>
                            <div>
                            Offer Letter
                            </div>
                            <div>
                            Type_Word
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List