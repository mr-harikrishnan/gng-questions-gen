import React from 'react'
import Mcq from './Components/MCQ/Mcq'
import { Formik, useFormik } from 'formik'

function App() {

  const formik = useFormik({
    initialValues: {
      question: "",
      subject: "",
      topic: "",
      options: [
        {
          option: "",
          mark: 0,
          isCorrect: false
        },
        {
          option: "",
          mark: 0,
          isCorrect: false
        }
      ],
      explanation: "",
      tags: [
        "array",
        "  javascript"
      ],
      code: "// Write your code here",
      image: ""
    },
    validate:(values)=>{
      let error={}
    }



  })

  return (
    <div className='h-sfull w-full bg-[#f2f9f9] '>

      {/* HEADLINE */}
      <div >
        <h1 className='bg-[#71C9CE] p-2 font-medium text-3xl text-white text-center font-sans'>Question Generator</h1>
      </div>


      {/* QUESTION */}

      <div className='px-12 pe-24 p-4'>

        <div className='flex flex-col my-2'>
          <label className='text-sm text-gray-500 my-2' >Question </label>
          <input
           type="text"
           name='question'
            className='border-1 h-20 rounded-lg border-gray-400 bg-[#ebf8f8] hover:bg-[#d3f0f3]' />
        </div>

        {/* CHOOSE FILE */}

        <div className="w-full">
          <label htmlFor="file_input" className="flex items-center justify-center w-full px-4 py-3 bg-[#ebf8f8] border border-gray-400 rounded-lg cursor-pointer hover:bg-[#d3f0f3] transition">
            <span className="text-sm text-gray-500">Choose a file </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-4 mx-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>

            <input id="file_input"
             type="file"
             className="hidden" />
          </label>
        </div>

        {/* ADD CODE */}

        <button className="flex text-sm text-gray-500 items-center justify-center w-full px-4 my-2 py-3 bg-[#ebf8f8] border border-gray-400 rounded-lg cursor-pointer hover:bg-[#d3f0f3] transition">
          Add code
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-5 mx-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
          </svg>
        </button>

        {/* CHOOSE SUBJECT*/}

        <div className='flex gap-4 '>
          <div className='w-full'>
            <label className='text-sm text-gray-500 my-2' >Subject </label>
            <select name="" id="" className='appearance-none border w-full text-sm text-gray-500 items-center justify-center  px-4 my-2 py-3 bg-[#ebf8f8]  border-gray-400 rounded-lg cursor-pointer hover:bg-[#d3f0f3] transition'>
            </select>
          </div>

          {/* CHOOSE TOPIC */}


          <div className='w-full'>
            <label className='text-sm text-gray-500 my-2' >Topics </label>
            <select name="" id="" className='appearance-none border w-full text-sm text-gray-500 items-center justify-center  px-4 my-2 py-3 bg-[#ebf8f8]  border-gray-400 rounded-lg cursor-pointer hover:bg-[#d3f0f3] transition'>
            </select>
          </div>

        </div>

        {/* CHOOSE CHOISES */}


        <div>

          <Mcq></Mcq>

        </div>

        {/* EXPLANATIONS */}

        <div className='flex flex-col my-2'>
          <label className='text-sm text-gray-500 my-2' >Explanation</label>
          <input type="text" className='border-1 h-20 rounded-lg border-gray-400 bg-[#ebf8f8] hover:bg-[#d3f0f3]' />
        </div>

        {/* TAG*/}
        <div className='flex flex-col my-2'>
          <label className='text-sm text-gray-500 my-2' >Tag</label>
          <input type="text" className='border-1 h-9 rounded-lg border-gray-400 bg-[#ebf8f8] hover:bg-[#d3f0f3]' />
        </div>

        {/* SUBMIT BTN */}

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button
        </button>


      </div>



      {/* NAVIGATE ROUTES */}


      <div className='fixed z-60 top-60 right-3  p-4 rounded-lg flex flex-col gap-4'>

        <img src="/src/assets/MCQ.png" className='h-8 w-8 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border mx-auto' alt="" />

        <img src="/src/assets//MSQ.png" className='h-8 w-8 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border mx-auto' alt="" />

        <img src="/src/assets/MCQI.png" className='h-8 w-8 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border mx-auto' alt="" />

        <img src="/src/assets//MSQI.png" className='h-8 w-8 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border mx-auto' alt="" />

      </div>




    </div>
  )
}

export default App