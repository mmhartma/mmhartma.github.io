"use client";

import Background from "./components/background";
import Intro from "./components/intro";

import { useState } from "react";

export default function Home() {

  let [zoomedIn, setZoomedIn] = useState(false);
  return (
    <div className="relative min-h-screen overflow-hidden">
      
        <Background setZoomedIn={setZoomedIn} className="absolute inset-0 "/>

        {/* Main box */}
        <div className="flex">
          { Intro(zoomedIn) }
        </div>




    </div>
    
  );
}
