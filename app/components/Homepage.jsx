"use client";

import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";

import Link from "next/link";

function Homepage() {

  return (
    <>
      <div className="relative flex justify-center items-center ">
        <div className="absolute cursor-pointer   z-20 flex justify-center flex-col items-center ">
          <p className="text-white px-12 pb-4 text-base text-clip">
            Interview Mentor: Perfect your interview skills with AI mock
            interviews. Nail your next job interview with confidence and
            finesse. Get hired today!
          </p>
          <Link href={"/dashboard"}>
            <button className="py-4 px-6 text-white font-mono  bg-green-400 rounded hover:bg-green-600 cursor-pointer ">
              Take Mock Interview!
            </button>
          </Link>
        </div>

        <VideoPlayer src="../../video/interview.mp4" type="video/mp4" />
      </div>
    </>
  );
}

export default Homepage;
