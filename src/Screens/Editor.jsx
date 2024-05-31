import React, { useEffect, useState } from 'react'
import TopBar from './Components/TopBar';
import SubTab from './Components/MiniComponents/SubTab';
import controlls from '../Config/Controlls.jsx';
import config from '../Config/config.js';
import Icons from '../Components/Utility/Icons';
import { useDrag, useDrop } from 'react-dnd';
import Control from './Components/MiniComponents/Control';
import { updatePage } from '../Requests/page';
import { Link } from 'react-router-dom';


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

    const [pageData, setPageData] = useState([])

    useEffect(() => {

    }, [isChildHovering])


    const handleSubmit = () => {
        let payload = {
            form_schema: pageData
        }
        updatePage(editor_id, payload).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
        console.log("Page Data: ", page)
    }


    // use
    const handleDrop = ({ label }) => {
        if (!isChildHovering) {
            setPage([...page, { label, properties: controlls(label)?.properties, child: [], component: <Control label={label} /> }])
            setPageData((prev) => {
                return [
                    ...prev,
                    {
                        control: label
                    }
                ]
            })
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
                <EditorComponent editorId={editor_id} handleDrop={handleDrop} page={page} setPage={setPage} selectedControl={selectedControl} setSelectedControl={setSelectedControl} setPageData={setPageData} pageData={pageData} handleSubmit={handleSubmit} />
            </div>
            <div className="w-1/4 h-full bg-[#FFF] rounded-2xl overflow-auto">
                <PropertyWindow page={page} selectedControl={selectedControl} pageData={pageData} setPageData={setPageData} />
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

const EditorComponent = ({ handleDrop, page, selectedControl, setSelectedControl, setPage, pageData, setPageData, handleSubmit, editorId }) => {
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
        <div className={`w-full h-full flex flex-col  pb-0 border  ${isOver ? 'border-[black]' : ''}`} ref={drop}>
            <EditorTopBar editorId={editorId} />
            {
                page.length == 0 ? <div className="w-full h-full flex justify-center items-center">Drag and Drop</div> : null
            }
            <div className="w-full h-full flex flex-col items-center px-4 overflow-scroll">
                {
                    page?.map((item, index) => {
                        return <div key={index} className={`${selectedControl === index ? 'bg-[#F9EFDE]' : ''} w-full bg-[#FCF9EE] rounded p-2 my-2 flex flex-col items-left border border-[#F9EFDE]`} >
                            <div className={`font-bold px-2 py-2 rounded flex justify-between`} >
                                <div className="cursor-pointer" onClick={() => setSelectedControl(index)}>{pageData[index]?.properties?.displayName.value || item?.label}</div>
                                <button className="ml-2" onClick={() => setPage([...page.slice(0, index), ...page.slice(index + 1)])}>Remove</button>
                            </div>
                            <Control label={item?.label} value={pageData} setValue={setPageData} index={index} />
                        </div>
                    })

                }

            </div>
            <div className='w-full flex items-center border-t-[1px] border-[#E9E9E9] mt-auto sticky bottom-0 bg-[#FFF] p-4'>
                <button
                    className="justify-center items-center bg-[#FCF9EE] rounded flex flex-col items-left border border-[#F9EFDE] font-bold text-[#FFF] px-4 py-2 text-center text-sm border border-[#E9E9E9] rounded-lg w-fit bg-[#F29900]"
                    onClick={handleSubmit}
                >
                    Save
                </button>

            </div>
        </div>
    )
}


const PropertyWindow = ({ page, selectedControl, pageData, setPageData }) => {
    let properties = page[selectedControl]?.properties

    if (!properties) return null
    return (
        <div className="w-full h-full rounded-2xl overflow-auto p-4">
            {
                Object.keys(properties).map((key, index) => {
                    return <Property key={index} property={properties[key]} property_key={key} pageData={pageData} setPageData={setPageData} selectedControl={selectedControl} />
                })
            }
        </div>
    )
}
const PropertyInput = ({ type, property_key, pageData, setPageData, selectedControl, property }) => {
    let key = property_key
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState("");

    const [inputValue, setInputValue] = useState("");

    const addOption = () => {
        if (option === "") return;
        setOptions([...options, option]);
        setOption("");
    };
    useEffect(() => {
        if (inputValue || options.length > 0) {
            if (!pageData[selectedControl]?.properties) {
                setPageData(prev => {
                    let newPageData = [...prev]
                    newPageData[selectedControl] = {
                        ...newPageData[selectedControl],
                        properties: {
                            ...pageData[selectedControl]?.properties,
                            [key]: {
                                value: inputValue,
                                options: options
                            }
                        }
                    }

                    return newPageData
                })
            }
            else {
                setPageData(prev => {
                    let newPageData = [...prev]
                    newPageData[selectedControl] = {
                        ...newPageData[selectedControl],
                        properties: {
                            ...pageData[selectedControl]?.properties,
                            [key]: {
                                value: inputValue,
                                options: options
                            }
                        }
                    }

                    return newPageData
                })
            }
        }
    }, [inputValue, options]);


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
const Property = ({ property, pageData, setPageData, selectedControl, property_key }) => {

    return (
        <div className="w-full bg-[#FCF9EE] rounded p-4 my-4 flex-col items-center justify-between border border-[#F9EFDE]">
            <div className="">
                {property?.label}
            </div>
            <div className="w-">
                <PropertyInput type={property?.type} property_key={property_key} property={property} pageData={pageData} setPageData={setPageData} selectedControl={selectedControl} />
            </div>
        </div>
    )


}

const EditorTopBar = ({ editorId }) => {
    return (
        <div className="w-full sticky top-0 border-b border-[#E9E9E9] p-4 bg-[#FFFFFF] rounded">
            <div className="w-full flex justify-between">
                <p className="text-[#4D4D4D] font-semibold text-lg">Editor</p>
                <Link to={"/builder/viewform?id=" + editorId}>
                    <button className="justify-center items-center bg-[#FCF9EE] rounded flex flex-col items-left border border-[#F9EFDE] font-bold text-[#FFF] px-4 py-2 text-center text-sm border border-[#E9E9E9] rounded-lg w-fit bg-[#F29900]">
                        Preview
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default Editor