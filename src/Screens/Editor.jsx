import React, { useEffect, useState } from 'react'
import TopBar from './Components/TopBar';
import SubTab from './Components/MiniComponents/SubTab';
import controlls from '../Config/Controlls.jsx';
import config from '../Config/config.js';
import Icons from '../Components/Utility/Icons';
import { useDrag, useDrop } from 'react-dnd';
import Control from './Components/MiniComponents/Control';


const Editor = () => {
    let editor_id = location.search.split('=')[1];
    const [active, setActive] = useState(0);
    const [selectedControl, setSelectedControl] = useState(null);

    const tabs = [
        "Controlls",
    ]

    const { CONTROLLS } = config

    const [page, setPage] = useState([]);
    const [isChildHovering, setIsChildHovering] = useState(false);

    useEffect(() => {
        console.log("isChildHovering", isChildHovering)
    }, [isChildHovering])

    const handleDrop = ({ label }) => {
        if (!isChildHovering) {
            setPage([...page, { label, properties: controlls(label)?.properties, child: [], component: <Control label={label} /> }])
        }
        setIsChildHovering(false)
    }

    useEffect(() => {
        setSelectedControl(page.length > 0 ? page.length - 1 : null)
    }, [page])



    return (
        <div className="w-full h-[94%] bg-[#FCF9EE] flex flex-row p-4">
            <div className="w-1/4 h-full bg-[#FFF] rounded-2xl overflow-auto">
                <SubTab active={active} setActive={setActive} tabs={tabs} />
                <div className="w-full p-4 grid grid-cols-2 gap-x-4">
                    {
                        CONTROLLS.map((control, index) => {
                            return <ControlCard label={control} icon={<Icons name={control} />} index={index} />
                        })
                    }
                </div>
            </div>

            <div className="w-2/4 h-full bg-[#FFF] rounded-2xl overflow-auto mx-4">
                <EditorComponent handleDrop={handleDrop} page={page} setPage={setPage} selectedControl={selectedControl} setSelectedControl={setSelectedControl} />
            </div>
            <div className="w-1/4 h-full bg-[#FFF] rounded-2xl overflow-auto">
                <PropertyWindow page={page} selectedControl={selectedControl} />
            </div>
        </div>
    )
}

const ControlCard = ({ label, icon, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "FIELD",
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        item: { label, index },
    }));
    // Remove underscore from label
    label = label.replace("_", " ");
    // Capitalize
    label = label.charAt(0).toUpperCase() + label.slice(1);
    return (
        <div className="w-full h-10 bg-[#FCF9EE] rounded p-4 my-4 flex items-center justify-between border border-[#F9EFDE] cursor-grab select-none" ref={drag} key={index}>
            {icon}
            <div className="w-3/4">
                {label}
            </div>
        </div>
    )
}

const EditorComponent = ({ handleDrop, page, selectedControl, setSelectedControl, setPage }) => {
    const [hover, setHover] = useState(false);
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'FIELD',
        drop: (item) => handleDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        hover: (item) => setHover(true),
    });

    return (
        <div className={`w-full h-full flex flex-col p-4 border overflow-scroll ${isOver ? 'border-[black]' : ''}`} ref={drop}>
            {
                page.length == 0 ? <div className="w-full h-full flex justify-center items-center">Drag and Drop</div> : null
            }
            {
                page?.map((item, index) => {
                    return <div key={index} className={`${selectedControl === index ? 'bg-[#F9EFDE]' : ''} w-full bg-[#FCF9EE] rounded p-2 my-2 flex flex-col items-left border border-[#F9EFDE]`} >
                        <div className={`font-bold px-2 py-2 rounded flex justify-between`} >
                            <div onClick={() => setSelectedControl(index)}>{item?.label}</div>
                            <button className="ml-2" onClick={() => setPage([...page.slice(0, index), ...page.slice(index + 1)])}>Remove</button>
                        </div>
                        {
                            item.component
                        }
                    </div>
                })
            }
        </div>
    )
}


const PropertyWindow = ({ page, selectedControl }) => {
    let properties = page[selectedControl]?.properties

    if (!properties) return null
    return (
        <div className="w-full h-full rounded-2xl overflow-auto p-4">
            {
                Object.keys(properties).map((key, index) => {
                    return <Property key={index} property={properties[key]} />
                })
            }
        </div>
    )
}

const Property = ({ property }) => {
    const PropertyInput = ({ type }) => {
        const [options, setOptions] = useState([]);
        const [option, setOption] = useState("");

        const [inputValue, setInputValue] = useState("");

        const addOption = () => {
            if (option === "") return;
            setOptions([...options, option]);
            setOption("");
        };
        switch (type) {
            case 'string':
                return <input type="text" className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            case 'number':
                return <input type="number" className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

            case 'boolean':
                return <select className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm" value={inputValue} onChange={(e) => setInputValue(e.target.value)}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>

            case 'options':
                return <div className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm">
                    {
                        options.map((option, index) => {
                            return <div key={index} className='w-full font-bold py-2 flex bg-[#FCF9EE] px-2 justify-between'>
                                <p className="m-2 " key={index}>{option}</p>
                                {/* Red button */}
                                <button className="text-[#FFF] px-4 py-2  text-center text-sm border border-[#E9E9E9] rounded-lg w-fit bg-[#F29900]"
                                    onClick={() => {
                                        setOptions([...options.slice(0, index), ...options.slice(index + 1)])
                                    }}
                                >Remove</button>
                            </div>
                        })
                    }
                    <div className="flex gap-2">
                        <input type="text" className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm" placeholder="Add option" value={option} onChange={(e) => setOption(e.target.value)}
                            // if I press enter it will add the option
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    addOption();
                                }
                            }}
                        />
                        <button className="text-[#4D4D4D] px-4 py-2 bg-[#FCF9EE] text-center text-sm border border-[#E9E9E9] rounded-lg w-fit"
                            onClick={() => {
                                addOption();
                            }}
                        >Add</button>
                    </div>

                </div>
        }
    }
    return (
        <div className="w-full bg-[#FCF9EE] rounded p-4 my-4 flex-col items-center justify-between border border-[#F9EFDE]">
            <div className="">
                {property?.label}
            </div>
            <div className="w-">
                <PropertyInput type={property?.type} />
            </div>
        </div>
    )


}
export default Editor