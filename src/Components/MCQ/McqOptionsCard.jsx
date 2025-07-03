import React, { useState } from 'react'

function McqOptionsCard() {

    const [isAnswer, setIsAnswer] = useState(false)
    const TogglesetIsAnswer = () => {
        setIsAnswer(!isAnswer)
        console.log(isAnswer)
    }

    return (
        <div>

            <div className='flex items-center gap-3'>
                <h1 className='text-sm text-gray-500 my-2'>Option 1</h1>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="red" className="size-5 cursor-pointer hover:scale-120">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </div>

            <div className='flex gap-4' >
                <label className="inline-flex items-center cursor-pointer">
                    <input onClick={TogglesetIsAnswer} type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#71C9CE] "></div>
                </label>

                <div className='w-full'>
                    <input name="" id="" className='appearance-none border w-full text-sm text-gray-500 items-center justify-center  px-4 my-2 py-3 bg-[#ebf8f8]  border-gray-400 rounded-lg cursor-pointer hover:bg-[#d3f0f3] transition'>
                    </input>
                </div>

                <div className='w-14 appearance-none border text-md text-gray-500 flex items-center justify-center   my-2  bg-[#ebf8f8]  border-gray-400 rounded-lg cursor-pointer hover:bg-[#d3f0f3] transition'>
                    10
                </div>
            </div>



        </div>
    )
}

export default McqOptionsCard