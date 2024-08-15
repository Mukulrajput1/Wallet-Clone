'use client'
import React from "react";
import { useEffect } from "react";
import { useContexter } from "../contexter";
import Image from "next/image";
import Link from "next/link";


function Services() {
  const { setIsActive } = useContexter();
  
  setIsActive(3);

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex flex-col py-12 px-6 sm:px-12 md:px-16 bg-[#1e1e2d]">
      <div className="text-2xl font-bold uppercase">Other Services</div>
      <div className="flex p-10">
        <Link href='/dashboard/services/tubewell'>
        <div className="bg-white h-64 w-52 rounded-xl overflow-hidden shadow-white shadow-md">
          <div>
          <img src="/image/tubewell.webp" className="w-full h-1/2" alt="Tubewell"></img>
          </div>
          <div className="flex justify-center items-center h-1/3">
            <span className="text-black font-bold text-xl uppercase">Tubewell</span>
          </div>
        </div>
        </Link>
        {/* <div className="bg-white">
          <div>
            <img src="/image/tubewell.webp" className="w-full h-1/2" alt="Tubewell"></img>
          </div>
          <div>
            <span>Tubewell</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Services;
