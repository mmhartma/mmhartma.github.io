"use client";

import Background from "./background";

import { useState } from "react"

import { Eye, EyeClosed, Plus, Minus, Mail, Phone, Linkedin, Github } from 'lucide-react';
import { HighSchool_Description, ECC_Description, UB_Description, Future_Description, LaBella_Description, UBResearch_Description} from "./descriptions";

const CHAPTERS = ["High School", "Erie Community College", "University at Buffalo", "Future"]
const CHAPTER_DESCRIPTIONS = {
  "High School": <HighSchool_Description/>,
  "Erie Community College": <ECC_Description/>,
  "University at Buffalo": <UB_Description/>,
  "Future": <Future_Description/>,
}

const EXPERIENCE = ["La Bella Sicilia", "University at Buffalo (Research)"]
const EXPERIENCE_DESCRIPTIONS = {
  "La Bella Sicilia": <LaBella_Description/>,
  "University at Buffalo (Research)": <UBResearch_Description/>
}

export default function Home() {
  let [visible, setVisibility] = useState(true)
  let [chapter, setChapter] = useState(null)
  let [experience, setExperience] = useState(null)

  return (
    <div class="relative max-h-screen overflow-auto">
      <Background class="absolute inset-0" />
      <button class="absolute right-5 top-5 z-50" onClick={()=>{
        setVisibility(!visible)
      }}>
        { visible ? <Eye size={32}/> : <EyeClosed size={32}/>}
      </button>
      <div class="flex py-12 max-h-90 overflow-auto justify-center min-h-screen relative transition-all duration-200 delay-100" style={{ opacity: visible ? 1 : 0 }}>
        <div class="w-3/4 p-12 border border-gray-200 rounded-lg shadow-sm dark:bg-blue-900/80 dark:border-white-700 overflow-auto">
          <h1 class="mb-2 text-5xl text-center font-bold tracking-tight text-gray-900 dark:text-white">Marcus Hartman</h1>

          <div class="transition-all ease-in duration-800" 
          style={{ 
            opacity: (chapter == null && experience == null) ? 1 : 0, 
            maxHeight: (chapter == null && experience == null) ? "100%" : "0%"}}
          >
            <p class="text-3xl p-2 font-normal text-center text-gray-700 dark:text-gray-100">cool one liner</p>
            <div class="flex justify-center space-x-6 mt-4">
              <a href="mailto:marcushartman795@gmail.com" class="border-white border-4 rounded p-1 hover:bg-white">
                <Mail/>
              </a>
              <a href="tel:+17169970154" class="border-white border-4 rounded p-1 hover:bg-white">
                <Phone/>
              </a>
              <a href="https://github.com/mmhartma" target="_blank" class="ml-8 border-white border-4 rounded p-1 hover:bg-white">
                <Github/>
              </a>
              <a href="https://www.linkedin.com/in/mmhartma/" target="_blank" class="border-white border-4 rounded p-1 hover:bg-white">
                <Linkedin/>
              </a> 
            </div>
          </div>

          <hr class="my-8"/>
          <p class="text-4xl font-normal text-center text-gray-700 pb-8 dark:text-white">My Journey (So Far)</p>


          {
            CHAPTERS.map((c) => {
              return(
                <div class="bg-gray-900 p-4 rounded-xl mb-4" key={c}>
                  <div class="flex justify-between items-center cursor-pointer" onClick={() => {
                    setChapter(chapter == c ? null : c)
                  }}>
                    <h3 class="text-xl font-semibold">{c}</h3>
                    { chapter == c ? <Minus size={24}/> : <Plus size={24}/> }
                    
                  </div>
                  <div class="transition-all duration-700 delay-100 ease-in overflow-hidden" style={{maxHeight: chapter == c ? "300px" : "0px"}}>
                    {CHAPTER_DESCRIPTIONS[c]}
                  </div>
              </div>
              )
            })
          }
          <hr class="my-8"/>
          <p class="text-4xl font-normal text-center text-gray-700 pb-8 dark:text-white">Experience</p>
          
          {
            EXPERIENCE.map((e) => {
              return(
                <div class="bg-gray-900 p-4 rounded-xl mb-4" key={e}>
                  <div class="flex justify-between items-center cursor-pointer" onClick={() => {
                    setExperience(experience == e ? null : e)
                  }}>
                    <h3 class="text-xl font-semibold">{e}</h3>
                    { experience == e ? <Minus size={24}/> : <Plus size={24}/> }
                    
                  </div>
                  <div class="transition-all duration-700 delay-100 ease-in overflow-hidden" style={{maxHeight: experience == e ? "300px" : "0px"}}>
                    {EXPERIENCE_DESCRIPTIONS[e]}
                  </div>
              </div>
              )
            })
          }
        </div>
      </div>
    </div>
    
  );
}
