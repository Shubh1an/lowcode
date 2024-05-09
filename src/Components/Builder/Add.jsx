import React, { useState } from 'react'
import SubTab from '../Tab/SubTab'
import { MdOutlineErrorOutline } from "react-icons/md";
import { FieldButton } from '../Buttons/FieldButton';

const Add = () => {
    const FieldTabs = [
        "Basic Fields",
        "Advanced Fields"
    ]
    // const basicFields = [
    //     "Single Line",
    //     "Multi Line",
    //     "Number",
    //     "Date",
    //     "Time",
    //     "Email",
    //     "Phone",
    //     "Address",
    // ]

    const basicFields = [
        {
            title: "Single Line",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Multi Line",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Number",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Date",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Time",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Email",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Phone",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Address",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Single Line",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Multi Line",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Number",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Date",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Time",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Email",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Phone",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Address",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Single Line",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Multi Line",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Number",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Date",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Time",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Email",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Phone",
            icon: <MdOutlineErrorOutline />
        },
        {
            title: "Address",
            icon: <MdOutlineErrorOutline />
        },
    ]
    const [activeField, setActiveField] = useState(0)
    return (
        <div className='w-full h-full flex flex-row px-6 pb-6'>
            <div className='w-1/4 h-full bg-[#fff] rounded-2xl flex flex-col'>
                <SubTab tabs={FieldTabs} active={activeField} setActive={setActiveField} />
                <div className=''>
                    {
                        activeField === 0 ? <div className='grid grid-cols-2 gap-2 w-full h-full p-4'>
                            {
                                basicFields.map((field, index) => <FieldButton
                                    key={index}
                                    title={field.title}
                                    icon={field.icon}
                                    onclick={() => setActiveField(index)}
                                    titleClass={""}
                                    extraClass='w-full text-[#4D4D4D] hover:text-[#FFFFFF] hover:bg-[#227A60] text-center text-sm border border-[#E9E9E9] rounded-lg py-2'

                                />)
                            }
                        </div> : null
                    }
                </div>
            </div>
            <div className='w-2/4 h-full bg-[#fff] rounded-2xl mx-6 flex'>

            </div>
            <div className='w-1/4 h-full bg-[#fff] rounded-2xl flex'>

            </div>
        </div>
    )
}

export default Add