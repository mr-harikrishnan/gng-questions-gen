import React, { Suspense, useState } from 'react'
import { Formik, useFormik } from 'formik'
import CodeEditor from './Components/Code-Editor/CodeEditor'
import DragAndDrop from './Components/Drag-And-Drop/DragAndDrop'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'


import MCQ from './assets/MCQ.png'
import MSQ from './assets/MSQ.png'
import MCQI from './assets/MCQI.png'
import MSQI from './assets/MSQI.png'
import NTQ from './assets/NTQ.png'

const Mcq = React.lazy(() => import('./Components/MCQ/Mcq'))
const Msq = React.lazy(() => import('./Components/MSQ/Msq'))
const McqImage = React.lazy(() => import('./Components/MCQI/McqImage'))
const MsqImage = React.lazy(() => import('./Components/MSQI/MsqImage'))
const Ntq = React.lazy(() => import('./Components/NTQ/Ntq'))


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
      questionsType: "mcq",
      explanation: "",
      tags: []
    },
    validate: (values) => {

      const errors = {};



      // Question
      if (!values.question || values.question.trim().length < 5) {
        errors.question = "Please enter minimum 5 letters";
      }

      // Explanation
      if (!values.explanation || values.explanation.trim().length < 5) {
        errors.explanation = "Please enter minimum 5 letters";
      }

      // Tags
      if (values.tags.length < 2) {
        errors.tags = "Please enter minimum 2 tags ";
      }

      const optionErrors = []
      // Options Validation
      values.options.map((opt) => {
        const err = {};

        if (!opt.option || opt.option.trim() === "") {
          if (values.questionsType == "mcq" || values.questionsType == "msq") {
            err.option = "Please enter option";
          }

          if (values.questionsType == "mcqImage" || values.questionsType == "msqImage") {
            err.option = "Please add image in your option";

          }
        }

        // Only push if there is actually an error
        if (Object.keys(err).length > 0) {
          optionErrors.push(err);
        } else {
          optionErrors.push(null); // or undefined if preferred
        }
      });

      // Add option errors only if there's any
      if (optionErrors.some((e) => e)) {
        errors.options = optionErrors;
      }


      return errors;
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

  const addNewTag = (tags) => {
    if (tags.includes(",")) {
      let newTags = tags.split(",").map(tag => tag.trim()); // clean whitespace
      formik.setFieldValue("tags", [...newTags]);
    }
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
            <Suspense fallback={<div>Loading...</div>}> {formik.values.questionsType == "mcq" ? <Mcq formik={formik} ></Mcq> : null} </Suspense>
            <Suspense fallback={<div>Loading...</div>}> {formik.values.questionsType == "msq" ? <Msq formik={formik}></Msq> : null} </Suspense>
            <Suspense fallback={<div>Loading...</div>}> {formik.values.questionsType == "mcqImage" ? <McqImage formik={formik}></McqImage> : null} </Suspense>
            <Suspense fallback={<div>Loading...</div>}> {formik.values.questionsType == "msqImage" ? <MsqImage formik={formik}></MsqImage> : null} </Suspense>
            <Suspense fallback={<div>Loading...</div>}> {formik.values.questionsType == "ntq" ? <Ntq formik={formik}></Ntq> : null} </Suspense>

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

              onChange={(e) => {
                formik.handleChange(e)
                addNewTag(e.target.value)
              }}
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
        {/* mcq */}
        <img onClick={() => {
          if (formik.values.questionsType != "mcq") {
            const permission = window.confirm("Switching options will clear the previous options. Continue?");
            if (permission) {
              formik.setFieldValue("options", [])
              formik.setFieldValue("questionsType", "mcq")
            }
          }
        }} src={MCQ} className='h-10 w-10 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border border-gray-300 mx-auto' alt=""
        />



        {/* msq */}

        <img onClick={() => {
          if (formik.values.questionsType != "msq") {
            const permission = window.confirm("Switching options will clear the previous options. Continue?");
            if (permission) {
              formik.setFieldValue("options", [])
              formik.setFieldValue("questionsType", "msq")
            }
          }
        }

        } src={MSQ} className='h-10 w-10 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border border-gray-300 mx-auto' alt=""
        />



        {/* mcqimage */}
        <img onClick={() => {
          if (formik.values.questionsType != "mcqImage") {
            const permission = window.confirm("Switching options will clear the previous options. Continue?");
            if (permission) {
              formik.setFieldValue("options", [])
              formik.setFieldValue("questionsType", "mcqImage")
            }
          }

        }

        } src={MCQI} className='h-10 w-10 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border border-gray-300 mx-auto' alt=""
        />





        {/* msqimage */}
        <img onClick={() => {
          if (formik.values.questionsType != "msqImage") {
            const permission = window.confirm("Switching options will clear the previous options. Continue?");
            if (permission) {
              formik.setFieldValue("options", [])
              formik.setFieldValue("questionsType", "msqImage")
            }
          }

        }

        } src={MSQI} className='h-10 w-10 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border border-gray-300 mx-auto' alt=""
        />

        {/* ntq*/}
        <img onClick={() => {
          if (formik.values.questionsType != "ntq") {
            const permission = window.confirm("Switching options will clear the previous options. Continue?");
            if (permission) {
              formik.setFieldValue("options", [])
              formik.setFieldValue("questionsType", "ntq")
            }
          }

        }

        } src={NTQ} className='h-10 w-10 cursor-pointer hover:border-3  hover:border-[#71C9CE] rounded border border-gray-300 mx-auto' alt=""
        />



      </div>




    </div>
  )
}

export default App