import React, { useState } from 'react'
import McqOptionsCard from './McqOptionsCard'

function Mcq() {

    const [optionCount, setOptionCount] = useState(4)

    return (
        <div>
            <h1 className='text-sm text-gray-500 my-2'>MCQ</h1>

            <div className='flex justify-end'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="size-6 cursor-pointer hover:scale-120">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>

            <div className='grid md:grid-cols-2 gap-6'>

                {Array.from({ length: optionCount }).map((_, index) => (
                    <McqOptionsCard key={index}></McqOptionsCard>
                ))}

            </div>


        </div>
    )
}

export default Mcq