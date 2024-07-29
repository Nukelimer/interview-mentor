"use client";
import "regenerator-runtime/runtime";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "../../../../../../@/components/ui/button";
import { FaMicrophone } from "react-icons/fa";
import { BsFillMicMuteFill } from "react-icons/bs";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function RecordAnswer() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [recording, setRecording] = useState(false);
  const [transcribedResult, setTranscribedResult] = useState("");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    console.log("Listening state:", transcribedResult);
  }, [listening]);

  const startListening = () => {
    setRecording(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setRecording(false);
    setTranscribedResult(transcript);

    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (transcript) {
      console.log("Transcript updated:", transcript);
    }
  }, [transcript]);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  console.log("transcribed text:", transcript);
  return (
    <div className=" flex items-center flex-col self-stretch justify-between">
      <div className="flex flex-col justify-center item-center relative">
        <Image
          src={"../../../../../../image/webcam.svg"}
          priority
          className="absolute   "
          alt={"web cam"}
          width={200}
          height={200}
        />
        <Webcam className=" "
          mirrored
          style={{
            height: 330,
            width: 300,
            borderRadius: "10px",
            zIndex: 10,
          }}
        />
      </div>
      {/* <Button className="rounded "  variant="outline">Record Now</Button> */}
      <div className=" flex flex-col gap-7 mt-5 pb-6 ">
        <p className="flex items-center ">
          Mic Status: {listening ? <FaMicrophone /> : <BsFillMicMuteFill />}
        </p>
        <div className=" flex justify-between space-x-7">
          <Button
            className={`bg-green-400 ${recording ? "animate-pulse" : null}`}
            onClick={startListening}>
            {recording ? "Recording" : " Start"}
          </Button>
          <Button className="bg-red-400" onClick={stopListening}>
            Stop
          </Button>
          <Button className="bg-yellow-400" onClick={resetTranscript}>
            Reset
          </Button>
        </div>
        <p className="border rounded p-2">{transcript}.</p>
      </div>
    </div>
  );
}
