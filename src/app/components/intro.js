import links from "../links";

import { Mail, Phone, Linkedin, Github } from 'lucide-react';

export default function Intro() {
  return (
    <div className="flex py-12 max-h-90 overflow-auto justify-center min-h-screen relative transition-all duration-200 delay-100">
        <div className="w-3/4 p-12 border border-gray-200 rounded-lg shadow-sm bg-blue-900/80 border-white-700 overflow-auto">

          <h1 className="mb-2 text-5xl text-center font-bold tracking-tight text-gray-900 text-white">Marcus Hartman</h1>

          <div className="transition-all ease-in duration-800">
            <p className="text-xl font-normal text-center text-gray-100 text-gray-100">catchline</p>

            {/* Links */}
            <div className="flex justify-center space-x-6 mt-6">
              <a href={links.RESUME} target="_blank" className="block w-fit mx-auto text-center bg-blue-600 text-white text-lg font-semibold px-12 py-2 my-2 rounded-xl shadow-lg hover:bg-blue-300 transition">
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