import React from 'react'

const HideModal = ({ hideArray, handleHide, hideColumns }) => {
    return (
        <div className='w-[300px]'>
            <div className=''>Fields</div>
            <div className='w-full h-[1px] bg-[#E9E9E9]' />
            {
                hideArray.map((hideObject, index) => {
                    let checked = !hideColumns.includes(hideObject)
                    return (
                        <Hide key={index} hideObject={hideObject} handleHide={handleHide} checked={checked} />
                    )
                })
            }
        </div>
    )
}

const Hide = ({ hideObject, handleHide, checked }) => {
    return (
        <div className=''>
            <input
                type="checkbox"
                className='border border-[#BDD7CF] rounded-lg bg-[#E9F2EF] w-4 h-4'
                name={hideObject}
                checked={checked}
                onChange={(e) => {
                    handleHide(hideObject, e.target.checked)
                }}
            />
            <label className='ml-2'>{
                hideObject
            }</label>
        </div>
    )
}

export default HideModal