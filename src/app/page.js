"use client";

import Background from "./background";

import { useState } from "react"

import { Eye, EyeClosed, Plus, Minus, Mail, Phone, Linkedin, Github } from 'lucide-react';

const CHAPTERS = ["High School", "Erie Community College", "University at Buffalo", "Future"]
const DESCRIPTIONS = {
  "High School": "s",
  "Erie Community College": "s",
  "University at Buffalo": "s",
  "Future": "s",
}

export default function Home() {
  let [visible, setVisibility] = useState(true)
  let [chapter, setChapter] = useState(null)

  return (
    <div class="relative">
      <Background class="absolute inset-0" />
      <button class="absolute right-5 top-5 z-50" onClick={()=>{
        setVisibility(!visible)
      }}>
        { visible ? <Eye size={32}/> : <EyeClosed size={32}/>}
      </button>
      <div class="flex py-12 justify-center min-h-screen relative" style={{visibility: visible ? 'visible' : 'hidden' }}>
        <div class="w-3/4 p-12 border border-gray-200 rounded-lg shadow-sm dark:bg-blue-900/80 dark:border-white-700">
          <h1 class="mb-2 text-5xl text-center font-bold tracking-tight text-gray-900 dark:text-white">Marcus Hartman</h1>
          <p class="text-3xl p-8 font-normal text-center text-gray-700 dark:text-gray-100">cool one liner</p>
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
          <hr class="my-8"/>


          <p class="text-4xl font-normal text-center text-gray-700 pb-8 dark:text-white">My Journey (So Far)</p>


          {
            CHAPTERS.map((c) => {
              return(
                <div class="bg-gray-900 p-4 rounded-xl mb-4">
                  <div class="flex justify-between items-center cursor-pointer" onClick={() => {
                    setChapter(chapter == c ? null : c)
                  }}>
                    <h3 class="text-xl font-semibold">{c}</h3>
                    { chapter == c ? <Minus size={24}/> : <Plus size={24}/> }
                    
                  </div>
                  { chapter == c && (
                      <p class="mt-3 text-gray-300 transition-all duration-3000 ease-in-out">{DESCRIPTIONS[c]}</p>
                    )}
              </div>
              )
            })
          }
          
        </div>
      </div>
    </div>
    
  );
}
