"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/DB";

import MockInterviewSchema from "../../../../../utils/Schema";
import { eq } from "drizzle-orm";

import Questions from "./_components/Questions";
import RecordAnswer from "./_components/RecordAnswer";

function Start({ params }) {
  const [mockQuestion, setMockQuestion] = useState();
  const [activeQuestion, setactiveQuestion] = useState(0);
  const [mockInterviewData, setMockInterviewData] = useState();
  // console.log(mockQuestion);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterviewSchema)
      .where(eq(MockInterviewSchema.mockID, params?.interviewId));
    const jsonResponse = JSON.parse(result[0].jsonMockInterviewResponse);

    setMockQuestion(jsonResponse.questions);
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
      />
    </div>
  );
}

export default Start;
