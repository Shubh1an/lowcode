import React, { useEffect, useState } from 'react'

const AddPageField = ({ field, handleProperties, defaultValue: defaultValueProp }) => {
    const { title: label, type, options, id } = field
    const [defaultValue, setDefaultValue] = useState("")
    useEffect(() => {
        switch (label) {
            case "Display Name":
                setDefaultValue(defaultValueProp?.title)
                break;
            case "Name":
                setDefaultValue(defaultValueProp?.name)
                break;
            case "Description":
                setDefaultValue(defaultValueProp?.description)
                break;
            case "Mandatory":
                setDefaultValue(defaultValueProp?.mandatory)
                break;
            case "Default Value":
                setDefaultValue(defaultValueProp?.defaultValue)
        }
    }, [field, defaultValueProp])

    return (
        <div className="w-full">
            <label className="block mb-2 mt-4 text-lg font-medium text-gray-900 font-bold">{label}</label>
            <InputByType type={type} options={options} id={id} handleProperties={handleProperties} defaultValue={defaultValue} />
        </div>
    )
}

const InputByType = ({ type, options, id, handleProperties, defaultValue }) => {
    switch (type) {
        case "text":
            return <input type="text" className='border border-[#BDD7CF] rounded-lg	bg-[#E9F2EF] w-full py-2 px-4'
                onChange={(e) => {
                    let payload = {
                        id: id,
                        value: e.target.value
                    }
                    handleProperties(payload)
                }}
                value={defaultValue}
            />
        case "radio":
            {
                return <div>
                    {
                        options.map((option, index) => {
                            return (
                                <div className='flex flex-row items-center justify-start ' key={index}>
                                    <input type="radio" className='border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-4 h-4' name={id}
                                        onChange={(e) => {
                                            let payload = {
                                                id: id,
                                                value: e.target.value
                                            }
                                            handleProperties(payload)
                                        }}
                                        checked={defaultValue === option}
                                    />
                                    <span className='ml-2'>{option}</span>
                                </div>
                            )
                        })
                    }
                </div>
            }

        default:
            return <input type="text" />
    }

}

export default AddPageField