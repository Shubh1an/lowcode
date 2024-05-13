import React, { useState } from 'react'
import SubTab from '../Tab/SubTab'
import { BiText } from 'react-icons/bi';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlinePhone } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { BsMap } from 'react-icons/bs';
import { MdPeopleAlt } from "react-icons/md";
import { FieldButton } from '../Buttons/FieldButton';
import BuildFormNav from '../BreadcrumNavigation/BuildFormNav';
import { useDrop } from 'react-dnd'
import AddPageField from '../inputs/AddPageField';
import FormInput from '../FormInput/FormInput';


const Add = () => {
    const FieldTabs = [
        "Basic Fields",
        "Advanced Fields"
    ]

    const PropertiesFields = [
        "Edit",
        "Style",
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
            inputType: "text",
            icon: <BiText />
        },
        {
            title: "Multi Line",
            inputType: "textarea",
            icon: <BiText />
        },
        {
            title: "Number",
            inputType: "number",
            icon: <RiCheckboxBlankCircleLine />
        },
        {
            title: "Date",
            inputType: "date",
            icon: <AiOutlineCalendar />
        },
        {
            title: "Time",
            inputType: "time",
            icon: <AiOutlineClockCircle />
        },
        {
            title: "Email",
            inputType: "email",
            icon: <HiOutlineMail />
        },
        {
            title: "Phone",
            inputType: "tel",
            icon: <AiOutlinePhone />
        },
        {
            title: "Address",
            inputType: "text",
            icon: <BsMap />
        },
        {
            title: "Gender",
            inputType: "radio",
            icon: <MdPeopleAlt />,
            options: ["Male", "Female"]
        }
    ];

    const fieldProperties = [
        {
            title: "Display Name",
            type: "text",
            id: "displayName"
        },
        {
            title: "Name",
            type: "text",
            id: "name"
        },
        {
            title: "Description",
            type: "text",
            id: "description"
        },
        {
            title: "Mandatory",
            type: "radio",
            options: ["Yes", "No"],
            id: "mandatory"
        },
        {
            title: "Default Value",
            type: "text",
            id: "defaultValue"
        },


    ]

    const [formFields, setFormFields] = useState([])

    const [activeField, setActiveField] = useState(0)
    const [activeProperties, setActiveProperties] = useState(0)
    const [activePropertiesField, setActivePropertiesField] = useState(0)

    const handleProperties = (data) => {
        let changeId = activePropertiesField
        let currentData = formFields
        console.log("CHANGE ID", changeId)
        console.log("PAYLOAD", data)
        console.log("CURRENT DATA", currentData)

        if (data.id === "displayName") {
            currentData[changeId].title = data.value
        } else if (data.id === "name") {
            currentData[changeId].name = data.value
        }
        else if (data.id === "description") {
            currentData[changeId].description = data.value
        }
        else if (data.id === "mandatory") {
            currentData[changeId].mandatory = data.value
        }
        else if (data.id === "defaultValue") {
            currentData[changeId].defaultValue = data.value
        }

        setFormFields([...currentData])

    }

    const handleDrop = (item) => {
        const { field } = item;
        setFormFields([...formFields, field]);
    };

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: "FIELD",
        drop: (item) => handleDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = canDrop && isOver;
    return (
        <div className='w-full h-full flex flex-row px-6 pb-6'>

            <div className='w-1/4 h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto'>
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
                                    index={index}
                                    field={field}
                                />)
                            }
                        </div> : null
                    }
                </div>
            </div>
            <div className='flex flex-col w-2/4 h-full bg-[#fff] rounded-2xl mx-6 flex overflow-auto' ref={drop}>
                <BuildFormNav />
                <div className={`w-full h-[80%] border-2 ${isActive ? " border-[#227A60]" : "border-transparent"} p-4 overflow-scroll`}>
                    {formFields.map((field, index) => (
                        <div key={index}>
                            <FormInput field={{...field, id: index}} setActiveField={setActivePropertiesField} activePropertiesField={activePropertiesField}/>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
            <div className='w-1/4 h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto'>
                <SubTab tabs={PropertiesFields} active={activeProperties} setActive={setActiveProperties} />
                <div
                    className={`w-full h-full overflow-auto`}
                >
                    {
                        activeProperties === 0 ? <div className='grid grid-cols-1 w-full  p-4'>
                            {
                                fieldProperties.map((field, index) => <AddPageField
                                    key={index}
                                    field={field}
                                    handleProperties={handleProperties}
                                />
                                )
                            }
                        </div> : null
                    }

                </div>
            </div>
        </div>
    )
}

const Footer = () => {
    return (
        <div className='w-full h-[60px] border-t-[1px] border-[#E9E9E9]'>
            <div className='flex justify-start items-center h-full py-4'>
                <button className='bg-[#227A60] text-[#fff] px-4 py-1 rounded-md mx-4 font-bold'>Save</button>
                <button className='text-[#227A60] px-4 py-1 rounded-md border border-[#227A60] font-bold'>Cancel</button>
            </div>
        </div>
    )
}

export default Add