"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/DB";

import { InterViewMentorSchema } from "../../../../../utils/Schema";
import { eq } from "drizzle-orm";

import Questions from "./_components/Questions";
import RecordAnswer from "./_components/RecordAnswer";
import { Button } from "../../../../../@/components/ui/button";
import Link from "next/link";

function Start({ params }) {
  const [mockQuestion, setMockQuestion] = useState();
  const [activeQuestion, setactiveQuestion] = useState(0);
  const [mockInterviewData, setMockInterviewData] = useState();
  const [isClient, setIsClient] = useState(false);
  // console.log('Mock Q',mockQuestion);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(InterViewMentorSchema)
      .where(eq(InterViewMentorSchema.mockID, params?.interviewId));
    const jsonResponse = JSON.parse(result[0].jsonMockInterviewResponse);

    setMockQuestion(jsonResponse.questions
    );
    // console.log('Mock Response ',jsonResponse.questions
    // );


    
    setMockInterviewData(result[0]);
  };

  return (
    <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:px-24 self-stretch md:mt-6 md:space-x-32 mx-10 ">
      <Questions
        mockQuestion={mockQuestion}
        activeQuestion={activeQuestion}
        setactiveQuestion={setactiveQuestion}
      />

      <RecordAnswer
        mockQuestion={mockQuestion}
        activeQuestion={activeQuestion}
        mockInterviewData={mockInterviewData}
        isClient={isClient}
        setIsClient={setIsClient}
      />

      {isClient ? (
        <div className="  flex gap-6 md:gap-12 mx-6 justify-end md:col-span-2 place-self-end">
          {activeQuestion > 0 && (
            <Button
              className="bg-yellow-200"
              onClick={() => {
                setactiveQuestion(activeQuestion - 1);
              }}>
              Previous Question
            </Button>
          )}
          {activeQuestion != mockQuestion?.length - 1 && (
            <Button
              className="bg-green-400"
              onClick={() => {
                setactiveQuestion(activeQuestion + 1);
              }}>
              Next Question
            </Button>
          )}
          {activeQuestion == mockQuestion?.length - 1 && (
            <Link
              href={`/dashboard/startinterview/${mockInterviewData?.mockID}/feedback`}>
              {" "}
              <Button className="bg-red-400">End Interview</Button>
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Start;
