import React, { useState } from 'react'
import Mcq from './Components/MCQ/Mcq'
import { Formik, useFormik } from 'formik'
import CodeEditor from './Components/Code-Editor/CodeEditor'
import DragAndDrop from './Components/Drag-And-Drop/DragAndDrop'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Msq from './Components/MSQ/Msq'
import McqImage from './Components/MCQI/McqImage'
import MsqImage from './Components/MSQI/MsqImage'


function App() {

  const subjectsArray = [
    {
      subject: "Science",
      topics: ["Physics", "Chemistry", "Biology"]
    },
    {
      subject: "Programming",
      topics: ["Variables", "Functions", "Loops"]
    },
    {
      subject: "Problem Solving",
      topics: ["Patterns", "Recursion", "Algorithms"]
    }
  ];

  const [showEditor, setShowEditor] = useState(false)
  const [code, setCode] = useState("Write your Code...")
  const [subject, setSubject] = useState("science")
  const [topics, setTopics] = useState(["Physics", "Chemistry", "Biology"])



  const formik = useFormik({
    initialValues: {
      question: "",
      image: null,
      code: code,
      subject: `${subjectsArray[0].subject}`,
      topic: `${subjectsArray[0].topics[0]}`,
      options: [],
      questionsType:"msq",
      explanation: "",
      tags: []
    },
    validate: (values) => {
      let errors = {}

      // Validate question
      if (!values.question) {
        errors.question = "Please enter question"
      } else if (values.question.length < 5) {
        errors.question = "Please enter minimum 5 letters"
      }

      // explanation 
      if (!values.explanation) {
        errors.explanation = "Please enter explanation"
      } else if (values.explanation.length < 5) {
        errors.explanation = "Please enter minimum 5 letters"
      }

      // Tags
      if (!values.tags) {
        errors.tags = "Please enter tags"
      } else if (values.tags.length < 5) {
        errors.tags = "Please enter minimum 5 letters"
      }


      const optionErrors = []

      values.options.forEach((opt, idx) => {

        if (values.options[0].option === "") {
          const optErr = {}
          if (!opt.option || opt.option.trim() === "") {
            optErr.option = "Please enter option"
          } else if (opt.option.trim().length < 1) {
            optErr.option = "Minimum 1 character"
          }
          optionErrors.push(optErr)
        }

        // optionImageUrl
        if (values.options[0].optionImageUrl === "") {
          const optErr = {}
          if (!opt.optionImageUrl || opt.optionImageUrl.trim() === "") {
            optErr.optionImageUrl = "Please add image in options"
          }
          optionErrors.push(optErr)
        }

      })

      const hasOptionError = optionErrors.some(err => Object.keys(err).length > 0)
      if (hasOptionError) {
        errors.options = optionErrors
      }
      console.log(errors)
      return errors

    }
    ,
    onSubmit: (values) => {
      console.log(values)
    }



  })


  const setTopicSelectedSubject = (value) => {
    subjectsArray.map((sub, index) => {
      if (sub.subject == value) {
        setTopics([...sub.topics])


      }

    })


  }

  


  return (
    <div className='h-full w-full bg-[#f2f9f9] '>

      {/* HEADLINE */}
      <div >
        <h1 className='bg-[#71C9CE] p-2 font-medium text-3xl text-white text-center font-sans'>Question Generator</h1>
      </div>


      {/* QUESTION */}
      <form className=' pr-14 p-4' onSubmit={formik.handleSubmit}>
        <div className=' p-4'>

          <div className='flex flex-col my-2'>
            <label className='text-sm text-gray-500 my-2 ' >Question </label>
            <input
              type="text"
              name='question'
              value={formik.values.question}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Write Your Question'
              className='border-1 h-20 rounded-lg pl-2 placeholder-gray-400 border-gray-400 bg-[#ebf8f8] hover:bg-[#d3f0f3]'

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
              <select
                onChange={(e) => {
                  formik.handleChange(e)
                  setTopicSelectedSubject(e.target.value)
                  formik.setFieldValue('subject', e.target.value)
                }}
                name="" id="" className='appearance-none border w-full text-sm text-gray-500 items-center justify-center  px-4 my-2 py-3 bg-[#ebf8f8]  border-gray-400 rounded-lg cursor-pointer hover:bg-[#d3f0f3] transition'>
                <option disabled >Select Subject</option>
                {subjectsArray.map((sub, index) => {
                  return <option key={index} value={sub.subject}>{sub.subject}</option>
                })}
              </select>
            </div>

            {/* CHOOSE TOPIC */}


            <div className='w-full'>
              <label className='text-sm text-gray-500 my-2' >Topics </label>
              <select
                onChange={(e) => {
                  formik.setFieldValue('topic', e.target.value)

                }}
                name="" id="" className='appearance-none border w-full text-sm text-gray-500 items-center justify-center  px-4 my-2 py-3 bg-[#ebf8f8]  border-gray-400 rounded-lg cursor-pointer hover:bg-[#d3f0f3] transition'>
                <option disabled >Select Topic</option>
                {topics.map((top, index) => {
                  return <option key={index} value={top}>{top}</option>
                })}
              </select>
            </div>

          </div>


          {/* CHOOSE CHOISES */}


          <div>

            {formik.values.questionsType == "mcq" ? <Mcq formik={formik} ></Mcq> : null}
            {formik.values.questionsType == "msq" ? <Msq formik={formik}></Msq> : null}
            {formik.values.questionsType == "mcqImage" ? <McqImage formik={formik}></McqImage> : null}
            {formik.values.questionsType == "msqImage" ? <MsqImage formik={formik}></MsqImage> : null}

          </div>

          {/* EXPLANATIONS */}

          <div className='flex flex-col my-2'>
            <label className='text-sm text-gray-500 my-2' >Explanation</label>
            <input
              name='explanation'
              value={formik.values.explanation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder='Add your exlanations'
              className='border-1 h-20 pl-2 rounded-lg placeholder-gray-400 border-gray-400 bg-[#ebf8f8] hover:bg-[#d3f0f3]'
            />
            {formik.touched.explanation && formik.errors.explanation && (
              <span className="text-red-500 text-sm">{formik.errors.explanation}</span>
            )}
          </div>

          {/* TAG*/}
          <div className='flex flex-col my-2'>
            <label className='text-sm text-gray-500 my-2' >Tag</label>
            <input
              name='tags'
              value={formik.values.tags}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} type="text"
              placeholder='Add your tags'
              className='border-1 pl-2 h-9  placeholder-gray-400 rounded-lg border-gray-400 bg-[#ebf8f8] hover:bg-[#d3f0f3]'
            />
            {formik.touched.tags && formik.errors.tags && (
              <span className="text-red-500 text-sm">{formik.errors.tags}</span>
            )}
          </div>

          {/* SUBMIT BTN */}

          <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Button
          </button>


        </div>
      </form>






      {/* NAVIGATE */}


      <div className='fixed z-60 top-60 right-1  p-4 rounded-lg flex flex-col gap-4'>

        <img onClick={() => { formik.setFieldValue("questionsType","mcq") }} src="/src/assets/MCQ.png" className='h-10 w-10 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border border-gray-300 mx-auto' alt="" />

        <img onClick={() => { formik.setFieldValue("questionsType","msq")}} src="/src/assets//MSQ.png" className='h-10 w-10 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border border-gray-300 mx-auto' alt="" />

        <img onClick={() => {  formik.setFieldValue("questionsType","mcqImage")}} src="/src/assets/MCQI.png" className='h-10 w-10 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border border-gray-300 mx-auto' alt="" />

        <img onClick={() => { formik.setFieldValue("questionsType","msqImage")}} src="/src/assets//MSQI.png" className='h-10 w-10 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border border-gray-300 mx-auto' alt="" />

      </div>




    </div>
  )
}

export default App