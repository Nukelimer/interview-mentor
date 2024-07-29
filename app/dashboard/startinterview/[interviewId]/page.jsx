"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/DB";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Loader, Spline, SplineIcon, WebcamIcon } from "lucide-react";
import MockInterviewSchema from "../../../../utils/Schema";

import { MdClose } from "react-icons/md";
import Link from "next/link";

function InterviewID({ params }) {
  const [fetchedResult, setFetchedResult] = useState(null);
  const [webCamToggle, setWebCamToggle] = useState(false);
  const [banner, setBanner] = useState(true);
  console.log(fetchedResult);
  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterviewSchema)
      .where(eq(MockInterviewSchema.mockID, params.interviewId));

    setFetchedResult(result[0]);
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto  max-w-[1000px] px-6 md:px-0">
      <h2 className="my-12 font-bold capitalize text-xl ">
        Begin your Interview!
      </h2>
      <div className="md:flex md:gap-7 md:flex-row-reverse justify-center items-center mx-auto">
        <div className=" md:w-1/2 flex flex-col">
          <div className="rounded-lg p-4 cursor-pointer bg-blue-50 flex justify-center items-center shadow-md">
            {webCamToggle ? (
              <Webcam
                mirrored={true}
                onUserMedia={() => setWebCamToggle(true)}
                onUserMediaError={() => setWebCamToggle(false)}
              />
            ) : (
              <WebcamIcon
                size={300}
                color="green"
                className=" animate-pulse p-5  bg-blue-50"
              />
            )}
          </div>
          <button
            onClick={() => setWebCamToggle(!webCamToggle)}
            className=" w-fit mx-auto py-4 px-8 rounded-xl my-6 bg-green-600 text-white">
            Click to{" "}
            {webCamToggle ? "Turn off your Camera" : "Turn on your Camera"}
          </button>
        </div>

        <div className="flex md:w-1/2 justify-center items-center flex-col-reverse">
          {fetchedResult ? (
            <div className="py-2 shadow-md font-light text-sm ">
              <h2
                className="py-3 border px-2
            ">
                Job Position:{" "}
                <span className="font-bold">{fetchedResult.jobPosition}.</span>
              </h2>
              <h3
                className="py-3 border px-2
            ">
                Job Description:{" "}
                <span className="font-bold">
                  {fetchedResult.jobDescription}.
                </span>
              </h3>

              <h3
                className="py-3 border px-2
            ">
                Technologies:{" "}
                <span className="font-bold">{fetchedResult.Technologies}.</span>
              </h3>

              <h3
                className="py-3 border px-2
            ">
                Interview is Created By:{" "}
                <span className="font-bold">{fetchedResult.createdBy}.</span>
              </h3>

              <h3
                className="py-3 border px-2
            ">
                Interview was made on :{" "}
                <span className="font-bold">{fetchedResult.createdAt}.</span>
              </h3>
            </div>
          ) : (
            <p>
              <Loader color="green " size={50} className="animate-spin" />
            </p>
          )}

          {banner && (
            <p className=" shadow-md bg-green-300 border rounded my6 p-4 flex relative">
              <span className="mt-4 px-4 text-justify">
                {" "}
                Interview Mentor Requires you to allow camera access. Don’t
                worry— your face won’t be recorded or saved. Interview Mentor
                use the camera to make sure you’re there and focused and assess
                your perfomance during the interview. Thanks for helping us keep
                things running smoothly! 😊
              </span>
              <MdClose
                className="absolute right-2 top-2"
                size={25}
                onClick={() => setBanner(false)}
              />
            </p>
          )}
        </div>
      </div>
      {webCamToggle && (
        <Link
          href={`${fetchedResult.mockID}/start`}>
          <button className=" w-fit py-4 px-8 rounded-xl my-6 bg-green-600 text-white">
            Click to Start.
          </button>
        </Link>
      )}
    </div>
  );
}

export default InterviewID;
