"use client";

import Background from "./components/background";
import Intro from "./components/intro";


export default function Home() {

  return (
    <div className="min-h-full">
      
      <Background className="absolute inset-0 "/>

      {/* Main box */}
      <div className="flex">
        { Intro() }
      </div>




    </div>
    
  );
}
