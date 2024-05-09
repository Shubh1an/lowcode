import React, { useState } from 'react'
import MainTab from '../Components/Tab/MainTab'
import List from '../Components/Builder/List'
import View from '../Components/Builder/View'
import Add from '../Components/Builder/Add'

const Builder = () => {
    const tabs = [{ title: "All List" }, { title: "Add New" },
    { title: "View" },
    ]
    const [active, setActive] = useState(0)
    return (
        <div className='w-full h-full bg-[#E9F2EF] flex flex-col'>
            <MainTab tabs={tabs} active={active} setActive={setActive} />
            {
                active === 0 ? <List /> : active === 1 ? <Add /> : <View />
            }
        </div>
    )
}

export default Builder