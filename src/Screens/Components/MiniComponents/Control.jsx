import React from 'react'

const Control = ({ label }) => {
    switch (label) {
        case "section":
            return <div className="w-full min-h-[100px] border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF]"></div>
        case "single_line":
            return <input type="text" className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm" />
        case "dropdown":
            return <select className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm p-2 text-sm">
                <option value="option1">Add Options in property window</option>
            </select>
    }

}

export default Control