import React, { useEffect, useState } from 'react'

const Control = ({ label, value, setValue, index }) => {
    const handleValue = (field) => {
        setValue(prev => {
            let newValue = [...prev]

            newValue[index] = {
                ...newValue[index],
                value: field
            }
            return newValue
        });
    }
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        setInputValue(value[index]?.value);
    }, [value])


    switch (label) {
        case "section":
            return <div className="w-full min-h-[100px] border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF]"></div>
        case "single_line":
            return <input type="text" className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm" onChange={(e) => handleValue(e.target.value)} value={inputValue} />
        case "dropdown":
            return <select className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm p-2 text-sm" onChange={(e) => handleValue(e.target.value)} value={inputValue}>
                <option value="option1">Add Options in property window</option>
            </select>
    }

}

export default Control