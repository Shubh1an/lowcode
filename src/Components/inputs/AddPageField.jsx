import React from 'react'

const AddPageField = ({field, handleProperties}) => {
    const { title: label, type, options, id } = field
    return (
        <div className="w-full">
            <label className="block mb-2 mt-4 text-lg font-medium text-gray-900 font-bold">{label}</label>
            <InputByType type={type} options={options} id={id} handleProperties={handleProperties}/>
        </div>
    )
}

const InputByType = ({ type, options, id, handleProperties }) => {

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