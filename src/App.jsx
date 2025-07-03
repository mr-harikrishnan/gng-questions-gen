import React, { useState } from 'react'
import Mcq from './Components/MCQ/Mcq'
import { Formik, useFormik } from 'formik'
import CodeEditor from './Components/Code-Editor/CodeEditor'
import DragAndDrop from './Components/Drag-And-Drop/DragAndDrop'


function App() {
  const [showEditor, setShowEditor] = useState(false)
  const [code, setCode] = useState("Write your Code...")


  const formik = useFormik({
    initialValues: {
      question: "",
      image: null,
      code: code,
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
      tags: []
    },
    validate: (values) => {
      let error = {}


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
            value={formik.values.question}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='border-1 h-20 rounded-lg border-gray-400 bg-[#ebf8f8] hover:bg-[#d3f0f3]'

          />
          {formik.touched.question && formik.errors.question && (
            <span className="text-red-500 text-sm">{formik.errors.question}</span>
          )}
        </div>

        {/* CHOOSE FILE */}
        <DragAndDrop formik={formik}></DragAndDrop>



        {/* ADD CODE */}

        <button
          onClick={() => {
            setShowEditor(!showEditor)
          }}
          className="flex text-sm text-gray-500 items-center justify-center w-full px-4 my-2 py-3 bg-[#ebf8f8] border border-gray-400 rounded-lg cursor-pointer hover:bg-[#d3f0f3] transition">
          Add code
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-5 mx-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
          </svg>
        </button>
        {showEditor &&
          <CodeEditor code={formik.values.code} setCode={(val) => {
            formik.setFieldValue('code', val)
          }}></CodeEditor>
        }

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

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button
        </button>


      </div>



      {/* NAVIGATE ROUTES */}


      <div className='fixed z-60 top-60 right-3  p-4 rounded-lg flex flex-col gap-4'>

        <img src="/src/assets/MCQ.png" className='h-10 w-10 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border border-gray-300 mx-auto' alt="" />

        <img src="/src/assets//MSQ.png" className='h-10 w-10 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border border-gray-300 mx-auto' alt="" />

        <img src="/src/assets/MCQI.png" className='h-10 w-10 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border border-gray-300 mx-auto' alt="" />

        <img src="/src/assets//MSQI.png" className='h-10 w-10 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border border-gray-300 mx-auto' alt="" />

      </div>




    </div>
  )
}

export default App