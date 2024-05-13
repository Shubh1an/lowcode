import React, { useState } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiGrid41 } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import ListHeaderButton from '../inputs/ListHeaderButton';
import { ChangeViewBtn } from '../Buttons/ChangeViewBtn';
import Accordion from '../Accordion/CustomAccordion';


const List = () => {

    const [view, setView] = useState(false)

    return (
        <div className='flex'>
            <div className='w-1/3'>
                <div className='bg-[#fff] min-h-96 rounded-2xl mx-6 px-4 pt-4 pb-2 overflow-auto'>
                    <div className='font-Nunito_Sans font-bold content-center'>
                        Category
                    </div>
                    <div>
                        <Accordion title="HR">
                            <ul>
                                <li>HR Manager</li>
                                <li>HR Manager</li>
                                <li>HR Manager</li>
                                <li>HR Manager</li>
                            </ul>
                            <Accordion title="HR">
                                <ul>
                                    <li>HR Manager</li>
                                    <li>HR Manager</li>
                                    <li>HR Manager</li>
                                    <li>HR Manager</li>
                                </ul>
                            </Accordion>
                        </Accordion>

                        <Accordion title="Project Manager">
                            <ul>
                                <li>HR Manager</li>
                                <li>HR Manager</li>
                                <li>HR Manager</li>
                                <li>HR Manager</li>
                            </ul>
                        </Accordion>

                        <Accordion title="Developer">
                            <ul>
                                <li>HR Manager</li>
                                <li>HR Manager</li>
                                <li>HR Manager</li>
                                <li>HR Manager</li>
                            </ul>
                        </Accordion>
                    </div>
                </div>
            </div>
            <div className='w-2/3 bg-[#fff] rounded-2xl mr-6 overflow-auto h-[80vh]'>
                <div className='flex justify-between px-4 pt-4 pb-2'>
                    <div className='font-Nunito_Sans font-bold content-center'>Templates</div>
                    <div className='space-x-4 flex'>
                        <ListHeaderButton icon={<IoMdAddCircleOutline size={20} />} label={'Add Template'} ></ListHeaderButton>
                        <ChangeViewBtn onclick={() => view ? setView(false) : setView(true)} view={view} />
                    </div>
                </div>
                <div className='w-[95%] m-auto mb-2'>
                    <hr />
                </div>
                <div className={`mb-2 w-[98%] m-auto ${view ? 'grid grid-cols-4 space-x-4' : 'space-y-4'}`}>
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