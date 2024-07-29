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
import ToastIM from "../../../../../components/Toast";
import { chatSession } from "../../../../../../utils/AIModelAPI";

export default function RecordAnswer({ mockQuestion, activeQuestion }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [recording, setRecording] = useState(false);
  const [transcribedResult, setTranscribedResult] = useState("");
  const [showMicToast, setShowMicToast] = useState(false);
  const [showShortRecordingToast, setShowShortRecordingToast] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // console.log("Listening state:", transcribedResult);
  }, [listening]);

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (err) {
      return false;
    }
  };

  const startListening = async () => {
    const permissionGranted = await checkMicrophonePermission();
    if (!permissionGranted) {
      console.log("Mic not enabled");
      setShowMicToast(true);
      setTimeout(() => setShowMicToast(false), 3000);
      return;
    }

    setRecording(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = async () => {
    setRecording(false);
    setTranscribedResult(transcript);
    SpeechRecognition.stopListening();

    if (transcript.length < 20) {
      setShowShortRecordingToast(true);
      setTimeout(() => setShowShortRecordingToast(false), 3000);
      return;
    }

    const postSchematoAPI = `Question: ${mockQuestion[activeQuestion]?.question}, User Response ${transcribedResult}, using the User response provided, give a rating based on their performance, rating should be on a scale of 1-10. In addition, provide feedback for their overall performance and areas, they need to improve on in answering the question. The feedback on where to improve on should be less than 80 words, provide the rating in JSON format: rating and feedback.`;

    const postData = await chatSession.sendMessage(postSchematoAPI);
    const result = postData.response
      .text()
      .replace("```json", "")
      .replace("```", "");
const  jsonResult = JSON.parse(result)
    // console.log("response", result);
  };



  if (!isClient) {
    return <div>Loading...</div>;
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  console.log("transcribed text:", transcript);

  return (
    <div className="flex items-center flex-col self-stretch justify-between">
      <div className="flex flex-col justify-center item-center relative">
        <Image
          src={"../../../../../../image/webcam.svg"}
          priority
          className="absolute"
          alt={"web cam"}
          width={200}
          height={200}
        />
        <Webcam
          className=""
          mirrored
          style={{
            height: 330,
            width: 300,
            borderRadius: "10px",
            zIndex: 10,
          }}
        />
      </div>
      <div className="flex flex-col gap-7 mt-5 pb-6">
        <p className="flex items-center">
          Mic Status: {listening ? <FaMicrophone /> : <BsFillMicMuteFill />}
        </p>
        <div className="flex justify-between space-x-7">
          <Button
            className={`bg-green-400 ${recording ? "animate-pulse" : null}`}
            onClick={startListening}>
            {recording ? "Recording" : " Start"}
          </Button>
          <Button className="bg-red-400" onClick={stopListening}>
            Stop and Send.
          </Button>
          <Button className="bg-yellow-400" onClick={resetTranscript}>
            Reset
          </Button>
        </div>
        <p className="border rounded p-2">{transcript}.</p>
      </div>
      {showMicToast && (
        <ToastIM
          text={"Microphone permission is required to record your response!"}
        />
      )}{" "}
      {showShortRecordingToast && (
        <ToastIM
          text={"Your response is too short to be, record another!"}
        />
      )}
    </div>
  );
}
