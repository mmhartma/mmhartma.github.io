import links from "../links";

import { Mail, Linkedin, Github } from 'lucide-react';

export default function Intro(zoomedIn) {
  return (
    <div className="flex justify-start px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-slate-900/70 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10" style={{opacity: zoomedIn ? 0 : 1, transition: 'opacity 100ms ease-out'}}>
        <div className="text-left">
          <h1 className="mb-1 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Marcus Hartman
          </h1>

          <p className="mb-4 text-lg font-medium text-sky-500 sm:text-xl">
            Software Engineer
          </p>

          <p className="max-w-xl text-lg text-slate-200 sm:text-xl">
            Building scalable systems, thoughtful interfaces, and everything in between.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={links.RESUME}
              target="_blank"
              className="rounded-full bg-sky-600 px-6 py-2.5 text-base font-semibold text-white shadow-lg shadow-sky-600/20 transition duration-200 hover:bg-sky-500"
            >
              Resume
            </a>

            <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-3 py-2">
              <a href="mailto:mmhartma@buffalo.edu" className="rounded-full p-2 text-white transition duration-200 hover:bg-white/20">
                <Mail size={18} />
              </a>
              <a href={links.GITHUB} target="_blank" className="rounded-full p-2 text-white transition duration-200 hover:bg-white/20">
                <Github size={18} />
              </a>
              <a href={links.LINKEDIN} target="_blank" className="rounded-full p-2 text-white transition duration-200 hover:bg-white/20">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}