import React from 'react'

const PersonModal = ({ people }) => {
    // Object to array
    people = Object.values(people)
    console.log("People at modal", people)
    return (
        <div className='w-[300px]'>
            <div className=''>Filter the board by people</div>
            <div className='w-full h-[1px] bg-[#E9E9E9]' />
            <div>
                {people.map((person, index) => {
                    return (
                        <PeopleCard key={index} people={person} />
                    )
                })}
            </div>
        </div>
    )
}

const PeopleCard = ({ people }) => {
    return (
        <div className='w-full p-2 border-b border-[#E9E9E9]'>
            <div className='flex flex-row items-center'>
                <img src={people?.profile_image} className='w-12 h-12 rounded-full' />
                <div className='ml-4'>
                    <span className='font-bold'>{people?.name}</span>
                </div>
            </div>
        </div>
    )
}

export default PersonModal