"use client";

import Background from "./background";
import links from "./links";

import { useState } from "react"

import { Eye, EyeClosed, Settings2, Plus, Minus, Mail, Phone, Linkedin, Github } from 'lucide-react';

function Intro(visible) {
  return (
    <div className="flex py-12 max-h-90 overflow-auto justify-center min-h-screen relative transition-all duration-200 delay-100" style={{ opacity: visible ? 1 : 0 }}>
        <div className="w-3/4 p-12 border border-gray-200 rounded-lg shadow-sm bg-blue-900/80 border-white-700 overflow-auto">

          <h1 className="mb-2 text-5xl text-center font-bold tracking-tight text-gray-900 text-white">Marcus Hartman</h1>

          <div className="transition-all ease-in duration-800">
            <p className="text-xl font-normal text-center text-gray-100 text-gray-100">catchline</p>

            {/* Links */}
            <div className="flex justify-center space-x-6 mt-6">
              <a href={links.RESUME} target="_blank" class="block w-fit mx-auto text-center bg-blue-600 text-white text-lg font-semibold px-12 py-2 my-2 rounded-xl shadow-lg hover:bg-blue-300 transition">
                Resume
              </a>

              <a href="mailto:mmhartma@buffalo.edu" className="border-white border-4 rounded p-1 hover:bg-white">
                <Mail/>
              </a>
              <a href="tel:+17169970154" className="border-white border-4 rounded p-1 hover:bg-white">
                <Phone/>
              </a>
              <a href={links.GITHUB} target="_blank" className="ml-8 border-white border-4 rounded p-1 hover:bg-white">
                <Github/>
              </a>
              <a href={links.LINKEDIN} target="_blank" className="border-white border-4 rounded p-1 hover:bg-white">
                <Linkedin/>
              </a> 
            </div>
          </div>
        </div>
      </div>
  )
}

export default function Home() {
  let [visible, setVisibility] = useState(true)
  let [settingsOpen, setSettingsOpen] = useState(false)
  let [settings, setSettings] = useState({
    numNodes: 30,
    lineMaxDistance: 200,
    drag: 0,

    gravityEnabled: false,
    mousePushPower: 150,
    framesPerSecond: 60,

  })

  return (
    <div className="relative max-h-screen overflow-auto">
      
      <Background settings={settings} className="absolute inset-0" />
      
      {/* Top right buttons */}
      <div className="fixed top-4 right-4 flex space-x-3 z-50">
        <button className="z-50" onClick={()=>{
          setVisibility(!visible)
        }}>
          { visible ? <Eye size={32}/> : <EyeClosed size={32}/>}
        </button>
        <button className="z-50" onClick={()=>{
          setSettingsOpen(!settingsOpen)
        }}>
          { settingsOpen ? <Settings2 color={settingsOpen ? "yellow" : "white"} size={32}/> : <Settings2 size={32}/>}
        </button>
      </div>

      {/* Settings menu */}
      <div className="absolute right-5 top-20 p-2 w-50 z-100 bg-blue-950 rounded border border-gray-300 transition-all duration-200 delay-100" style={{ opacity: settingsOpen ? 1 : 0 }}>
        <p className="text-xl text-center">Settings</p>
        <hr className="pb-2"/>
        <label htmlFor="numNodes" className="mb-2 text-md text-justify font-medium text-gray-00">Number of Nodes: {settings.numNodes}</label>
        <input type="range" id="numNodes" min="0" max="60" className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500" value={settings.numNodes} onChange={(e) => {
          setSettings({
            ...settings,
            numNodes: e.target.value
          })
        }}/>
        <label htmlFor="lineDist" className="mb-2 text-md text-justify font-medium text-gray-00">Line Distance: {settings.lineMaxDistance} px</label>
        <input type="range" id="lineDist" min="0" max="500" className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500" value={settings.lineMaxDistance} onChange={(e) => {
          setSettings({
            ...settings,
            lineMaxDistance: e.target.value
          })
        }}/>
        <label htmlFor="drag" className="mb-2 text-md text-justify font-medium text-gray-00">Drag Factor: {settings.drag}</label>
        <input type="range" id="drag" min="0" max="5" step="0.5" className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500" value={settings.drag} onChange={(e) => {
          setSettings({
            ...settings,
            drag: e.target.value
          })
        }}/>
        <div className="flex items-center justify-between gap-x-20 w-full">
          <label htmlFor="drag" className="mb-2 text-md text-justify font-medium text-gray-00">Gravity:</label>
          <input type="checkbox" id="drag" min="0" max="1" step="0.01" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500" checked={settings.gravityEnabled} onChange={(e) => {
            setSettings({
              ...settings,
              gravityEnabled: e.target.checked
            })
          }}/>
        </div>
        <label htmlFor="mousePushPower" className="mb-2 text-md text-justify font-medium text-gray-00">Mouse Push Power: {settings.mousePushPower}</label>
        <input type="range" id="mousePushPower" min="0" max="200" value={settings.mousePushPower} className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500" onChange={(e) => {
          setSettings({
            ...settings,
            mousePushPower: e.target.value
          })
        }}/>
        <label htmlFor="fps" className="mb-2 text-md text-justify font-medium text-gray-00">Frames Per Second: {settings.framesPerSecond}</label>
        <input type="range" id="fps" min="0" max="90" value={settings.framesPerSecond} className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500" onChange={(e) => {
          setSettings({
            ...settings,
            framesPerSecond: e.target.value
          })
        }}/>
      </div>

      {/* Main box */}
      <div className="flex">
        { Intro(visible) }
      </div>




    </div>
    
  );
}
