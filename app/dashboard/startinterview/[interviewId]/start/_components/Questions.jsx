// 'use client'

import { LightbulbIcon, Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { GrHide } from "react-icons/gr";
import { BiShow } from "react-icons/bi";
import { MdPhoneInTalk } from "react-icons/md";

function Questions({ mockQuestion, activeQuestion, setactiveQuestion }) {
  const [ToggleNotification, setToggleNotification] = useState(true);
  const [toolTip, settoolTip] = useState(false);
  // console.log(mockQuestion);

  const textToSpeechHandler = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      return <p>Text to speech is not supported in this browser.</p>;
    }
  };
  return (
    <div className="p-5 rounded-xl border w-full   ">
      <div className=" mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center place-items-center gap-5 pt-32 h-24 overflow-y-scroll ">
        {mockQuestion
          ? mockQuestion.map((question, idx) => (
              <div key={idx}>
                <h2
                  onClick={() => setactiveQuestion(idx)}
                  className={`text-xs cursor-pointer text-center bg-gray-200 px-4 py-2 rounded-full ${
                    activeQuestion === idx ? "bg-green-500 text-white" : ""
                  }`}>
                  Question {idx + 1}
                </h2>
              </div>
            ))
          : Array.from({ length: 10 }).map((_, idx) => (
              <Loader2Icon
                key={idx}
                color="green"
                size={50}
                className="animate-spin"
              />
            ))}
      </div>
      {mockQuestion && (
        <>
          <h2 className=" py-6 border-t">
            {mockQuestion[activeQuestion]?.question}
          </h2>
          <div
            className="flex gap-4"
            onMouseOut={() => {
              settoolTip(false);
            }}
            onMouseOver={() => {
              settoolTip(true);
            }}>
            {" "}
            <MdPhoneInTalk
              size={30}
              className="mb-4 cursor-pointer "
              color="green"
              onClick={() => {
                textToSpeechHandler(mockQuestion[activeQuestion]?.question);
              }}
            />
            {toolTip ? (
              <p className="text-sm shadow-2xl h-fit py-1 px-2 bg-green-400 rounded rounded-bl-md">
                Read text out.
              </p>
            ) : null}
          </div>
        </>
      )}
      <div className="">
        {ToggleNotification ? (
          <div className="border rounded-xl bg-green-100 text-sm p-2 from-teal-100 to-green-200 transition-all ease-in-out opacity-100 max-h-96">
            <div className="w-full flex justify-between items-center mb-3">
              <div className="flex items-center">
                <LightbulbIcon color="green" className="animate-pulse mr-1" />
                <span className="inline font-bold">NB:</span>
              </div>
              <GrHide
                className="cursor-pointer"
                size={30}
                color="green"
                onClick={() => {
                  setToggleNotification(!ToggleNotification);
                }}
              />
            </div>
            <h2>
              Click the <strong>Record Button</strong> when you want to give the
              question a shot. Upon submission, we will give you the feedback
              with the correct answer for the sake of comparison.
            </h2>
          </div>
        ) : (
          <div className="flex justify-end transition-all duration-100 ease-in">
            <BiShow
              color="green"
              size={30}
              className="cursor-pointer"
              onClick={() => {
                setToggleNotification(!ToggleNotification);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Questions;
